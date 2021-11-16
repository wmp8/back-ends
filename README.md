# <p align="center">ft-water-my-plants-8 api - November, 2021</p>

## <p align="center">https://wampl.herokuapp.com/</p>

## <p align="center">REGISTER / LOGIN</p>

### <p align="center">User examples:</p>

```json
[
  {
    "username": "iamauser",
    "password": "randompassword"
  },
  {
    "username": "pambeesly",
    "password": "anotherrandompassword"
  },
  {
    "username": "dwightschrute",
    "password": "somethingrandom"
  }
]
```

### [POST] /api/auth/register

- Register a new user
  - _username required (must be a string | unique)_
  - _password required (must be a string)_
  - _phone required (must be a number)_

_What you send:_

```json
{
  "username": "iamauser",
  "password": "randompassword",
  "phone": 7131234567
}
```

_What you receive:_

```json
{
  "message": "You have successfully created an account with username iamauser"
}
```

### [POST] /api/auth/login

- Login
  - _username and password required_
  - _returns the following:_
    - _message: { "Welcome back iamauser" }_
    - _token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlhbWF1c2VyIiwiaWF0IjoxNjM2ODYyMDY5LCJleHAiOjE2MzY5NDg0Njl9.fhVnkCzPDA5kubS1fo3mj57AEZcon267qH7dQ5Rk7rU"_
    - _user_id: 1_

_What you send:_

```json
{
  "username": "iamauser",
  "password": "randompassword"
}
```

_What you receive:_

```json
{
  "message": "Welcome back iamauser",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImlhbWF1c2VyIiwiaWF0IjoxNjM2ODYyMDY5LCJleHAiOjE2MzY5NDg0Njl9.fhVnkCzPDA5kubS1fo3mj57AEZcon267qH7dQ5Rk7rU",
  "user_id": 1
}
```

## <p align="center">USERS</p>

### [GET] /api/users

**_RESTRICTED ENDPOINT_**

- Get an array of users for authenticated user
  - _requires valid token in authorization header to access_

_What you receive:_

```json
[
  {
    "phone": "7131234567",
    "user_id": 1,
    "username": "iamauser"
  },
  {
    "phone": "8321234567",
    "user_id": 2,
    "username": "iamausertoo"
  }
]
```

### [GET] /api/users/:user_id

**_RESTRICTED ENDPOINT_**

- Get information for a specific user
  - _requires valid token in authorization header to access_

_What you receive:_

```json
{
  "phone": "7131234567",
  "user_id": 1,
  "username": "iamauser"
}
```
### [PUT] /api/users/update

**_RESTRICTED ENDPOINT_**

- Update authenticated user's phone number or password
  - _requires valid token in authorization header to access_

_What you send:_

```json
{
  "phone": 2811234567,
  "password": "newrandompassword"
}
```
_What you receive:_

```json
{
  "message": "Your submission has been updated"
}
```
## <p align="center">PLANTS</p>

### [GET] /api/plants

**_RESTRICTED ENDPOINT_**

- Get an array of plants for authenticated user
  - _requires valid token in authorization header to access_

_What you receive:_

```json
[
    {
        "image_url": "marble-pothos.png",
        "light_requirement": "Thrives in medium to low indirect light. Not suited for intense, direct sun.",
        "nickname": "Marble Queen Pothos",
        "plant_id": 1,
        "species": "",
        "user_id": 1,
        "water_frequency": "Water every 1-2 weeks"
    },
    {
        "image_url": "snake-plant2.png",
        "light_requirement": "Thrives in medium to bright indirect light, but can tolerate low indirect light.",
        "nickname": "Snake Plant Laurentii",
        "plant_id": 2,
        "species": "",
        "user_id": 1,
        "water_frequency": "Water every 2-3 weeks"
    },
    {
        "image_url": "zz.png",
        "light_requirement": "Thrives in medium to low indirect light. Can tolerate bright indirect light. Not suited for intense, direct sun.",
        "nickname": "ZZ Plant",
        "plant_id": 3,
        "species": "",
        "user_id": 2,
        "water_frequency": "Water every 3-4 weeks"
    },
    {
        "image_url": "ech.png",
        "light_requirement": "Thrives in bright direct light, but can tolerate bright indirect light.",
        "nickname": "Echeveria",
        "plant_id": 4,
        "species": "",
        "user_id": 3,
        "water_frequency": "Water every 3-4 weeks"
    }
]
```
### [GET] /api/plants/:plant_id

