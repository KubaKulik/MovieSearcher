# MovieSearcher

**MovieSearcher** is a web application that allows users to search for movies based on name.
After searching for a movie, users can see its basic information, such as title, genre and release date. 
The application has panels for **registration**, **log-in**, **change password**. **Logout** and **find movies**.
Movies are downloaded from an open API from **http://www.omdbapi.com**. User after registration is saved in **MySQL** databases. 
The application provides security through authentication based on **JWT tokens**.
In addition, there is a mechanism to automatically log out a user after a certain period of inactivity.
The application is also equipped with a simple token management system,
which allows access tokens to be invalidated after a user logs out or after a certain amount of time has passed since they were generated.

# Backend

<img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/> <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/> 

## A brief description:

Python + MySQL

Backend includes:

* User registration and database enrollment ✅.
* User login ✅.
* User password change ✅.
* Creation/renewal of account access token ✅.

Authentication and authorization:
* JWT ✅


## Installation

Install requirements

```bash
  pip install requirements.txt
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`ACCESS_TOKEN_EXPIRE_MINUTES`

`REFRESH_TOKEN_EXPIRE_MINUTES` 

`ALGORITHM` 

`JWT_SECRET_KEY` 

`JWT_REFRESH_SECRET_KEY` 

`DATABASE_URL`


## Run Locally

```bash
  cd backend
```

```bash
  uvicorn main:app
```

# SwaggerUI

![SwaggerUI](/backend/docs/swagger.PNG)


# Frontend

<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)"/>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_KEY`

## Installation

```bash
  cd frontend
```

npm install

```bash
  npm i
```

## Run Locally

Project start

```bash
  npm start
```

# Automatically Backend + Frontend 

**Automatic** inclusion of **backend** and **frontend** on separate windows:

```bash
  ./script.ps1
```