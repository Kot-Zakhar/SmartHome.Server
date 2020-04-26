import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import morgan from 'morgan';
import debug from 'debug';

import ApiController from './api/apiController';
import { once } from 'cluster';

export class Server {
    private server: express.Express;
    private log = debug('Server');

    constructor() {
        this.server = express();
       
    }

    connectToMongo() {
        // connecting to db
        const databaseConnectionString = process.env.MONGODB_CONNECTION_STRING;
        const databaseSecret = process.env.MONGODB_SECRET;
        if (!databaseConnectionString || !databaseSecret) {
          this.log("MongoDB credentials are not provided (MONGODB_CONNECTION_STRING or MONGODB_SECRET).");
          throw new Error("No connection to MongoDB.");
          
        } else {
            mongoose.connect(databaseConnectionString, {useNewUrlParser: true});
            mongoose.connection
            .on('connected', () => {
                this.log('Connected to database ' + databaseConnectionString)
            })
            .on('error', (...err) => {
                throw new Error("Error while connecting to Mongo: " + JSON.stringify(err));
            })
            .once('open', () => this.log("Connection is opened."));
        }
    }

    useCors() {
        this.server.use(cors());
    }

    useMorgan(format: string) {
        this.server.use(morgan(format));
    }

    mountApi(mountPoint: string) {
        this.server.use(mountPoint, new ApiController().getRouter());
    }

    useStaticFolder(path: string) {
        this.server.use(express.static(path));
    }

    listen(port: number | string, callback?) {
        this.server.listen(port, callback);
    }

    enableLogs(namespace: string) {
        debug.enable(namespace);
        this.log("Logging is enabled");
    }
}