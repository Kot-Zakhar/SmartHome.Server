import debug from 'debug';
import User from "../models/user";
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
export default class UserService {
    constructor() {}
    
    private log = debug("app:UserService");

    async registerAsync(userData: any): Promise<User | null> {
        try{
            let user = await User.create({
                name: userData.name,
                email: userData.email,
                passwordHash: userData.password
            });
            this.log("New user was created: ", JSON.stringify(user, null, 2));
            return user;
        } catch (err) {
            this.log("Cannot create a user %s: %s", JSON.stringify(userData, null, 2), err);
            return null;
        }
    }

    createAuthToken(user: User) {
        const key = process.env.JWT_SECRET_KEY;
        if (!key){
            this.log("No secret key found. Cannot proceed.");
            throw new Error("Json secret key is not found.");
        }
        return jwt.sign({
            email: user.email,
            id: user.publicId,
        }, key, {
            expiresIn: "1d",
            algorithm: "HS256"
        })
    }
}
