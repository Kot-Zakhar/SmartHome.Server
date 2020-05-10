import express, { Router } from 'express';
import debug from 'debug';
import passport from 'passport';
import { injectable, inject } from 'inversify';

import Controller from './controller';
import UserService from '../services/userService';
import User from '../models/user';

@injectable()
export default class AuthController implements Controller {
    public readonly router = express.Router();

    private loginRouter = express.Router();
    private log = debug("app:AuthController");
    
    constructor (
        @inject(UserService) private userService: UserService,
    ) {
        this.InitLoginRouter();
        this.InitRouter();
    }

    private InitLoginRouter() {
        // this.loginRouter.post('/google',
        //     passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']})
        // );
        // this.loginRouter.post('/google/callback',
        //     passport.authenticate('google', { failureRedirect: '/' }),
        //     (req, res) => {
        //         res.send('Authenticated successfully')
        //     }
        // );
        this.loginRouter.post('/local', 
            (req, res, next) => {
                this.log("local authentication with passport.");
                passport.authenticate('local', { session: false }, (err, user: User, info) => {
                    if (err || !user) {
                        return res.status(400).json({
                            message: 'There are some errors: ' + err
                        });
                    }

                    const authToken = this.userService.createAuthToken(user);
                    this.log(`User ${user.email} is logged in: \n${authToken}`);
                    return res.json({authToken});
                    
                })(req, res);
            }
        );
    }

    private InitRouter() {
        this.router.use('/login', this.loginRouter);
        
        this.router.post('/register', async (req, res, next) => {
            // TODO: validate req.body
            this.log('registration request:', JSON.stringify(req.body));
            let user = await this.userService.registerAsync(req.body);
            if (user) {
                res.json({success: true, message: "Registered successfully.", data: user});
            } else {
                res.json({success: false, message: "Failed to register."});
            }
        });
        
        this.router.get('*', (req, res, next) => {
            res.send({ message: "authController"});
        });
    }
    
    getRouter(): Router {
        return this.router;
    }
    
}