import { Strategy } from 'passport-local';
import debug from 'debug';
import User from '../models/user';

const log = debug("app:LocalStrategy");

export const localStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            log(`searching the user(${email},${password})`);
            // TODO: implement hashing the password
            let user = await User.findOne({
                where: {
                    email,
                    passwordHash: password
                }
            });
            log(`found: ${JSON.stringify(user, null, 2)}`);
            return done(null, user);
        } catch (err) {
            log(`Couldn't find a user: ${err}`);
            return done(null, false, { message: "Incorrect credentials." })
        }
    }
);