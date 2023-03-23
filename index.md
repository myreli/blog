---
title: Myreli
summary: Divagações sobre software eficiente e sustentável.

date: 2020-01-01

hideComments: true
eleventyNavigation:
  key: Posts
---

{% for post in collections.post reversed %}

- **[{{ post.data.title | default: post.url }}]({{ post.url }})**
{{ post.data.summary }} *({{ post.data.date | date: "%Y-%m" }})*

---

{% endfor %}
