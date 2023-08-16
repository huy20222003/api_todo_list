import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';

import TodosController from '../app/controllers/TodosController.mjs';

router.get('/all', authVerify, authorizeRoles(['admin', 'user']), TodosController.getTodos);
router.post('/create', authVerify, authorizeRoles(['admin', 'user']), TodosController.createTodo);
router.put('/edit/:_id', authVerify, authorizeRoles(['admin', 'user']), TodosController.editTodo);
router.delete('/delete/:_id', authVerify, authorizeRoles(['admin', 'user']), TodosController.deleteTodo);
router.get('/search', authVerify, authorizeRoles(['admin', 'user']), TodosController.searchTodoByName);
router.get('/filter', authVerify, authorizeRoles(['admin', 'user']), TodosController.filterTodoByLabel);

export default router;
