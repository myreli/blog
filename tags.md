---
title: Tags
summary: Explorar por tópicos é mais interessante que por datas, mas cuidado com a validade das informações.

eleventyNavigation:
  key: Tags
---

{% for tag in collections.tags | dictsort %}

1. [{{tag}}](/tags/{{ tag }})

{% endfor %}
