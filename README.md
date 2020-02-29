# Express Api Boilerplate

Simple express biolderplate for creating REST API server using MongoDB.

## Features

1. Authentication with email/password and JWT authentication using [passport.js](http://www.passportjs.org/)(withoutt blacklisting).
2. API rate limiting using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).
3. Test integration using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest).
4. Logging using [morgan](https://www.npmjs.com/package/morgan).
5. Error handling([here](https://expressjs.com/en/guide/error-handling.html)).
6. ODM using [Mongoose.js](https://mongoosejs.com/).
7. Precommit code formatting using [prettier](https://prettier.io/) and testing using [husky](https://www.npmjs.com/package/husky/v/3.0.0).
8. Compiling using [babel.js](https://babeljs.io/).

## Getting started

### Installing packages
```npm i```

### Development

run from root: 

```npm run start```

### Testing

run from root: 

```npm run test```

if you want to auto rerun tests on file change run: 

```npm run test:watch```

### Deploy

run from root: 

```npm run build```

```npm run serve```


