import requests
import pytest
import uuid

BASE_URL = "http://localhost:8000"

def generate_random_username():
    return "test_user_" + str(uuid.uuid4()).replace("-", "")[:8]

def generate_random_email():
    return "test_" + str(uuid.uuid4()).replace("-", "")[:8] + "@example.com"

def generate_random_password():
    return "password123"


@pytest.fixture
def new_user():
    username = generate_random_username()
    email = generate_random_email()
    password = generate_random_password()
    user_data = {"username": username, "email": email, "password": password}
    response = requests.post(f"{BASE_URL}/register", json=user_data)
    assert response.status_code == 200
    return {"username": username, "password": password}

@pytest.fixture
def logged_in_user(new_user):
    username = new_user["username"]
    password = new_user["password"]
    login_data = {"username": username, "password": password}
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    assert response.status_code == 200
    return response.json()["access_token"]

def test_register(new_user):
    assert new_user is not None

def test_login(logged_in_user):
    assert logged_in_user is not None

def test_forgot_password(new_user):
    username = new_user["username"]
    new_password = generate_random_password()
    password_data = {"username": username, "new_password": new_password, "repeat_new_password": new_password}
    response = requests.put(f"{BASE_URL}/forgot-password", json=password_data)
    assert response.status_code == 200
    assert response.json()["message"] == "Password changed successfully"

def test_logout(logged_in_user):
    headers = {"Authorization": f"Bearer {logged_in_user}"}
    response = requests.post(f"{BASE_URL}/logout", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Logout Successfully"
