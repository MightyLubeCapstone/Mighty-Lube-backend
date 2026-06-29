require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const { authenticate, comparePassword, hashPassword } = require("../routes/sessions")
const mappings = require("../models/mappings")
const User = require('../models/user');

const router = express.Router();

function createTraceId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function logForgot(traceId, step, details = {}) {
  console.log(`[forgot-password:${traceId}] ${step}`, details);
}

// Nodemailer sends emails through Gmail. In production, EMAIL_USER and EMAIL_PASS
// should come from .env so credentials are not hardcoded in the source code.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || "mightylubeemailtest@gmail.com",
    pass: process.env.EMAIL_PASS || "fbsu upww fefd kytb",
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
    const email = req.user["email"];
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
  const traceId = createTraceId();
  try {
    logForgot(traceId, "POST started", {
      hasBody: Boolean(req.body),
      hasEmail: Boolean(req.body?.email),
    });

    const { email } = req.body;
    if (!email) {
      logForgot(traceId, "POST failed validation: missing email");
      return res.status(400).json({ error: 'Invalid email address' });
    }

    logForgot(traceId, "POST looking up user", { email });
    const user = await User.findOne({ email });
    if (!user) {
      logForgot(traceId, "POST user not found", { email });
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    logForgot(traceId, "POST user found", { userID: user.userID });

    // Old flow: generate a 6-digit passcode and store it on the user document.
    // Do not log the passcode value; only log whether it was generated/saved.
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    logForgot(traceId, "POST saving reset code", { userID: user.userID });
    await user.save();
    logForgot(traceId, "POST reset code saved", { userID: user.userID });

    const mailOptions = {
      from: process.env.EMAIL_USER || "mightylubeemailtest@gmail.com",
      to: email,
      subject: "Mighty Lube Password Reset",
      text: `Your one-time passcode is ${user.resetCode}`,
    };

    logForgot(traceId, "POST sending reset email", {
      to: email,
      from: mailOptions.from,
      hasEmailUserEnv: Boolean(process.env.EMAIL_USER),
      hasEmailPassEnv: Boolean(process.env.EMAIL_PASS),
    });
    await transporter.sendMail(mailOptions);
    logForgot(traceId, "POST reset email sent", { to: email });
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] POST failed`, {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message, traceId });
  }
});

// Validates the one-time passcode that was emailed by POST /forgot.
router.get("/forgot", async (req, res) => {
  const traceId = createTraceId();
  try {
    logForgot(traceId, "GET started", {
      hasEmail: Boolean(req.headers.email),
      hasPasscode: Boolean(req.headers.passcode),
    });

    const { email, passcode } = req.headers;
    if (!email || !passcode) {
      logForgot(traceId, "GET failed validation: missing email or passcode");
      return res.status(400).json({ error: 'Empty email or passcode' });
    }

    logForgot(traceId, "GET looking up user", { email });
    const user = await User.findOne({ email });
    if (!user) {
      logForgot(traceId, "GET user not found", { email });
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    logForgot(traceId, "GET user found", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
    });

    // compare passcode to the one in document...
    if (passcode == user.resetCode) {
      user.resetCode = null;
      logForgot(traceId, "GET passcode valid, clearing reset code", { userID: user.userID });
      await user.save();
      logForgot(traceId, "GET reset code cleared", { userID: user.userID });
      return res.status(200).json({ message: "Validated passcode!" });
    }

    logForgot(traceId, "GET invalid passcode", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
    });
    res.status(401).json({ error: "Invalid passcode!" });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] GET failed`, {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message, traceId });
  }
})

router.put("/forgot", async (req, res) => {
  const traceId = createTraceId();
  try {
    logForgot(traceId, "PUT started", {
      hasBodyEmail: Boolean(req.body?.email),
      hasHeaderEmail: Boolean(req.headers.email),
      hasBodyPassword: Boolean(req.body?.password),
      hasHeaderPassword: Boolean(req.headers.password),
    });

    // Old frontend sent these in headers. Body support is kept for cleaner API calls.
    const email = req.body.email || req.headers.email;
    const password = req.body.password || req.headers.password;

    if (!email || !password) {
      logForgot(traceId, "PUT failed validation: missing email or password");
      return res.status(400).json({ error: 'Empty email or password' });
    }

    logForgot(traceId, "PUT looking up user", { email });
    const user = await User.findOne({ email });
    if (!user) {
      logForgot(traceId, "PUT user not found", { email });
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    logForgot(traceId, "PUT user found", { userID: user.userID });

    // compare password to the one in document...
    logForgot(traceId, "PUT checking if password changed", { userID: user.userID });
    if (await comparePassword(password, user.password)) {
      logForgot(traceId, "PUT rejected same password", { userID: user.userID });
      return res.status(400).json({ error: "Password must be different than previous password!" });
    }

    // change password :D
    logForgot(traceId, "PUT hashing new password", { userID: user.userID });
    let passwordHash = await hashPassword(password);
    user.password = passwordHash;
    user.resetCode = null;
    logForgot(traceId, "PUT saving new password", { userID: user.userID });
    await user.save();
    logForgot(traceId, "PUT password changed successfully", { userID: user.userID });
    res.status(200).json({ message: "Successfully changed password!" });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] PUT failed`, {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    res.status(500).json({ error: error.message, traceId });
  }
})

module.exports = router;
