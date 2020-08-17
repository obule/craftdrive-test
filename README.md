# CRAFT DRIVE TEST

## Introduction

An endpoint to fetch employees. You can optionally send query parameters to fine tune your result

## Table of Contents

1. <a href="#hosted-app">Link to Hosted App</a>
2. <a href="#application-features">Application Features</a>
3. <a href="#how-to-use">How To Use</a>
4. <a href="#author">Author</a>
5. <a href="#license">License</a>

## Link to Hosted App

- [API link](https://sf-legacy-api.herokuapp.com/api/v1/items)

## Tech Stack Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Application Features

- An endpoint to fetch, create, update and delete employee
- The ability to add query parameters to get custom details

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/obule/craftdrive-test.git

# Go into the repository
$ cd craftdrive-test

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the sample.env file and provide the keys

# Run the app
$ npm start

# Check the port on the specified port on the env or 9000

# To run the app on Docker, you must have docker installed locally and running
$ npm run docker:build
$ npm run docker

# Run test
$ npm run test
```

## API endpoints

```
- GET --- /employee -- Get all
- GET --- /employee/:id -- Find One
- POST --- /employee
  data {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
  }
- PATCH --- /employee Update employee
- DELETE --- /employee/:id Delete employee

```

## Author

Ruona Izuagbala

## License

MIT

---
