import requests
import json

data = {
    "username": "test_user",
    "name": "Test User",
    "bio": "Test bio",
    "has_profile_pic": True,
    "external_url": "https://example.com",
    "posts": 100,
    "followers": 5000,
    "following": 500,
    "avg_likes": 200,
    "avg_comments": 20,
    "account_age_days": 365,
    "is_verified": False,
    "is_private": False,
    "likes_variance": 50
}

response = requests.post('http://127.0.0.1:5000/api/analyze', json=data)
print(f"Status: {response.status_code}")
print("Response:")
print(json.dumps(response.json(), indent=2))
