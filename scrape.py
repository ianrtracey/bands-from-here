from bs4 import BeautifulSoup
import urllib2
import json


def cleanArtistName(text):
    properName = text.split('(')[0]
    return properName.strip()

def getPage(url, variationUrl):
    header = {'User-Agent': 'Mozilla/5.0'} #Needed to prevent 403 error on Wikipedia
    req = urllib2.Request(url,headers=header)
    retry = 0
    page = None
    urls = [url, variationUrl]
    for url in urls:
        try:
            print ('trying: ' + url)
            page = urllib2.urlopen(req)
        except urllib2.HTTPError:
            req = urllib2.Request(variationUrl, headers=header)
            print 'cant get ' + url
            print 'retrying...'
        # we stop looking when we get a page back
        if page is not None:
            break

    if page is None:
        return None
    soup = BeautifulSoup(page)
    return soup


def getTopUSCities():
    url = "https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population"
    page = getPage(url)


flatten = lambda l: [item for sublist in l for item in sublist]

base_url = 'https://en.wikipedia.org/wiki/Category:Musical_groups_from_'
# with open('./cities.json') as cities_json:
    # cities_data = json.load(cities_json)
cities_data = [
        { 'city': 'Buffalo',
            'state': 'New York'
            }
        ]
with open('./cities.json', 'r') as cities_json:
    cities_data = json.load(cities_json)
    for city_data in cities_data:
        city = city_data['city']
        state = city_data['state']
        city_url = city.replace(' ', '_')
        city_and_state_url = city.replace(' ', '_') + ',_' + state.replace(' ', '_')
        print base_url + city_and_state_url
        page = getPage(base_url + city_url, base_url + city_and_state_url)
        if not page:
            print "ERROR: Could not get page for {0}, {1}".format(city, state)
            continue
        categoryGroups = page.find_all(class_="mw-category-group")
        categoryGroupLists = [categoryGroup.ul for categoryGroup in categoryGroups]
        categoryItems = [categoryGroupList.find_all("li") for categoryGroupList in categoryGroupLists]
        flattenedCategoryItems = flatten(categoryItems)
        artistNames = [cleanArtistName(item.text) for item in flattenedCategoryItems]
        result = {
                'city': city,
                'state': state,
                'artistNames': artistNames
                }
        artistData = json.dumps(result)
        canonicalFileName = (city + ' ' + state).lower().replace(' ', '_')
        with open('./artists/'+ canonicalFileName + ".artists.json", 'w') as data_file:
            data_file.write(artistData)





