require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const { authenticate, comparePassword, hashPassword } = require("../routes/sessions")
const mappings = require("../models/mappings")
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

// helper to generate a PDF buffer from configuration + user data
function generatePdfBuffer(configuration, user) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ autoFirstPage: false });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      // first page with contact info
      doc.addPage();
      doc.fontSize(16).text('Configuration Details', { underline: true });
      doc.moveDown();
      doc.fontSize(12).text('Contact Information:');
      doc.moveDown(0.5);
      doc.fontSize(11).text(`Name: ${user.firstName || ''} ${user.lastName || ''}`);
      doc.text(`Phone: ${user.phoneNumber || ''}`);
      doc.text(`Company: ${user.companyName || ''}`);
      doc.text(`Country: ${user.country || ''}`);
      doc.moveDown();

      // for each order add a page and the mapped fields
      (configuration.cart || []).forEach((order, idx) => {
        const mapped = getMappedInfo(order);
        // ensure each order starts on its own page
        doc.addPage();
        doc.fontSize(14).text(order.productType || `Item ${idx + 1}`, { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11).text(`Requested number of this item: ${order.numRequested || ''}`);
        doc.moveDown(0.5);

        // print mapped fields
        Object.entries(mapped || {}).forEach(([key, value]) => {
          if (key === '_id') return;
          doc.text(`${key}: ${value}`);
        });
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

router.post('/send-email', authenticate, async (req, res) => {
  try {
    const configuration = req.user.configurations[req.user.configurations.length - 1];
    const email = req.user["email"];
    if (!email) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    let emailContent = `Contact Information:\n\tName: ${req.user["firstName"]} ${req.user["lastName"]}\n\tPhone: ${req.user["phoneNumber"]}\n\tCompany: ${req.user["companyName"]}\n\tCountry: ${req.user["country"]}`;
    configuration.cart.forEach((order) => {
      emailContent += `\n\n\n#################################################\n${order.productType}\n\nRequested number of this item: ${order.numRequested}\n`;
      order = getMappedInfo(order);
      delete order._id; // Remove the _id property
      Object.entries(order).forEach(([key, value]) => {
        emailContent += `\n${key}:\t${value}\n`;
      });
    })

    // generate PDF buffer
    const pdfBuffer = await generatePdfBuffer(configuration, req.user);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: configuration.configurationName,
      text: emailContent,
      attachments: [
        {
          filename: 'configuration.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
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
    // randomize the code....
    let randNum = Math.floor(100000 + Math.random() * 900000);
    user.resetCode = randNum;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mighty Lube Password Reset",
      text: `Your One-time passcode is ${user.resetCode}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error: ', error);
    res.status(500).json({ error: error });
  }
});

// route for validating the passcode
router.get("/forgot", async (req, res) => {
  try {
    const { email, passcode } = req.headers;
    if (!email || !passcode) {
      return res.status(400).json({ error: 'Empty email or passcode' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    // compare passcode to the one in document...
    if (passcode == user.resetCode) {
      user.resetCode = null;
      return res.status(200).json({ message: "Validated passcode!" });
    }
    res.status(401).json({ error: "Invalid passcode!" });
  } catch (error) {
    console.log('Error matching passcodes: ', error);
    res.status(500).json({ error: error });
  }
})

router.put("/forgot", async (req, res) => {
  try {
    const { email, password } = req.headers;
    if (!email || !password) {
      return res.status(400).json({ error: 'Empty email or password' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    // compare password to the one in document...
    if (await comparePassword(password, user.password)) {
      return res.status(400).json({ error: "Password must be different than previous password!" });
    }
    // change password :D
    let passwordHash = await hashPassword(password);
    user.password = passwordHash;
    await user.save();
    res.status(200).json({ message: "Successfully changed password!" });
  } catch (error) {
    console.log('Error matching passcodes: ', error);
    res.status(500).json({ error: error });
  }
})

module.exports = router;