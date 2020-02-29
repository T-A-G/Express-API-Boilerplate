import express from 'express';
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import './config/loadEnv';
import morgan from 'morgan';
import { rateLimitMiddleware } from './middleware';
import addRoutes from './routes';
import initializePassport from './config/passport';
import { handleError } from './utils/errorHandler';

/**
* Factory function that returns an express application with
* @returns {Express Application} express application
*/
const generateApp = () => {
  const app = express();

  // setup request logger
  if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
  }

  // setup corse
  app.use(cors());

  // setup json request parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // add rate limiter
  if (process.env.NODE_ENV !== 'test') {
    app.use(rateLimitMiddleware);
  }

  // initialize passport
  initializePassport(passport);
  app.use(passport.initialize());

  // add routes
  addRoutes(app);

  // error handling
  app.use((error, req, res, next) => {
    handleError(error, res);
  });

  return app;
};

export default generateApp;
