
import { createUser, login } from '../services/userServices.js';

export async function onBoardUser  (req, res, next) {
    try {
        const user = await createUser(req.body);
        const {password: _pw, ...safe} = user;
        res.status(201).json({
            success: true,
            message: "User created successfully",
            safe
        });
    } catch (err) {
        next(err);
    }
};

export async function loginUser (req, res, next) {
    try {
        const { email, password } = req.body;
        const token = await login(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            role: req.user.role,
            token
        });
        
    } catch (err) {
        next(err);
    }
};