import express from 'express';
import debug from 'debug';
import loginController from './loginController';

const log = debug("authController");

const authRouter = express.Router()

.use('/login', loginController)

.post('/register', (req, res, next) => {
    log("registration endpoing");
    res.send("Register");
})

.get('*', (req, res, next) => {
    res.send("authController");
});

export default authRouter;