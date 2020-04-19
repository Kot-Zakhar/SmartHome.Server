import express from 'express';
import debug from 'debug';
import passport from 'passport';

const log = debug("loginController");

const loginControler = express.Router()
.get('/google',
    passport.authenticate('google', { scope: [ 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']})
)
.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.send('Authenticated successfully')
    }
)
.get('/local',
    passport.authenticate('local'),    
    (req, res, next) => {
        log('login request');
        res.send("loginController");
    }
);

export default loginControler;