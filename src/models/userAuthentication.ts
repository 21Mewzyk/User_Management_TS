import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAuthenticationAttributes {
    id: string;
    username: string;
    password: string;
}

interface UserAuthenticationCreationAttributes extends Optional<UserAuthenticationAttributes, 'id'> {}

class UserAuthentication extends Model<UserAuthenticationAttributes, UserAuthenticationCreationAttributes>
  implements UserAuthenticationAttributes {
    public id!: string;
    public username!: string;
    public password!: string;
}

UserAuthentication.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'UserAuthentication',
        timestamps: true,
    }
);

export default UserAuthentication;
