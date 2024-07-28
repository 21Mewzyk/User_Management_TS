import UserData from '../models/userData';
import logger from '../utils/logger';

interface UserAttributes {
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

interface ServiceResponse {
    success: boolean;
    message?: string;
    user?: any;
    userId?: string;
}

export const createUser = async (userData: UserAttributes): Promise<ServiceResponse> => {
    try {
        const newUser = await UserData.create(userData);
        return { success: true, userId: newUser.id };
    } catch (error: any) {
        logger.error('Error creating user:', error);
        return { success: false, message: error.message };
    }
};

export const getUser = async (userId: string): Promise<ServiceResponse> => {
    try {
        const user = await UserData.findByPk(userId);
        return user ? { success: true, user } : { success: false, message: 'User not found' };
    } catch (error: any) {
        logger.error('Error fetching user:', error);
        return { success: false, message: error.message };
    }
};

export const updateUser = async (userId: string, newData: Partial<UserAttributes>): Promise<ServiceResponse> => {
    try {
        const user = await UserData.findByPk(userId);
        if (user) {
            await user.update(newData);
            return { success: true, message: 'User updated successfully' };
        }
        return { success: false, message: 'User not found' };
    } catch (error: any) {
        logger.error('Error updating user:', error);
        return { success: false, message: error.message };
    }
};

export const deleteUser = async (userId: string): Promise<ServiceResponse> => {
    try {
        const result = await UserData.destroy({ where: { id: userId } });
        return result ? { success: true, message: 'User deleted successfully' } : { success: false, message: 'User not found' };
    } catch (error: any) {
        logger.error('Error deleting user:', error);
        return { success: false, message: error.message };
    }
};

export const getAllUsers = async (): Promise<UserAttributes[]> => {
    try {
        const users = await UserData.findAll();
        return users;
    } catch (error: any) {
        logger.error('Error fetching users:', error);
        throw error;
    }
};
