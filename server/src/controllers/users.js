const User = require('../models/User');

exports.get = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).send(users);
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne({ id: id });
  if (user) res.status(200).send(user);
  else res.status(404).send();
};

exports.post = async (req, res, next) => {
  const user = req.body;
  if (!user) {
    res.status(404).send();
  } else {
    try {
      const inserted = await User.insertMany(user);
      res.status(200).json({ msg: 'Ok' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
};

exports.put = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne({ id: id });
  if (user) {
    const updated = await User.updateOne({ _id: user._id }, req.body);
    res.status(201).send(updated);
  } else {
    res.status(404).send();
  }
};

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const deleted = await User.findOneAndDelete({ id: id });
  if (deleted) res.status(204).send();
  else res.status(404).send();
};