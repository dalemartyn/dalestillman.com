---
layout: post
category: links
title: "Svelte – a JavaScript framework without the framework"
date: 2017-03-05T10:14:55+00:00
link: https://svelte.technology/blog/frameworks-without-the-framework/
---

Svelte components precompile to tiny standalone JS modules. By not having to ship the framework itself, you avoid both the network and the parse + eval time that traditional JS frameworks suffer from. 

[Rich Harris][1]:

> The Svelte implementation of TodoMVC weighs 3.6kb zipped. For comparison, React plus ReactDOM without any app code weighs about 45kb zipped. It takes about 10x as long for the browser just to evaluate React as it does for Svelte to be up and running with an interactive TodoMVC.

[1]: https://twitter.com/Rich_Harris/
