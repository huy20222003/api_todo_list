import Todos from '../models/Todos.mjs';

class TodosController {
  async getTodos(req, res) {
    try {
      const todos = await Todos.find({ userId: req._id });
      return res
        .status(200)
        .json({ success: true, message: 'Successful!', data: todos });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Request processing error.',
        error: error.message,
      });
    }
  }

  async createTodo(req, res) {
    const { name, description, label } = req.body;
    if (!name || !label) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and label are required.' });
    }

    try {
      const newTodo = new Todos({
        name,
        description,
        label,
        userId: req._id,
      });
      await newTodo.save();
      return res
        .status(201)
        .json({ success: true, message: 'Todo created.', data: newTodo });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating todo.',
        error: error.message,
      });
    }
  }

  async editTodo(req, res) {
    const { name, description, label } = req.body;
    if (!name || !label) {
      return res
        .status(400)
        .json({ success: false, message: 'Name and label are required.' });
    }

    try {
      const todo = await Todos.findOneAndUpdate(
        { _id: req.params._id, userId: req._id },
        { name, description, label },
        { new: true }
      );

      if (!todo) {
        return res
          .status(404)
          .json({ success: false, message: 'Todo not found.' });
      }

      return res
        .status(200)
        .json({ success: true, message: 'Todo updated.', data: todo });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error edting todo.',
        error: error.message,
      });
    }
  }

  async deleteTodo(req, res) {
    try {
      const todo = await Todos.findOneAndDelete({
        _id: req.params._id,
        userId: req._id,
      });

      if (!todo) {
        return res
          .status(404)
          .json({ success: false, message: 'Todo not found.' });
      }

      return res.status(200).json({ success: true, message: 'Todo deleted.' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting todo.',
        error: error.message,
      });
    }
  }

  async searchTodoByName(req, res) {
    const name = req.query.name;

    try {
      const todos = await Todos.find({
        userId: req._id,
        name: { $regex: name, $options: 'i' },
      });

      return res
        .status(200)
        .json({ success: true, message: 'Todos found.', data: todos });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error searching todo.',
        error: error.message,
      });
    }
  }

  async filterTodoByLabel(req, res) {
    const label = req.query.label;

    try {
      const todos = await Todos.find({ userId: req._id, label });

      return res
        .status(200)
        .json({ success: true, message: 'Todos filtered.', data: todos });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error filtering todo.',
        error: error.message,
      });
    }
  }
}

export default new TodosController();
