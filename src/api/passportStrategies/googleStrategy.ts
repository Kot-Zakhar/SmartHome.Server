import { OAuth2Strategy as Strategy } from 'passport-google-oauth';
import env from '../environments/environment';
import debug from 'debug';

const log = debug("googleStrategy");

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
if (!googleClientId)
    log("GOOGLE_CLIENT_ID is not provided.");
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
if (!googleClientSecret)
    log("GOOGLE_CLIENT_SECRET is not provided.");
const googleCallbackUrl = env.googleAuthCallbackUrl;

export default new Strategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: googleCallbackUrl
}, (accessToken, refreshToken, profile, done) => {
    log(`Access token: ${accessToken}\nRefresh token: ${refreshToken}\nProfile: ${JSON.stringify(profile)}`);
    done(null, { id: profile._json.sub, email: profile._json.email, name: profile._json.name });
});