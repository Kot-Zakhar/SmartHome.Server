import {
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Association,
    Model,
    DataTypes,
    Sequelize
} from "sequelize";

import Device from "./device";

export default class User extends Model {

    public id!: number;
    public publicId!: string;
    
    public name!: string;
    public email!: string;
    public passwordHash!: string;

    // public getDevices!: HasManyGetAssociationsMixin<Device>;
    // public addDevice!: HasManyAddAssociationMixin<Device, number>;
    // public hasDevice!: HasManyHasAssociationMixin<Device, number>;
    // public countDevices!: HasManyCountAssociationsMixin;
    // public createDevice!: HasManyCreateAssociationMixin<Device>;

    // public readonly devices?: Device[];

    // public static associations: {
    //     devices: Association<User, Device>;
    // };

    public static initSelf(sequelize: Sequelize) {
        User.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            publicId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(128),
            }, 
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            }, 
            passwordHash: {
                type: DataTypes.STRING(256),
                allowNull: false
            }
        }, {
            sequelize
        });

        User.hasMany(Device, {
            sourceKey: 'id',
            foreignKey: 'ownerId',
            as: 'devices'
        });
    }
}
