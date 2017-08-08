import json
import os
import argparse
import uuid

parser = argparse.ArgumentParser()
parser.add_argument("playlist_data")
parser.add_argument("city_data")
args = parser.parse_args()

PLAYLIST_DATA_PATH = args.playlist_data
CITY_DATA_PATH = args.city_data

playlist_data_files = os.listdir(PLAYLIST_DATA_PATH)

result = {}
for data_filename in playlist_data_files:
    filepath = "{0}/{1}".format(PLAYLIST_DATA_PATH, data_filename)
    try:
        with open(filepath) as data_file:
            data = json.loads(data_file.read())
            entry_id = str(uuid.uuid4())
            result[entry_id] = {
                'city': data['city'],
                'state': data['state'],
                'playlist_id': data['playlistId'],
                'artists': data['artists']
            }
    except:
        print "ERROR: cannot open {0}".format(filepath)

with open('./index.json', 'w') as fp:
        json.dump(result, fp)




