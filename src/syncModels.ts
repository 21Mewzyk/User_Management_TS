import sequelize from './config/database';
import UserAuthentication from './models/userAuthentication';
import UserData from './models/userData';

const syncModels = async () => {
    try {
        await sequelize.sync({ force: false }); 
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing models:', error);
    }
};

