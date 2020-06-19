---
title: "Getting started with Docker"
tagline: "How to run apps in sandboxed containers"
date: 2020-06-14T22:10:00+00:00
image:
  json: /blog/docker.json
color_light: "#1f88df"
color_dark: "#1265bb"
tags: blog
---

I've spent a bit of time learning Docker using the official _Learn_ tutorial that comes bundled with Docker Desktop. It's a great tutorial, and one I'd recommend to anyone new to Docker. Here's my notes.

## About Docker

### Images
An image is everything need to run (an application in) a container. It's a linux filesystem and any dependencies.

### Containers
Containers are isolated processes. You should generally run one process per container. So you can have a container for your mysql database, and a container for a nodejs application. Containers can communicate with each other using networking.

### Networking
Containers can refer to each other based on their names, which resolve to their IP addresses on the docker network.

## Running containers
You can run a container using the `docker run` command.

```
docker run -dp 80:80 docker/getting-started
```

The above command will run the container based on the `docker/getting-started` image, which is hosted on the official Docker container image library, [Docker Hub][1].

It will download the image and run it in a container, binding the local port 80 to port 80 inside the container, and running it in detached mode (in the background).

We can see which containers are running using `docker ps` (`docker ps -a` to include containers not currently running), stop containers using `docker stop`, start them again using  `docker start <container-name>`.

## Building container images
We can build container images using a `Dockerfile`. A Dockerfile is a text-based script of instructions that is used to create a container image.

```
FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "/app/src/index.js"]
```

And can be built using the `docker build` command.

```
docker build -t getting-started .
```

The `FROM` directive names the image which our new image is based upon, such as [node][2] version `12-alpine`. We can add new dependencies using the `RUN` directive, and specify which process runs using the `CMD` directive.

Images are cached in 'layers', so you can use multiple `CMD` directives to speed up image builds. See [Docker best practices][3].

## Replacing containers
If we make changes and rebuild our image, we have to remove the old container. The quickest way is `docker rm -f <the-container-id>`. Then we can run our new container using the updated image:

```
docker run -dp 3000:3000 getting-started
```

## Persisting data
There is two ways to persist data in Docker: Volumes and Bind Mounts.

### Volumes
Volumes are managed by Docker and will stick around beyond the lifecycle of a container. We can create a named volume like this:

```
docker volume create todo-db
```

And mount it inside the container:

```
docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
```

### Bind Mounts
We can mount a file or directory in our host machine (e.g. MacOS) in to the container using Bind Mounts. The command is just like for using volumes, except we specify the local directory instead of the name of the volume:

```
docker run -dp 3000:3000 \
    -w /app -v ${PWD}:/app \
    node:12-alpine \
    sh -c "yarn install && yarn run dev"
```

## Docker Compose
Creating a `docker-compose.yml` file lets us spin up multiple containers with specified configuration. It's great for development and sharing container configurations. We can create containers from images on Docker Hub or a based on a Dockerfile.

```
version: "3.7"

services:
  app:
    image: node:12-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:5.7
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment: 
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```

Docker Compose automatically creates us a network, so we don't have to specify one. We can start up the application stack using the command:

```
docker-compose up -d
```

and tear it down with `docker-compose down`, or `docker-compose down --volumes` to also remove the volumes.

## Next steps
There's a lot more to learn about containers, including how best to use them in production. A straightforward way is to use `docker-compose` on a server, or use a project like [exoframe][4]. More comprehensive tools exist to manage, scale and orchestrate containers, such as Kubernetes, Swarm, Nomad, and ECS, but they can come with a steep learning curve.


[1]: https://hub.docker.com/
[2]: https://hub.docker.com/_/node/
[3]: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
[4]: https://github.com/exoframejs/exoframe
