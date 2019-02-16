
# Use this to quickly test HTTP methods
import requests
r = requests.post('https://us-central1-haka-tonit-backend.cloudfunctions.net/app/image', json={
    'image': 'lisisisi',
    'key': 'haka_ton1',
    'dsds': 'dsdsds'
    })
print(r.status_code, r.reason, r.text)