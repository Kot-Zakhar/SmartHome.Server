import express from 'express';
import debug from 'debug';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import databaseConfig from './config/database'
import authController from './controllers/auth/authController';
import localStrategy from './passportStrategies/localStrategy';
import googleStrategy from './passportStrategies/googleStrategy';

const log = debug('router');
const api = express.Router();

// connecting to db
mongoose.connect(databaseConfig.database, { useNewUrlParser: true });
mongoose.connection
.on('connected', () => {
  log('Connected to database ' + databaseConfig.database)
})
.on('error', (...err) => {
  log('Error connecting to mongo: ' + JSON.stringify(err));
})


api.use(bodyParser.json());

// passport
passport.use('local', localStrategy);
passport.use('google', googleStrategy);
api.use(passport.initialize());
// api.use(passport.session());

api.use('/auth', authController);
api.get('*', (req, res) => res.send("apiRouter"));

export default api;

