const Labels = require('../models/Label');

class todosControllers {
  async all(req, res) {
    try {
      const labels = await Labels.find({ userId: req._id });
      res
        .status(200)
        .json({ status: true, message: 'Get Successful!', labels });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async create(req, res) {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ status: false, message: 'Missing name!' });
    }

    try {
      const newLabel = new Labels({ name, userId: req._id });
      await newLabel.save();
      res
        .status(200)
        .json({ status: true, message: 'Add todo successful!', newLabel });
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async edit(req, res) {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ status: false, message: 'Missing name!' });
    }

    try {
      const label = await Labels.findByIdAndUpdate(req.params._id, req.body);
      if (!label) {
        res.status(400).json({ status: true, message: 'Edit failed!' });
      } else {
        res.status(201).json({ status: true, message: 'Edit successful!' });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async delete(req, res) {
    try {
      const label = await Labels.findByIdAndDelete(req.params._id);
      if (!label) {
        res.status(400).json({ status: true, message: 'Delete failed!' });
      } else {
        res.status(201).json({ status: true, message: 'Delete successful!' });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  async search(req, res) {
    const name = req.query.name;

    try {
      const label = await Labels.find({
        userId: req._id,
        name: { $regex: name, $options: 'i' },
      });
      if (!label) {
        res.status(400).json({ status: true, message: 'Search failed!' });
      } else {
        res
          .status(201)
          .json({ status: true, message: 'Search successful!', label });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error });
    }
  }

  // async filter(req, res) {
  //     const label = req.query.label;

  //     try {
  //         const label = await Todos.find({userId: req._id, label});
  //         if(!label) {
  //             res.status(400).json({ status: true, message: 'Filter failed!' });
  //         } else {
  //             res.status(201).json({ status: true, message: 'Filter successful!', todo });
  //         }
  //     } catch (error) {
  //         res.status(500).json({ status: false, message: error });
  //     }
  // }
}

module.exports = new todosControllers();
