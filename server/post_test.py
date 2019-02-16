
import requests
r = requests.post('http://localhost:6900/image', json={'image': 'lisisisi'})
print(r.status_code, r.reason, r.text)