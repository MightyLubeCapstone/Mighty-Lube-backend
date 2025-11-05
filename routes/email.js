require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { authenticate, comparePassword, hashPassword } = require("../routes/sessions")
const mappings = require("../models/mappings")
const User = require('../models/user');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mightylubeemailtest@gmail.com",
    pass: "fbsu upww fefd kytb",
  },
});

function getMappedInfo(order) {
  const modelName = order.productType ? order.productType : null;

  const modelMapping = mappings[`${modelName}_Mapping`];

  function mapValues(field, selectedValue) {
    if (!modelMapping || modelMapping[field] === undefined) {
      return selectedValue;
    }
    else {
      if (modelMapping[field] != null) {
        return modelMapping[field][selectedValue.toString()];
      }
    }
  }

  function mapTemplateValues(field, selectedValue) {
    if (!modelMapping || !modelMapping.monitorData[field])
      return selectedValue;
    return modelMapping.monitorData[field][selectedValue.toString()];
  }

  let mappedInfo = order.productConfigurationInfo;
  // ✅ Map top-level fields
  if (modelMapping) {
    Object.keys(modelMapping).forEach(field => {
      if (mappedInfo[field] !== undefined && mappedInfo[field] != -1) {
        if (typeof mappedInfo[field] !== 'object' || mappedInfo[field] === null) {
          mappedInfo[field] = mapValues(field, mappedInfo[field]);
        }
      }
      else {
        delete mappedInfo[field];
      }
    });
    delete mappedInfo._id;
  }

  // ✅ Handle `monitorData` (templateA fields)
  if (mappedInfo.monitorData) {
    mappedInfo.monitorData = { ...order.productConfigurationInfo.monitorData };
    if (modelMapping && modelMapping.monitorData) {
      Object.keys(modelMapping.monitorData).forEach(field => {
        if (mappedInfo.monitorData[field] !== undefined && mappedInfo.monitorData[field] != -1) {
          mappedInfo.monitorData[field] = mapTemplateValues(
            field,
            mappedInfo.monitorData[field]
          );
        }
        else {
          delete mappedInfo.monitorData[field];
        }
      });
      delete mappedInfo.monitorData._id;
    }
  }
  if (mappedInfo.templateBData) {
    mappedInfo.templateBData = { ...order.productConfigurationInfo.templateBData };
    if (modelMapping && modelMapping.templateBData) {
      Object.keys(modelMapping.templateBData).forEach(field => {
        if (mappedInfo.templateBData[field] !== undefined && mappedInfo.templateBData[field] != -1) {
          mappedInfo.templateBData[field] = mapTemplateValues(
            field,
            mappedInfo.templateBData[field]
          );
        }
        else {
          delete mappedInfo.templateBData[field];
        }
      });
      delete mappedInfo.templateBData._id;

    }
  }
  if (mappedInfo.templateCData) {
    mappedInfo.templateCData = { ...order.productConfigurationInfo.templateCData };
    if (modelMapping && modelMapping.templateCData) {
      Object.keys(modelMapping.templateCData).forEach(field => {
        if (mappedInfo.templateCData[field] !== undefined && mappedInfo.templateCData[field] != -1) {
          mappedInfo.templateCData[field] = mapTemplateValues(
            field,
            mappedInfo.templateCData[field]
          );
        }
        else {
          delete mappedInfo.templateCData[field];
        }
      });
    }
    delete mappedInfo.templateCData._id;
  }
  if (mappedInfo.templateDData) {
    mappedInfo.templateDData = { ...order.productConfigurationInfo.templateDData };
    if (modelMapping && modelMapping.templateDData) {
      Object.keys(modelMapping.templateDData).forEach(field => {
        if (mappedInfo.templateDData[field] !== undefined && mappedInfo.templateDData[field] != -1) {
          mappedInfo.templateDData[field] = mapTemplateValues(
            field,
            mappedInfo.templateDData[field]
          );
        }
        else {
          delete mappedInfo.templateDData[field];
        }
      });
    }
    delete mappedInfo.templateDData._id;
  }
  if (mappedInfo.templateEData) {
    mappedInfo.templateEData = { ...order.productConfigurationInfo.templateEData };
    if (modelMapping && modelMapping.templateEData) {
      Object.keys(modelMapping.templateEData).forEach(field => {
        if (mappedInfo.templateEData[field] !== undefined && mappedInfo.templateEData[field] != -1) {
          mappedInfo.templateEData[field] = mapTemplateValues(
            field,
            mappedInfo.templateEData[field]
          );
        }
        else {
          delete mappedInfo.templateEData[field];
        }
      });
    }
    delete mappedInfo.templateEData._id;
  }
  if (mappedInfo.templateFData) {
    mappedInfo.templateFData = { ...order.productConfigurationInfo.templateFData };
    if (modelMapping && modelMapping.templateFData) {
      Object.keys(modelMapping.templateFData).forEach(field => {
        if (mappedInfo.templateFData[field] !== undefined && mappedInfo.templateFData[field] != -1) {
          mappedInfo.templateFData[field] = mapTemplateValues(
            field,
            mappedInfo.templateFData[field]
          );
        }
        else {
          delete mappedInfo.templateFData[field];
        }
      });
    }
    delete mappedInfo.templateFData._id;
  }
  return mappedInfo;
}

router.post('/send-email', authenticate, async (req, res) => {
  try {
    const configuration = req.user.configurations[req.user.configurations.length - 1];
    // Commented out for testing purposes
    //const email = req.user["email"];
    const email = 'mightylube.test@gmail.com'; // <- hardcoded recipient for testing
    if (!email) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    let emailContent = `Contact Information:\n\tName: ${req.user["firstName"]} ${req.user["lastName"]}\n\tPhone: ${req.user["phoneNumber"]}\n\tCompany: ${req.user["companyName"]}\n\tCountry: ${req.user["country"]}`;
    configuration.cart.forEach((order) => {
      emailContent += `\n\n\n#################################################\n${order.productType}\n\nRequested number of this item: ${order.numRequested}\n`;
      order = getMappedInfo(order);
      Object.entries(order).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          emailContent += `\n${key}:\n${JSON.stringify(value, null, 2)}\n`;
        } else {
          emailContent += `\n${key}:\t${value}\n`;
        }
      });
    })
    const mailOptions = {
      from: email,
      to: "mightylubeemailtest@gmail.com",
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
    // randomize the code....
    let randNum = Math.floor(100000 + Math.random() * 900000);
    user.resetCode = randNum;
    await user.save();

    const mailOptions = {
      from: "mightylubeemailtest@gmail.com",
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