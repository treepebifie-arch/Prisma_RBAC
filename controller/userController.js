
import { createUser, login, verifyAccount, resendOTP } from '../services/userServices.js';

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
            token
        });
        
    } catch (err) {
        next(err);
    }
};


export async function verifyUserAccount (req, res, next) {
    try {
        const { email, otp } = req.body;
        await verifyAccount(email, otp);
        res.status(200).json({
            success: true,
            message: "Account verified successfully"
        });
    } catch (err) {
        next(err);
    }
    
};


export async function resendUserOTP (req, res, next) {
    try {
        const { email } = req.body;
        const otp = await resendOTP(email);
        res.status(200).json({
            success: true,
            message: "OTP resent successfully",
            otp
        });
    } catch (err) {
        next(err);
    }
}