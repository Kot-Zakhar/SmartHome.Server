import { injectable } from "inversify";
import { Sequelize } from "sequelize";
import debug from 'debug';
import User from "../models/user";
import Device from "../models/device";

@injectable()
export default class SequelizeDb {
    private log = debug("app:SequelizeDb");
    
    public sequelize: Sequelize;

    constructor() {
        const mysqlConnectionString = process.env.MYSQL_CONNECTION_STRING;
        if (!mysqlConnectionString){
            this.log("No connection string for mysql.");
            throw new Error("No connection string for mysql (MYSQL_CONNECTION_STRING).")
        }
        this.log("Connecting to the database..");
        this.sequelize = new Sequelize(mysqlConnectionString);
        this.initModels();
    }

    public async sync() {
        return await this.sequelize.sync();
    }

    public async authenticate() {
        return await this.sequelize.authenticate();
    }

    public createTestData() {
        User.findOrCreate({
            where: {
                name: "test",
                email: "test@test.com",
                passwordHash: "12345"
            }
        })
            .then(([testUser, created]) => {
                this.log(`Test user was ${created ? "created" : "found"}: `, JSON.stringify(testUser, null, 2));
            })
            .catch(err => {
                this.log("Cannot create test user: ", err)
            })

    }

    public initModels() {
        Device.initSelf(this.sequelize);
        User.initSelf(this.sequelize);
    }
}