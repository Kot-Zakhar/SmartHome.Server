import debug from 'debug';
import User from "../models/User";
import UserModel from '../mongoose/models/userModel';
import { injectable } from 'inversify';

@injectable()
export class UserService {
    constructor() {}
    
    private log = debug("UserService");

    async registerAsync(userData: any): Promise<object | null> {

        let userToCreate = new UserModel({
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        try {
            let userDocument = await userToCreate.save();
            // let user = new User();
            // user.name = userDocument.
            // let savedUser = await userToCreate.save();
            return userDocument;
        } catch (err) {
            this.log(err);
            return null;
        }
    }

    register(userData: any, onfulfilled, onrejected): Promise<object | null> {
        let userToCreate = new UserModel({
            name: userData.name,
            email: userData.email,
            password: userData.password
        });
        // try {
            let userDocument = userToCreate.save();
            userDocument.then(onfulfilled, onrejected);
            // let user = new User();
            // user.name = userDocument.
            // let savedUser = await userToCreate.save();
            return userDocument;
        // } catch (err) {
            // this.log(err);
            // return null;
        // }
    }
}
