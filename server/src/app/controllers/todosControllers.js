const Todos = require('../models/Todos');

class todosControllers {
    async all(req, res) {
        try {
            const todos = await Todos.find({ userId: req._id });
            res.status(200).json({ status: true, message: 'Get Successful!', todos });
        } catch (error) {
            res.status(403).json({ status: false, message: error });
        }
    }

    async create(req, res) {
        const { name, description, label } = req.body;
        if(!name || !label) {
            res.status(400).json({ status: false, message: 'Missing name or status!' });
        }

        try {
            const newTodo = new Todos({ name, description, label, userId: req._id });
            await newTodo.save();
            res.status(200).json({ status: true, message: 'Add todo successful!', newTodo });
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async edit(req, res) {
        const { name, label } = req.body;
        if(!name || !label) {
            res.status(400).json({ status: false, message: 'Missing name or label!' });
        }

        try {
            const todo = await Todos.findByIdAndUpdate(req.params._id, req.body);
            if(!todo) {
                res.status(400).json({ status: true, message: 'Edit failed!' });
            } else {
                res.status(201).json({ status: true, message: 'Edit successful!' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async delete(req, res) {
        try {
            const todo = await Todos.findByIdAndDelete(req.params._id);
            if(!todo) {
                res.status(400).json({ status: true, message: 'Delete failed!' });
            } else {
                res.status(201).json({ status: true, message: 'Delete successful!' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }

    async search(req, res) {
        const name = req.query.name;

        try {
            const todo = await Todos.find({userId: req._id, name: { $regex: name, $options: 'i' }});
            if(!todo) {
                res.status(400).json({ status: true, message: 'Search failed!' });
            } else {
                res.status(201).json({ status: true, message: 'Search successful!' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error });
        }
    }
}

module.exports = new todosControllers();