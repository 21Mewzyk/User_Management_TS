import { Sequelize } from 'sequelize';
import config from './dbConfig';

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect as any,
    logging: console.log,
});

export default sequelize;
