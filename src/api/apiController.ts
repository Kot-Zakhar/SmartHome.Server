import express from 'express';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import passport from 'passport';
import { inject } from 'inversify';

import debug from 'debug';

import { localStrategy } from './passport/localStrategy';
import { googleStrategy } from './passport/googleStrategy';
import Controller from './controllers/controller';
import AuthController from './controllers/authController';
import { jwtStragety, jwtNoDbStrategy } from './passport/jwtStrategy';
import { DeviceController } from './controllers/deviceController';
import { diContainer } from './inversify.config';

export default class ApiController implements Controller {
  private api = express.Router();
  private log = debug('app:ApiController');

  get router(): express.Router {
    return this.api;
  }

  private deviceController: Controller = diContainer.get(DeviceController);
  private authController: Controller = diContainer.get(AuthController);

  constructor() {
    this.api.use(bodyParser.json());
    
    // passport
    passport.use('local', localStrategy);
    passport.use('jwt', jwtStragety);
    passport.use('jwt-no-db', jwtNoDbStrategy);
    // passport.use('google', googleStrategy);
    this.api.use(passport.initialize());
    // api.use(passport.session());
    
    this.api.use('/auth', this.authController.router);
    this.api.use('/device', this.deviceController.router);
    // this.api.get('*', (req, res) => res.send("apiRouter"));
  }

}

declare global {
  namespace Express {
      interface User {
          id: number;
          publicId?: number;

          name?: string;
          email?: string;
          passwordHash?: string;
      }
  }
}