const Todos = require('../models/Todos');

class todosControllers {
    async all(req, res) {
        try {
            const todos = await Todos.find({ userId: req._id });
            res.status(200).json({ status: true, message: 'successfully', todos });
        } catch (error) {
            res.status(403).json({ status: false, message: error });
        }
    }

    async create(req, res) {
        const { name, description, label } = req.body;
        if(!name || !label) {
            res.status(400).json({ status: false, message: 'Missing name or status' });
        }

        try {
            const newTodo = new Todos({ name, description, label, userId: req._id });
            await newTodo.save();
            res.status(200).json({ status: true, message: 'Add todo successfull!', newTodo });
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async edit(req, res) {
        const { name, label } = req.body;
        if(!name || !label) {
            res.status(400).json({ status: false, message: 'Missing name or label' });
        }

        try {
            await Todos.findByIdAndUpdate(req.params._id, req.body);
            res.status(201).json({ status: true, message: 'Edit successfully!' });
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async delete(req, res) {
        try {
            await Todos.findByIdAndDelete(req.params._id);
            res.status(201).json({ status: true, message: 'Delete successfully!' });
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async search(req, res) {
        const name = req.query.name;

        try {
            const todo = await Todos.find({userId: req._id, name: { $regex: name, $options: 'i' }});
            res.status(201).json({ status: true, message: 'Search success', todo });
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }
}

module.exports = new todosControllers();