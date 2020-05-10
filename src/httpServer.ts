import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import morgan from 'morgan';
import debug from 'debug';

import ApiController from './api/apiController';
import SequelizeDb from './api/sequelize/SequelizeDb';
import { diContainer } from './api/inversify.config';

export default class HttpServer {
    private server: express.Express;
    private log = debug('app:HttpServer');

    constructor(port: number, staticFolder?: string) {
        this.server = express();
       
        this.useCors();
        this.useMorgan('tiny');
        this.mountApi('/api');
        if (staticFolder)
            this.useStaticFolder(staticFolder);
        this.testAndSyncSequelize();
        const log = this.log;
        this.listen(port, () => log(`Http is started on ${port}. Static files are hosted from ${staticFolder}`));

    }

    connectToMongo() {
        // connecting to db
        const databaseConnectionString = process.env.MONGODB_CONNECTION_STRING;
        const databaseSecret = process.env.MONGODB_SECRET;
        if (!databaseConnectionString || !databaseSecret) {
          this.log("MongoDB credentials are not provided (MONGODB_CONNECTION_STRING or MONGODB_SECRET).");
          throw new Error("MongoDB credentials are not provided (MONGODB_CONNECTION_STRING or MONGODB_SECRET).");
          
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

    testAndSyncSequelize() {
        let sequelize = diContainer.get(SequelizeDb);
        sequelize.authenticate()
            .then(() => {
                sequelize.sync()
                    .then(() => {
                        this.log("Sequelized synced successfully.");
                        sequelize.createTestData();
                    })
                    .catch(err => this.log("Error while syncing sequelized: ", err));
            })
            .catch(err => {
                this.log("Unable to connect to the database: ", err);
            });
    }

    useCors() {
        this.server.use(cors());
    }

    useMorgan(format: string) {
        this.server.use(morgan(format));
    }

    mountApi(mountPoint: string) {
        this.server.use(mountPoint, new ApiController().router);
    }

    useStaticFolder(path: string) {
        this.server.use(express.static(path));
    }

    listen(port: number | string, callback?) {
        this.server.listen(port, callback);
    }
}