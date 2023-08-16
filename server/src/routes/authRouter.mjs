import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import AuthController from '../app/controllers/AuthController.mjs';

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/getUser', authVerify, authorizeRoles(['admin', 'user']), AuthController.getUserProfile);
router.post('/refresh', AuthController.refreshToken);
router.put('/update-role', authVerify, authorizeRoles(['admin']), AuthController.updateRoles);


export default router;
