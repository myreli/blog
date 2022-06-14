---
title: Tags

date: 2020-01-01

eleventyNavigation:
  key: Tags
eleventyExcludeFromCollections: true
---
# Tags

{% for tag in collections.tagList %}
- [{{ tag }}]({{ tagUrl | url}})
{% endfor %}