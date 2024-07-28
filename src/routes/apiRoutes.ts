import express, { Request, Response } from 'express';
import { deleteUser } from '../controllers/deleteController';
import { getUser, getAllUsers } from '../controllers/getUserController';
import { updateUser } from '../controllers/updateUserController';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import UserData from '../models/userData';
import { format } from 'date-fns';

const router = express.Router();

router.delete('/user/:userId', authenticateToken, deleteUser);
router.get('/user/:userId', authenticateToken, getUser);
router.get('/users', authenticateToken, getAllUsers);
router.put('/user/:userId', authenticateToken, updateUser);
router.get('/protected', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await UserData.findOne({ where: { id: (req.user as any).userId } });
        if (user) {
            const formattedBirthdate = format(new Date(user.birthdate), 'yyyy-MM-dd');
            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                occupation: user.occupation,
                birthdate: formattedBirthdate,
                maritalStatus: user.maritalStatus,
                sex: user.sex,
                email: user.email
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
