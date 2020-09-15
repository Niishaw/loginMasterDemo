const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const UserList = require('../models/UserList');

// @route   GET api/userLists
// @desc    Get user's user lists
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const userLists = await UserList.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(userLists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   POST api/userLists
// @desc    Add new user to user's list
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, gender, IDNumber, email, phone, type } = req.body;

    try {
      const newUserList = new UserList({
        name,
        lastName,
        gender,
        IDNumber,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const userList = await newUserList.save();

      res.json(userList);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/userLists/:id
// @desc    Update user's user list
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, lastName, IDNumber, email, phone, gender, type } = req.body;

  const userListFields = {};
  if (name) userListFields.name = name;
  if (lastName) userListFields.lastName = lastName;
  if (IDNumber) userListFields.IDNumber = IDNumber;
  if (email) userListFields.email = email;
  if (phone) userListFields.phone = phone;
  if (gender) userListFields.gender = gender;
  if (type) userListFields.type = type;

  try {
    let userList = await UserList.findById(req.params.id);

    if (!userList) {
      return res.status(400).json({ msg: 'User List not found' });
    }

    //User owns the List
    if (userList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Autorized' });
    }

    userList = await UserList.findByIdAndUpdate(
      req.params.id,
      { $set: userListFields },
      { new: true }
    );
    res.json(userList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   DELETE api/userLists/:id
// @desc    Delete a user from user's list
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let userList = await UserList.findById(req.params.id);
    if (!userList) {
      return res.status(400).json({ msg: 'User List not found' });
    }
    //User owns the List to delete
    if (userList.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Autorized' });
    }

    await UserList.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User List Removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
