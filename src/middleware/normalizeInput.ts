import { Request, Response, NextFunction } from 'express';

const normalizeInput = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.maritalStatus) {
        req.body.maritalStatus = req.body.maritalStatus.toLowerCase();
    }
    if (req.body.sex) {
        req.body.sex = req.body.sex.toLowerCase();
    }
    next();
};

export default normalizeInput;
