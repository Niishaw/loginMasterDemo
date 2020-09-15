const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get user's user lists
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   POST api/contacts
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
      const newContact = new Contact({
        name,
        lastName,
        gender,
        IDNumber,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/contacts/:id
// @desc    Update user's user list
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, lastName, IDNumber, email, phone, gender, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (lastName) contactFields.lastName = lastName;
  if (IDNumber) contactFields.IDNumber = IDNumber;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (gender) contactFields.gender = gender;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(400).json({ msg: 'Contact not found' });
    }

    //User owns the List
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Autorized' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
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
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(400).json({ msg: 'Contact not found' });
    }
    //User owns the List to delete
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Autorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Contact Removed!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;