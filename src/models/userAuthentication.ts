import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserAuthentication extends Model {
    public id!: string;
    public username!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserAuthentication.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'UserAuthentication',
});

export default UserAuthentication;
