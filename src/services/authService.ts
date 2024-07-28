import bcrypt from 'bcryptjs';
import UserAuthentication from '../models/userAuthentication';
import logger from '../utils/logger';

interface UserData {
    id: string;
    username: string;
    password: string;
}

interface ServiceResponse {
    success: boolean;
    userId?: string;
    message?: string;
    user?: any;
}

export const registerUser = async (userData: UserData): Promise<ServiceResponse> => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUserAuth = await UserAuthentication.create({
            id: userData.id,
            username: userData.username,
            password: hashedPassword,
        });
        return { success: true, userId: newUserAuth.id };
    } catch (error: any) {
        logger.error('Error during registration:', error);
        return { success: false, message: error.message };
    }
};

export const loginUser = async (username: string, password: string): Promise<ServiceResponse> => {
    try {
        const user = await UserAuthentication.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            return { success: true, user };
        }
        return { success: false, message: 'Invalid username or password' };
    } catch (error: any) {
        logger.error('Error during login:', error);
        return { success: false, message: error.message };
    }
};
