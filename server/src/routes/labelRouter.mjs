import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';

import LabelController from '../app/controllers/LabelController.mjs';

router.get('/all', authVerify, authorizeRoles(['admin', 'user']), LabelController.getLabels);
router.post('/create', authVerify, authorizeRoles(['admin', 'user']), LabelController.createLabel);
router.put('/edit/:_id', authVerify, authorizeRoles(['admin', 'user']), LabelController.editLabel);
router.delete('/delete/:_id', authVerify, authorizeRoles(['admin', 'user']), LabelController.deleteLabel);
router.get('/search', authVerify, authorizeRoles(['admin', 'user']), LabelController.searchLabelByName);

export default router;
