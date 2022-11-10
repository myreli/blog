---
title: Posts

date: 2020-01-01

eleventyNavigation:
  key: Posts
---

{% for post in collections.all reversed %}

- {{ post.data.date | date: "%Y-%m-%d" }} | [**{{ post.data.title | default: post.url }}**]({{ post.url }}) {{ post.data.subtitle }}

---

{% endfor %}
