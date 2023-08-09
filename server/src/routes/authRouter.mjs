import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';

import AuthController from '../app/controllers/AuthController.mjs';

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/getUser', authVerify, AuthController.getUserProfile);
router.post('/refresh', AuthController.refreshToken);


export default router;
