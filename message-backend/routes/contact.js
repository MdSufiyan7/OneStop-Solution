const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    return res.status(201).json({ success: true, message: 'Message received. Thank you!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
