# 🔥Express API Boilerplate

Simple express boilerplate for creating REST API server.

## ✅Features

1. Authentication with email/password and JWT authentication using [passport.js](http://www.passportjs.org/)(without blacklisting).
2. API rate limiting using [express-rate-limit](https://www.npmjs.com/package/express-rate-limit).
3. Test integration using [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest).
4. Logging using [morgan](https://www.npmjs.com/package/morgan).
5. Error handling([here](https://expressjs.com/en/guide/error-handling.html)).
6. ODM using [Mongoose.js](https://mongoosejs.com/).
7. Precommit code formatting using [prettier](https://prettier.io/) and testing using [husky](https://www.npmjs.com/package/husky/v/3.0.0).
8. ES6 support with [babel.js](https://babeljs.io/).

## ⚙️ Environment variables

| Variable Name.                 | description                          | example                                  |
| ------------------------------ |:-------------------------------------| :---------------------------------------:|
| `JWT_SECRET`                   | secret for generating JWT            | `Q>,L+A+6`                               |
| `MONGO_DB`                     | MongoDB connection uri string        | `mongodb://localhost:27017/Biolerplate`  |
| `JWT_TOKEN_EXPIRATION_IN_DAYS` | period after which JWT should expire | `7`                                      |
| `RATE_LIMIT_WINDOW`            | the window in which api calls from a specific IP address can only make a specific amount of request determined in `RATE_LIMIT` the environment variable. ⚠️ This value is in Milliseconds | `60000`                         (equivalent to one minute)|
| `RATE_LIMIT` | amount of api calls from a specific IP address that can be made within a given time window  determined in the `RATE_LIMIT_WINDOW` the environment variable. | `100`                                      |


## 🏁Getting started

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


