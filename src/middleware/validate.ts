import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

const validate = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction): Response | void => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map(detail => detail.message)
            });
        }
        next();
    };
};

export default validate;
