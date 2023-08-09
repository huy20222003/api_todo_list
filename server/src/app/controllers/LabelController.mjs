import Labels from '../models/Label.mjs';

class LabelController {
  async getLabels(req, res) {
    try {
      const labels = await Labels.find({ userId: req._id });
      return res
        .status(200)
        .json({ success: true, message: 'Successful!', data: labels });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Request processing error.',
        error: error.message,
      });
    }
  }

  async createLabel(req, res) {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: 'Name is required.' });
    }

    try {
      const newLabel = new Labels({ name, userId: req._id });
      await newLabel.save();
      return res
        .status(201)
        .json({ success: true, message: 'Label created.', data: newLabel });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error creating label.',
        error: error.message,
      });
    }
  }

  async editLabel(req, res) {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: 'Name is required.' });
    }

    try {
      const label = await Labels.findOneAndUpdate(
        { _id: req.params._id, userId: req._id },
        { name },
        { new: true }
      );

      if (!label) {
        return res
          .status(404)
          .json({ success: false, message: 'Label not found.' });
      }

      return res
        .status(200)
        .json({ success: true, message: 'Label updated.', data: label });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error updating label.',
        error: error.message,
      });
    }
  }

  async deleteLabel(req, res) {
    try {
      const label = await Labels.findOneAndDelete({
        _id: req.params._id,
        userId: req._id,
      });

      if (!label) {
        return res
          .status(404)
          .json({ success: false, message: 'Label not found.' });
      }

      return res.status(200).json({ success: true, message: 'Label deleted.' });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error deleting label.',
        error: error.message,
      });
    }
  }

  async searchLabelByName(req, res) {
    const name = req.query.name;

    try {
      const labels = await Labels.find({
        userId: req._id,
        name: { $regex: name, $options: 'i' },
      });

      return res
        .status(200)
        .json({ success: true, message: 'Labels found.', data: labels });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error searching label',
        error: error.message,
      });
    }
  }
}

export default new LabelController();
