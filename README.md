# Project Name: NodeJS with MongoDB

A simple CRUD operation using mongoose.

## Installation

To install the project dependencies, first run the following command: **npm install**

## Usage

To start the project, run the following command: **npm start**

## TODO

To create todos

```json
{
  "title": "Learn NodeJS from youtube",
  "description": "NodeJS, ExpressJS and MongoDB need to learn with nodejs",
  "status": "active"
}
```

```json
[
  {
    "title": "Learn NodeJS from youtube",
    "description": "NodeJS, ExpressJS and MongoDB need to learn with nodejs",
    "status": "active"
  },
  {
    "title": "Learn NodeJS from youtube",
    "description": "NodeJS, ExpressJS and MongoDB need to learn with nodejs",
    "status": "active"
  }
]
```

All todo routes

1. [POST]http://localhost:3000/todo
2. [POST]http://localhost:3000/todo/all
3. [GET]http://localhost:3000/todo/65fdc11df3c530054d2d6577
4. [GET]http://localhost:3000/todo
5. [PUT]http://localhost:3000/todo/65fdc11df3c530054d2d6577
6. [DELETE]http://localhost:3000/todo/65fdc11df3c530054d2d6577

## USER

To create user

```json
{
  "name": "Pavel Parvej",
  "usersame": "pavelcse",
  "password": "1234",
  "status": "active"
}
```

To login

```json
{
  "username": "pavelcse",
  "password": "1234"
}
```

All user routes

1. [POST]http://localhost:3000/user/signup
2. [POST]http://localhost:3000/user/login
3. [GET]http://localhost:3000/user
