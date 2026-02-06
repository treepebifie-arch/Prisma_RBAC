import express from 'express';
import { onBoardUser, loginUser, verifyUserAccount, resendUserOTP} from '../controller/userController.js';
import { signupSchema, loginSchema } from '../middleware/request.validation.js';
import { isAuth } from '../middleware/Auth.js';

const router = express.Router();

router.post ('/signup', signupSchema, onBoardUser);
router.post ('/login', loginSchema, loginUser);
router.put ('/verify-account', verifyUserAccount);
router.put ('/resend-otp', resendUserOTP);

export default router;