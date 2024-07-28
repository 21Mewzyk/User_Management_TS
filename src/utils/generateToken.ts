import jwt from 'jsonwebtoken';

interface User {
    id: string;
    username: string;
}

const generateToken = (user: User): string => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, {
        expiresIn: '1h', 
    });
};

export default generateToken;
