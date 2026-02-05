import prisma from '../lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create a new user
export async function createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const otp = Math.floor (100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes
    const newUser = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            otp: otp,
            otpExpiry: otpExpiry,
            isVerified: false

        },
    });
    return newUser;
};

export async function login (email, password) {
    const user = await prisma.user.findUnique({ 
        where: { email } });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    };
    if (!user.isVerified) {
        throw new Error('Please verify your email before logging in');
    }
    const token = jwt.sign({ role: user.role, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};