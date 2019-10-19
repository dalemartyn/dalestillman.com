---
layout: post
category: blog
title: "Setting up https on Rails apps using Let’s Encrypt"
---
Installing certs using certbot-auto on Ubuntu 14.04

## 1. Install certbot-auto on server

{% highlight text %}
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
{% endhighlight %}

or, to install in `/usr/local/sbin`:

{% highlight text %}
cd /usr/local/sbin
sudo wget https://dl.eff.org/certbot-auto
sudo chmod a+x certbot-auto
{% endhighlight %}

the first time you run ./certbot-auto it will install the packages


## 2. Set up nginx site to allow access to /.well-known directory

{% highlight text %}
sudo nano /etc/nginx/sites-available/example-site
{% endhighlight %}

add `.well-known` directory to the rails shared path `/var/www/sites/example-site/shared/.well-known`
and add the `location` block:

{% highlight text %}
server {
        . . .

        location ~ /.well-known {
                allow all;
                root /var/www/sites/example-site/production/shared/;
        }

        . . .
}
{% endhighlight %}

we will use our shared directory to hold the certs

{% highlight text %}
/var/www/sites/example-site/production/shared
{% endhighlight %}

reload nginx after testing the config using `sudo nginx -t`

{% highlight text %}
sudo service nginx reload
{% endhighlight %}

## 3. Install cert using webroot

{% highlight text %}
./path/to/certbot-auto certonly --webroot -w /var/www/sites/example-site/production/shared -d example.com -d www.example.com
{% endhighlight %}

this put the certs in 

{% highlight text %}
/etc/letsencrypt/live/example-site.com/
{% endhighlight %}

in the certs to nginx config `server {}` block:


 - remove listen 80
 - add the following

{% highlight text %}
listen 443 ssl;
ssl_certificate /etc/letsencrypt/live/example-site.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example-site.com/privkey.pem;
{% endhighlight %}

 - set up redirects

{% highlight text %}
server {
    listen 80;
    server_name example-site.com www.example-site.com;
    return 301 https://www.example-site.com$request_uri;
}
{% endhighlight %}


and

{% highlight text %}
server {
        listen         443 ssl;
        ssl_certificate /etc/letsencrypt/live/example-site.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example-site.com/privkey.pem;
        server_name    example-site.com;
        return         301 https://www.example-site.com$request_uri;
}
{% endhighlight %}

Optional: add more secure TLS cyphers
https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04#step-3-—-configure-tlsssl-on-web-server-(nginx)

4. set up cron job (only if on new server)

{% highlight text %}
sudo crontab -e
MAILTO=technical+cron@adozeneggs.co.uk
33 6,20 * * * /usr/local/sbin/certbot-auto renew --quiet --no-self-upgrade --renew-hook "service nginx reload"
{% endhighlight %}

logs should be in the default /var/log/letsencrypt directory

instructions: 
 - https://certbot.eff.org/#ubuntutrusty-nginx
 - https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04
