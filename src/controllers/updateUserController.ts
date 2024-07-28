import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import UserAuthentication from '../models/userAuthentication';
import UserData from '../models/userData';

export const updateUser = async (req: Request, res: Response): Promise<Response | void> => {
    const { userId } = req.params;
    const { username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;
    try {
        const [userAuth, userData] = await Promise.all([
            UserAuthentication.findByPk(userId),
            UserData.findByPk(userId)
        ]);

        if (!userAuth || !userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updateFields = async (model: any, fields: { [key: string]: any }) => {
            for (const [key, value] of Object.entries(fields)) {
                if (value) model[key] = key === 'password' ? await bcrypt.hash(value, 10) : value;
            }
            await model.save();
        };

        await Promise.all([
            updateFields(userAuth, { username, password }),
            updateFields(userData, { firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email })
        ]);

        return res.status(200).json({ message: 'User updated successfully', userAuth, userData });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
