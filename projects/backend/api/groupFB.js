const group = require('../models/group.model');
const { async } = require('rxjs');


exports.getAll = async (req, res) => {
  try {
    var data = await group.find().exec();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
}

