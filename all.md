---
title: Posts

date: 2020-01-01

eleventyNavigation:
  key: Posts
---

Todas as publicações, em ordem cronológica:

{% for post in collections.all reversed %}
- [**{{ post.data.title | default: post.url }}**]({{ post.url }}) {{ post.data.subtitle }} {{ post.data.date | date: "%Y-%m-%d" }}
---
{% endfor %}