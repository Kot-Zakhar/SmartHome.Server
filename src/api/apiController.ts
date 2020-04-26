import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import passport from 'passport';
import { inject } from 'inversify';

import debug from 'debug';

import localStrategy from './passport/localStrategy';
import googleStrategy from './passport/googleStrategy';
import { Controller } from './controllers/controller';
import AuthController from './controllers/authController';
import { diContainer } from './inversify.config';

const log = debug('router');

export { diContainer };

export default class ApiController implements Controller {
  private authController: Controller = diContainer.get(AuthController);

  getRouter(): express.Router {
    const api = express.Router();
    api.use(bodyParser.json());
    
    // passport
    passport.use('local', localStrategy);
    // passport.use('google', googleStrategy);
    api.use(passport.initialize());
    // api.use(passport.session());
    
    api.use('/auth', this.authController.getRouter());
    api.get('*', (req, res) => res.send("apiRouter"));
    return api;
  }

}


