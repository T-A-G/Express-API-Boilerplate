import dotenv from 'dotenv';

// load development variables
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './env/.development.env' });
}
// load tesitng variables
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './env/.test.env' });
}
