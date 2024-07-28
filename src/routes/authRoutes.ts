import express from 'express';
import { registerUser } from '../controllers/registerController';
import { loginUser } from '../controllers/authController';
import validate from '../middleware/validate';
import { userSchema, loginSchema } from '../validation/schemas';

const router = express.Router();

router.post('/register', validate(userSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

export default router;
