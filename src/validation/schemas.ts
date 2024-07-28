import Joi from 'joi';

export const userSchema = Joi.object({
    id: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string().required(),
    occupation: Joi.string().required(),
    birthdate: Joi.date().required(),
    maritalStatus: Joi.string().valid('Single', 'Married', 'Divorced', 'Widowed').required(),
    sex: Joi.string().valid('Male', 'Female').required(),
    email: Joi.string().email().optional(),
});

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
