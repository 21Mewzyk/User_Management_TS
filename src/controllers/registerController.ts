import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import UserAuthentication from '../models/userAuthentication';
import UserData from '../models/userData';
import { userSchema } from '../validation/schemas';

export const registerUser = async (req: Request, res: Response): Promise<Response | void> => {
    const { id, username, password, firstName, lastName, address, occupation, birthdate, maritalStatus, sex, email } = req.body;

    try {
        const existingUserAuth = await UserAuthentication.findOne({ where: { id } });
        const existingUsername = await UserAuthentication.findOne({ where: { username } });

        if (existingUserAuth || existingUsername) {
            return res.status(400).json({ message: 'User exists already' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserAuth = await UserAuthentication.create({
            id,
            username,
            password: hashedPassword,
        });
        const newUserData = await UserData.create({
            id,
            firstName,
            lastName,
            address,
            occupation,
            birthdate,
            maritalStatus,
            sex,
            email,
        });
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
