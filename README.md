# Steps to run the project
Make sure you have installed Node.js and npm on your machine.
Make sure you have installed MongoDB on your machine or have an URL to access it.
Create a file .env on the project root folder and add the following variables like on file .env.example

## Installation
Go to the project folder and run the following command to install all the dependencies.
```bash
$ npm install
```

## Running the app
Then run the following command to start the server.
```bash
# development
$ npm start

# production mode
$ npm run start:prod
```

## Project is running on
http://localhost:3000/graphql

You may use https://studio.apollographql.com/sandbox/explorer to test the GraphQL APIs.
    

## Authorization via Header (Bearer Token)
Authorization header should be in the following format:
```
   Authorization: Bearer <access_token>
``` 

## Improvements to do
- [] Add unit tests
- [] Add dockerfile
- [] Add docker-compose
- [] Add CI/CD