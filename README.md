# Library_site

## Description

This is a simple library site that allows users to add books to the library and borrow books from the library.  
The app is built using Go for the backend and React for the frontend.  
The application uses a Postgres database to store the books and users.

## About

The main functionality of the app is to allow users to add books to the library and borrow books from the library.  
The app has a simple user authentication system that allows users to sign up and log in.

## Installation

### Backend

The backend is built using Go and uses a Postgres (more info can be found in the [api/README.md](api/README.md)).
To run the backend, navigate to the `api` directory and run the following commands:

```bash
docker-compose up
go mod tidy
go run main.go
```

### Frontend

The frontend is built using React (more info can be found in the [frontend/README.md](frontend/README.md)).
To run the frontend, navigate to the `frontend` directory and run the following commands:

```bash
npm install
npm start
```

