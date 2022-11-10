---
title: Myreli
subtitle: Compartilhando trechos de código e vida.

date: 2020-01-01

hideComments: true
---

## Recentes

{% assign latest = collections.post | reverse | slice:0,2 %}

{% for post in latest %}
<a href="{{ post.url }}" style="text-decoration: none;">

<article>
<h3>{{ post.data.title | default: post.url }}</h3>
<p style="color: var(--muted-color)">{{ post.excerpt | default: post.data.subtitle }}</p>
</article>
</a>
{% endfor %}

<a style="width: 100%;" role="button" href="/posts">Ver todos</a>
