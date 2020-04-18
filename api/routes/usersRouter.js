import express from 'express';

var usersRouter = express.Router();

usersRouter
.post('/register', (req, res, next) => {
    console.log("registration endpoing");
    res.send("Register");
})
.get('*', (req, res, next) => {
    res.send("Not known endpoing");
})

export default usersRouter;