require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { authenticate } = require("../routes/sessions")
const mappings = require("../models/mappings")
const mongoose = require("mongoose");
const User = require('../models/user');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function getMappedInfo(order) {
  const modelName = order.productType ? order.productType : null;

  const modelMapping = mappings[`${modelName}_Mapping`];

  function mapValues(field, selectedValue) {
    if (!modelMapping || !modelMapping[field]) {
      return selectedValue;
    }
    else {
      if (modelMapping[field] != null) {
        return modelMapping[field][selectedValue.toString()];
      }
    }
  }

  let mappedInfo = { ...order.productConfigurationInfo };

  // ✅ Map top-level fields
  if (modelMapping) {
    Object.keys(modelMapping).forEach(field => {
      if (mappedInfo[field] !== undefined) {
        mappedInfo[field] = mapValues(field, mappedInfo[field]);
      }
    });

  }
  return mappedInfo;
}

router.post('/send-email', authenticate, async (req, res) => {
  try {
    const configuration = req.user.configurations[req.user.configurations.length - 1];
    const email = req.user["email"];
    if (!email) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    let emailContent = "";
    configuration.cart.forEach((order) => {
      emailContent += `\n\n\n#################################################\n${order.productType}\n\nRequested number of this item: ${order.numRequested}\n`;
      order = getMappedInfo(order);
      delete order._id; // Remove the _id property
      Object.entries(order).forEach(([key, value]) => {
        emailContent += `\n${key}:\t${value}\n`;
      });
    })
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: configuration.configurationName,
      text: emailContent,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    console.log(user);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mighty Lube Password Reset",
      text: `Your One-time passcode is `,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;