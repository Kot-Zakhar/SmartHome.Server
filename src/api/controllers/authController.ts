import express, { Router } from 'express';
import debug from 'debug';
import passport from 'passport';
import { injectable, inject } from 'inversify';

import { Controller } from './controller';
import { UserService } from '../services/userService';

@injectable()
export default class AuthController implements Controller {
    private loginRouter = express.Router();
    private router = express.Router();
    private log = debug("authController");
    constructor (
        @inject(UserService) private userService: UserService,
    ) {
        this.InitLoginRouter();
        this.InitRouter();
    }

    private InitLoginRouter() {
        // this.loginRouter.get('/google',
        //     passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']})
        // );
        // this.loginRouter.get('/google/callback',
        //     passport.authenticate('google', { failureRedirect: '/' }),
        //     (req, res) => {
        //         res.send('Authenticated successfully')
        //     }
        // );
        this.loginRouter.get('/local',
            passport.authenticate('local'),    
            (req, res, next) => {
                this.log('login request');
                res.send("loginController");
            }
        );
    }

    private InitRouter() {
        this.router.use('/login', this.loginRouter);
        
        this.router.post('/register', async (req, res, next) => {
            // TODO: validate req.body
            this.log('registration request:', JSON.stringify(req.body));
            let result = this.userService.register(req.body, (data) => {
                res.json({success: true, message: "Registered successfully.", data});
            }, (err) => {
                res.json({success: false, message: "Failed to register."});
            });
            // if (result) {
                // res.json({success: true, message: "Registered successfully.", data: result});
            // } else {
                // res.json({success: false, message: "Failed to register."});
            // }
        });
        
        this.router.get('*', (req, res, next) => {
            res.send({ message: "authController"});
        });
    }
    
    getRouter(): Router {
        return this.router;
    }
    
}