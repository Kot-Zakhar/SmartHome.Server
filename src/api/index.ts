import express from 'express';
import debug from 'debug';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import authController from './controllers/auth/authController';
import localStrategy from './passportStrategies/localStrategy';
import googleStrategy from './passportStrategies/googleStrategy';

const log = debug('router');
const api = express.Router();

// connecting to db
const databaseConnectionString = process.env.MONGODB_CONNECTION_STRING;
const databaseSecret = process.env.MONGODB_SECRET;
if (!databaseConnectionString || !databaseSecret) {
  log("MongoDB credentials are not provided (MONGODB_CONNECTION_STRING or MONGODB_SECRET).");
  throw new Error("No connection to MongoDB.");
} else {
  mongoose.connect(databaseConnectionString, { useNewUrlParser: true });
  mongoose.connection
  .on('connected', () => {
    log('Connected to database ' + databaseConnectionString)
  })
  .on('error', (...err) => {
    throw new Error("Error while connecting to Mongo: " + JSON.stringify(err));
  })
}

api.use(bodyParser.json());

// passport
passport.use('local', localStrategy);
passport.use('google', googleStrategy);
api.use(passport.initialize());
// api.use(passport.session());

api.use('/auth', authController);
api.get('*', (req, res) => res.send("apiRouter"));

export default api;

