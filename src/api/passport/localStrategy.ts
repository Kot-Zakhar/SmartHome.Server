import { Strategy } from 'passport-local';

export default new Strategy(
    (username, password, done) => {
        // TODO: implement search of the user by username and passowrd
        if (username != "test")
            return done(null, false, { message: "Incorrect username" });
        if (password != "test")
            return done(null, false, { message: "Wrong password." });
        
        return done(null, { username: "test" });
    }
);