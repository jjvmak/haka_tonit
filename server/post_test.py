
import requests
r = requests.post('http://localhost:6900/image', json={
    'image': 'lisisisi',
    'key': 'haka_ton1'
    })
print(r.status_code, r.reason, r.text)