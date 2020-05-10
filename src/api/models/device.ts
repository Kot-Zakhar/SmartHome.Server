import { Model, DataTypes, Sequelize } from "sequelize";

export default class Device extends Model {
    public id!: number;
    public ownerId!: number;
    public deviceId!: string;

    public static initSelf(sequelize: Sequelize) {
        Device.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            ownerId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            deviceId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        }, {
            sequelize,
        });
    }
}
