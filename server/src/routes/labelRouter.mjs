import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';

import LabelController from '../app/controllers/LabelController.mjs';

router.get('/all', authVerify, LabelController.getLabels);
router.post('/create', authVerify, LabelController.createLabel);
router.put('/edit/:_id', authVerify, LabelController.editLabel);
router.delete('/delete/:_id', authVerify, LabelController.deleteLabel);
router.get('/search', authVerify, LabelController.searchLabelByName);

export default router;
