from bs4 import BeautifulSoup
import urllib2
import json


def cleanArtistName(text):
    properName = text.split('(')[0]
    return properName.strip()

def getPage(url, variationUrl=None):
    header = {'User-Agent': 'Mozilla/5.0'} #Needed to prevent 403 error on Wikipedia
    req = urllib2.Request(url,headers=header)
    retry = 0
    while True:
        try:
            print ('trying: ' + url)
            page = urllib2.urlopen(req)
        except HTTPError:
            if retry < 1:
                url = variationUrl
                req = urllib2.Request(url,headers=header)
                retry += 1
                continue
            else:
                raise Exception('cant get either url for' + url)
        break
    soup = BeautifulSoup(page)
    return soup


def getTopUSCities():
    url = "https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population"
    page = getPage(url)


base_url = 'https://en.wikipedia.org/wiki/Category:Musical_groups_from_'
with open('./cities.json') as cities_json:
    cities_data = json.load(cities_json)
    for city_data in cities_data[0:25]:
        city = city_data['city']
        state = city_data['state']
        city_url = city.replace(' ', '_')
        city_and_state_url = city.replace(' ', '_') + ',_' + state.replace(' ', '_')
        print base_url + city_and_state_url
        try:
            page = getPage(base_url + city_url, base_url + city_and_state_url)
        except:
            print 'couldnt get page for ' + city + ' ' + state
            continue
        print 'got page for ' + city + ' ' + state





# flatten = lambda l: [item for sublist in l for item in sublist]

# def getSF():
#     wiki = "https://en.wikipedia.org/wiki/Category:Musical_groups_from_San_Francisco"
# categoryGroups= soup.find_all(class_="mw-category-group")
# categoryGroupLists = [categoryGroup.ul for categoryGroup in categoryGroups]
# categoryItems = [categoryGroupList.find_all("li") for categoryGroupList in categoryGroupLists]
# flattenedCategoryItems = flatten(categoryItems)
# artistNames = [cleanArtistName(item.text) for item in flattenedCategoryItems]
#
# result = {
#         'San Francisco': {
#             'artists': artistNames
#             }
#         }
#
# artistData = json.dumps(result)
#
# with open("artist_data.json", 'w') as data_file:
#     data_file.write(artistData)