**_RESTRICTED ENDPOINT_**

- Get information for a specific plant
  - _requires valid token in authorization header to access_

_What you receive:_

```json
{
        "image_url": "marble-pothos.png",
        "light_requirement": "Thrives in medium to low indirect light. Not suited for intense, direct sun.",
        "nickname": "Marble Queen Pothos",
        "plant_id": 1,
        "species": "",
        "user_id": 1,
        "water_frequency": "Water every 1-2 weeks"
    }
```
### [POST] /api/plants/create

**_RESTRICTED ENDPOINT_**

- Add a new plant
  - _requires valid token in authorization header to access_
  - _nickname required (must be a string)_
  - _water_frequency required (must be a string)_
  
_What you send:_

```json
{
        "image_url": "marble-pothos.png",
        "light_requirement": "Thrives in medium to low indirect light. Not suited for intense, direct sun.",
        "nickname": "Marble Queen Pothos",
        "species": "Epipremnum aureum",
        "water_frequency": "Water every 1-2 weeks"
}
```
_What you receive:_

```json

  {
        "image_url": "marble-pothos.png",
        "light_requirement": "Thrives in medium to low indirect light. Not suited for intense, direct sun.",
        "nickname": "Marble Queen Pothos",
        "plant_id": 1,
        "species": "Epipremnum aureum",
        "user_id": 1,
        "water_frequency": "Water every 1-2 weeks"
    }
```
### [PUT] /api/plants/update/:plant_id

**_RESTRICTED ENDPOINT_**
- Update an existing plant
  - _requires valid token in authorization header to access_
  - _nickname required (must be a string)_
  - _water_frequency required (must be a string)_
  
_What you send:_

```json
{
        "image_url": "marble-pothos.png",
        "light_requirement": "Thrives in medium to low indirect light. Not suited for intense, direct sun.",
        "nickname": "Marble Queen Pothos",
        "species": "Epipremnum aureum",
        "water_frequency": "Water every 1-2 weeks"
}
```
_What you receive:_

```json

  {
        "image_url": "updated-marble-pothos.png",
        "light_requirement": "Thrives in medium to low indirect light. Not suited for intense, direct sun.",
        "nickname": "Marble Queen Pothos",
        "plant_id": 1,
        "species": "Epipremnum aureum",
        "user_id": 1,
        "water_frequency": "Water every 1-2 weeks"
    }
```
# Build Week Scaffolding for Node and PostgreSQL

## Video Tutorial

The following tutorial explains how to set up this project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://img.youtube.com/vi/kTO_tf4L23I/maxresdefault.jpg)](https://www.youtube.com/watch?v=kTO_tf4L23I)

## Requirements

- [PostgreSQL, pgAdmin 4](https://www.postgresql.org/download/) and [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed in your local machine.
- A Heroku app with the [Heroku PostgreSQL Addon](https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-heroku-postgres) added to it.
- Development and testing databases created with [pgAdmin 4](https://www.pgadmin.org/docs/pgadmin4/4.29/database_dialog.html).

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start**: Runs the app in production.
- **server**: Runs the app in development.
- **migrate**: Migrates the local development database to the latest.
- **rollback**: Rolls back migrations in the local development database.
- **seed**: Truncates all tables in the local development database, feel free to add more seed files.
- **test**: Runs tests.
- **deploy**: Deploys the main branch to Heroku.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrateh**: Migrates the Heroku database to the latest.
- **rollbackh**: Rolls back migrations in the Heroku database.
- **databaseh**: Interact with the Heroku database from the command line using psql.
- **seedh**: Runs all seeds in the Heroku database.

## Hot Tips

- Figure out the connection to the database and deployment before writing any code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin in their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.
