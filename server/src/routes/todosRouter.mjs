import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';

import TodosController from '../app/controllers/TodosController.mjs';

router.get('/all', authVerify, TodosController.getTodos);
router.post('/create', authVerify, TodosController.createTodo);
router.put('/edit/:_id', authVerify, TodosController.editTodo);
router.delete('/delete/:_id', authVerify, TodosController.deleteTodo);
router.get('/search', authVerify, TodosController.searchTodoByName);
router.get('/filter', authVerify, TodosController.filterTodoByLabel);

export default router;
