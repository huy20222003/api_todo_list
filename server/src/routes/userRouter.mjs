import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';

import UserController from '../app/controllers/UserController.mjs';

router.post('/send-code', UserController.sendCode);
router.post('/verify-code', UserController.verifyCode);
router.patch('/password/reset-password', UserController.resetPassword);
router.put('/profile/update', authVerify, UserController.updateUserInfo);
router.post('/upload-file', authVerify, UserController.uploadFile);
router.post('/encode-desc', UserController.encodeDescription)
router.get('/all', UserController.getUsers);
router.delete('/delete/:_id', UserController.deleteUserById);

export default router;
