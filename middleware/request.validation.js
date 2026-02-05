import joi from 'joi';

// Define validation schemas

const userSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

const signupUser = userSchema;

const loginUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
});

const updateUser = joi.object({
    name: joi.string().min(3).max(30),
    email: joi.string().email(),
    password: joi.string().min(6),
});

// Validation middleware factory
 export function validate(Schema) {
    return (req, res, next) => {
        const { error } = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
}
 
export const signupSchema = validate(signupUser);
export const loginSchema = validate(loginUser);
export const updateUserSchema = validate(updateUser);