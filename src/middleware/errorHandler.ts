import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
