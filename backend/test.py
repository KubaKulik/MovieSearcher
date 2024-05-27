import requests
import uuid

BASE_URL = "http://localhost:8000"

def generate_random_username():
    return "test_user_" + str(uuid.uuid4()).replace("-", "")[:8]

def generate_random_email():
    return "test_" + str(uuid.uuid4()).replace("-", "")[:8] + "@example.com"

def generate_random_password():
    return "password123"

def test_register():
    username = generate_random_username()
    email = generate_random_email()
    password = generate_random_password()
    user_data = {"username": username, "email": email, "password": password}
    response = requests.post(f"{BASE_URL}/register", json=user_data)
    assert response.status_code == 200
    assert response.json()["message"] == "user created successfully"

def test_login():
    username = generate_random_username()
    password = generate_random_password()
    user_data = {"username": username, "email": generate_random_email(), "password": password}
    response = requests.post(f"{BASE_URL}/register", json=user_data)
    assert response.status_code == 200
    login_data = {"username": username, "password": password}
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "refresh_token" in response.json()
    return response.json()["access_token"]

def test_forgot_password():
    username = generate_random_username()
    password = generate_random_password()
    user_data = {"username": username, "email": generate_random_email(), "password": password}
    response = requests.post(f"{BASE_URL}/register", json=user_data)
    assert response.status_code == 200
    new_password = generate_random_password()
    password_data = {"username": username, "new_password": new_password, "repeat_new_password": new_password}
    response = requests.put(f"{BASE_URL}/forgot-password", json=password_data)
    assert response.status_code == 200
    assert response.json()["message"] == "Password changed successfully"

def test_logout():
    access_token = test_login()
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.post(f"{BASE_URL}/logout", headers=headers)
    assert response.status_code == 200
    assert response.json()["message"] == "Logout Successfully"

if __name__ == "__main__":
    test_register()
    test_login()
    test_forgot_password()
