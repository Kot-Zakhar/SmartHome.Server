import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

/**
 * This strategy doesn't make a call to the db.
 * The req.user is filled with the data from a payload.
 */
export const jwtNoDbStrategy = new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKeyProvider: (req, raw, done) => done(null, process.env.JWT_SECRET_KEY),
        algorithms: ["HS256"]
    }, (jwtPayload, done) => {
        return done(null, jwtPayload);
    }
);

export const jwtStragety = new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKeyProvider: (req, raw, done) => done(null, process.env.JWT_SECRET_KEY),
    }, async (jwtPayload, done) => {
        try {
            let user = await User.findOne({ where: { id: jwtPayload.id } });
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
);
