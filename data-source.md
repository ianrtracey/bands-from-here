The first plan of action is to collect an index of artist names and cities
*Sources*
1. Wikipedia
  - path to scrap
  - host: https://en.wikipedia.org
  - path: /wiki/Category:Musical_groups_from_${city}
  - (or if the the path above fails)
  - path: /wiki/Category:Musical_groups_from_${city},_${State}
Wikipedia scraping details
className: class="mw-category-group"
    -> then get all <li>'s under that