from bs4 import BeautifulSoup
import urllib2
import json


def cleanArtistName(text):
    properName = text.split('(')[0]
    return properName.strip()


flatten = lambda l: [item for sublist in l for item in sublist]

wiki = "https://en.wikipedia.org/wiki/Category:Musical_groups_from_San_Francisco"
header = {'User-Agent': 'Mozilla/5.0'} #Needed to prevent 403 error on Wikipedia
req = urllib2.Request(wiki,headers=header)
page = urllib2.urlopen(req)
soup = BeautifulSoup(page)
categoryGroups= soup.find_all(class_="mw-category-group")
categoryGroupLists = [categoryGroup.ul for categoryGroup in categoryGroups]
categoryItems = [categoryGroupList.find_all("li") for categoryGroupList in categoryGroupLists]
flattenedCategoryItems = flatten(categoryItems)
artistNames = [cleanArtistName(item.text) for item in flattenedCategoryItems]

result = {
        'San Francisco': {
            'artists': artistNames
            }
        }

artistData = json.dumps(result)

with open("artist_data.json", 'w') as data_file:
    data_file.write(artistData)
