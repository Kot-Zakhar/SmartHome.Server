import express from 'express'
import passport from "passport";
import { injectable } from "inversify";
import Controller from "./controller";

@injectable()
export class DeviceController implements Controller {
    public readonly router = express.Router()

    constructor() {
        this.initRouter();
    }

    private initRouter() {
        this.router.use(passport.authenticate('jwt-no-db', { session: false }));
        this.router.get('/all', (req, res, next) => {
            res.json([
                {
                    id: "id",
                    ownerId: req.user!.id,
                    deviceId: "somedeviceid"
                }
            ]);
        })
    }
}