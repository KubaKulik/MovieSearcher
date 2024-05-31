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

@pytest.fixture(scope="module")
def user_data_1():
    username = generate_random_username()
    email = generate_random_email()
    password = generate_random_password()
    return {"username": username, "email": email, "password": password}

@pytest.fixture(scope="module")
def new_user_1(user_data_1):
    response = requests.post(f"{BASE_URL}/register", json=user_data_1)
    assert response.status_code == 200
    return user_data_1

@pytest.fixture(scope="module")
def logged_in_user_1(new_user_1):
    username = new_user_1["username"]
    password = new_user_1["password"]
    login_data = {"username": username, "password": password}
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    assert response.status_code == 200
    return response.json()["access_token"]

@pytest.fixture(scope="module")
def user_data_2():
    username = generate_random_username()
    email = generate_random_email()
    password = generate_random_password()
    return {"username": username, "email": email, "password": password}

@pytest.fixture(scope="module")
def new_user_2(user_data_2):
    response = requests.post(f"{BASE_URL}/register", json=user_data_2)
    assert response.status_code == 200
    return user_data_2

@pytest.fixture(scope="module")
def logged_in_user_2(new_user_2):
    username = new_user_2["username"]
    password = new_user_2["password"]
    login_data = {"username": username, "password": password}
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    assert response.status_code == 200
    return response.json()["access_token"]

def test_register_1(new_user_1):
    assert new_user_1 is not None

def test_login_1(logged_in_user_1):
    assert logged_in_user_1 is not None

def test_forgot_password_1(user_data_1):
    username = user_data_1["username"]
    new_password = generate_random_password()
    password_data = {"username": username, "new_password": new_password, "repeat_new_password": new_password}
    response = requests.put(f"{BASE_URL}/forgot-password", json=password_data)
    assert response.status_code == 200
    assert response.json()["message"] == "Password changed successfully"

def test_logout_1(logged_in_user_1):
    headers = {"Authorization": f"Bearer {logged_in_user_1}"}
    response = requests.post(f"{BASE_URL}/logout", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Logout Successfully"

def test_register_2(new_user_2):
    assert new_user_2 is not None

def test_login_2(logged_in_user_2):
    assert logged_in_user_2 is not None

def test_forgot_password_2(user_data_2):
    username = user_data_2["username"]
    new_password = generate_random_password()
    password_data = {"username": username, "new_password": new_password, "repeat_new_password": new_password}
    response = requests.put(f"{BASE_URL}/forgot-password", json=password_data)
    assert response.status_code == 200
    assert response.json()["message"] == "Password changed successfully"

def test_logout_2(logged_in_user_2):
    headers = {"Authorization": f"Bearer {logged_in_user_2}"}
    response = requests.post(f"{BASE_URL}/logout", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Logout Successfully"
