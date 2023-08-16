import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';

import UserController from '../app/controllers/UserController.mjs';

router.post('/send-code', UserController.sendCode);
router.post('/verify-code', UserController.verifyCode);
router.patch('/password/reset-password', UserController.resetPassword);
router.put('/profile/update', authVerify, authorizeRoles(['admin', 'user']), UserController.updateUserInfo);
router.post('/upload-file', authVerify, authorizeRoles(['admin', 'user']), UserController.uploadFile);
router.post('/encode-desc', UserController.encodeDescription)
router.get('/all',authVerify, authorizeRoles(['admin']), UserController.getUsers);
router.delete('/delete/:_id', authVerify, authorizeRoles(['admin']), UserController.deleteUserById);

export default router;
