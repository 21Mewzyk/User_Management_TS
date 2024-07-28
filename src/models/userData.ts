import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserDataAttributes {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    occupation: string;
    birthdate: Date;
    maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    sex: 'Male' | 'Female';
    email?: string;
}

interface UserDataCreationAttributes extends Optional<UserDataAttributes, 'id'> {}

class UserData extends Model<UserDataAttributes, UserDataCreationAttributes> implements UserDataAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public address!: string;
    public occupation!: string;
    public birthdate!: Date;
    public maritalStatus!: 'Single' | 'Married' | 'Divorced' | 'Widowed';
    public sex!: 'Male' | 'Female';
    public email?: string;
}

UserData.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        maritalStatus: {
            type: DataTypes.ENUM('Single', 'Married', 'Divorced', 'Widowed'),
            allowNull: false,
        },
        sex: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'UserData',
        timestamps: true,
    }
);

export default UserData;
    