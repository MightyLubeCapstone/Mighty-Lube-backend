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

function maskEmail(email) {
  if (!email || typeof email !== "string") return email;
  const [name, domain] = email.split("@");
  if (!domain) return "***";
  return `${name.slice(0, 2)}***@${domain}`;
}

function maskSecret(value) {
  if (!value) return null;
  return {
    exists: true,
    length: value.length,
    startsWith: value.slice(0, 2),
    endsWith: value.slice(-2),
  };
}

function getErrorDetails(error) {
  return {
    message: error.message,
    name: error.name,
    code: error.code,
    errno: error.errno,
    syscall: error.syscall,
    address: error.address,
    port: error.port,
    command: error.command,
    responseCode: error.responseCode,
    response: error.response,
    stack: error.stack,
  };
}

function logElapsed(traceId, step, startedAt) {
  logForgot(traceId, step, { elapsedMs: Date.now() - startedAt });
}

// Nodemailer sends emails through Gmail. In production, EMAIL_USER and EMAIL_PASS
// should come from .env so credentials are not hardcoded in the source code.
const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
const emailPort = Number(process.env.EMAIL_PORT || 465);
const emailSecure = process.env.EMAIL_SECURE
  ? process.env.EMAIL_SECURE === "true"
  : emailPort === 465;
const emailUser = process.env.EMAIL_USER || "mightylubeemailtest@gmail.com";
const emailPass = process.env.EMAIL_PASS || "fbsu upww fefd kytb";

console.log("[email-config] SMTP config loaded", {
  host: emailHost,
  port: emailPort,
  secure: emailSecure,
  user: maskEmail(emailUser),
  pass: maskSecret(emailPass),
  hasEmailUserEnv: Boolean(process.env.EMAIL_USER),
  hasEmailPassEnv: Boolean(process.env.EMAIL_PASS),
  nodeEnv: process.env.NODE_ENV || "development",
});

const transporter = nodemailer.createTransport({
  host: emailHost,
  port: emailPort,
  secure: emailSecure,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 30000,
  logger: process.env.EMAIL_DEBUG === "true",
  debug: process.env.EMAIL_DEBUG === "true",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("[email-config] SMTP startup verify failed", getErrorDetails(error));
    return;
  }

  console.log("[email-config] SMTP startup verify succeeded");
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
  const requestStartedAt = Date.now();
  try {
    logForgot(traceId, "POST started", {
      hasBody: Boolean(req.body),
      hasEmail: Boolean(req.body?.email),
      contentType: req.headers["content-type"],
      userAgent: req.headers["user-agent"],
    });

    const { email } = req.body;
    if (!email) {
      logForgot(traceId, "POST failed validation: missing email");
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const userLookupStartedAt = Date.now();
    logForgot(traceId, "POST looking up user", { email: maskEmail(email) });
    const user = await User.findOne({ email });
    logElapsed(traceId, "POST user lookup finished", userLookupStartedAt);

    if (!user) {
      logForgot(traceId, "POST user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    logForgot(traceId, "POST user found", {
      userID: user.userID,
      mongooseId: String(user._id),
      hasExistingResetCode: Boolean(user.resetCode),
    });

    // Old flow: generate a 6-digit passcode and store it on the user document.
    // Do not log the passcode value; only log whether it was generated/saved.
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;

    const saveStartedAt = Date.now();
    logForgot(traceId, "POST saving reset code", {
      userID: user.userID,
      resetCodeLength: resetCode.length,
      modifiedPaths: user.modifiedPaths(),
    });
    await user.save();
    logElapsed(traceId, "POST reset code save finished", saveStartedAt);
    logForgot(traceId, "POST reset code saved", {
      userID: user.userID,
      hasResetCodeAfterSave: Boolean(user.resetCode),
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Mighty Lube Password Reset",
      text: `Your one-time passcode is ${user.resetCode}`,
    };

    logForgot(traceId, "POST SMTP config before verify/send", {
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      from: maskEmail(mailOptions.from),
      to: maskEmail(email),
      hasEmailUserEnv: Boolean(process.env.EMAIL_USER),
      hasEmailPassEnv: Boolean(process.env.EMAIL_PASS),
      emailPass: maskSecret(emailPass),
      emailDebug: process.env.EMAIL_DEBUG === "true",
    });

    const verifyStartedAt = Date.now();
    logForgot(traceId, "POST verifying SMTP connection");
    await transporter.verify();
    logElapsed(traceId, "POST SMTP verify succeeded", verifyStartedAt);

    const sendStartedAt = Date.now();
    logForgot(traceId, "POST sending reset email", {
      to: maskEmail(email),
      from: maskEmail(mailOptions.from),
      subject: mailOptions.subject,
      textLength: mailOptions.text.length,
    });
    const sendInfo = await transporter.sendMail(mailOptions);
    logElapsed(traceId, "POST sendMail finished", sendStartedAt);
    logForgot(traceId, "POST reset email sent", {
      to: maskEmail(email),
      accepted: sendInfo.accepted,
      rejected: sendInfo.rejected,
      response: sendInfo.response,
      messageId: sendInfo.messageId,
    });
    logElapsed(traceId, "POST completed", requestStartedAt);
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] POST failed`, getErrorDetails(error));
    logElapsed(traceId, "POST failed elapsed", requestStartedAt);
    res.status(500).json({ error: error.message, traceId });
  }
});

// Validates the one-time passcode that was emailed by POST /forgot.
router.get("/forgot", async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();
  try {
    logForgot(traceId, "GET started", {
      hasEmail: Boolean(req.headers.email),
      hasPasscode: Boolean(req.headers.passcode),
      contentType: req.headers["content-type"],
    });

    const { email, passcode } = req.headers;
    if (!email || !passcode) {
      logForgot(traceId, "GET failed validation: missing email or passcode");
      return res.status(400).json({ error: 'Empty email or passcode' });
    }

    const userLookupStartedAt = Date.now();
    logForgot(traceId, "GET looking up user", { email: maskEmail(email) });
    const user = await User.findOne({ email });
    logElapsed(traceId, "GET user lookup finished", userLookupStartedAt);

    if (!user) {
      logForgot(traceId, "GET user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    logForgot(traceId, "GET user found", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
      passcodeLength: String(passcode).length,
      resetCodeLength: user.resetCode ? String(user.resetCode).length : 0,
    });

    // compare passcode to the one in document...
    if (passcode == user.resetCode) {
      user.resetCode = null;
      logForgot(traceId, "GET passcode valid, clearing reset code", { userID: user.userID });
      const saveStartedAt = Date.now();
      await user.save();
      logElapsed(traceId, "GET reset code clear save finished", saveStartedAt);
      logForgot(traceId, "GET reset code cleared", { userID: user.userID });
      logElapsed(traceId, "GET completed", requestStartedAt);
      return res.status(200).json({ message: "Validated passcode!" });
    }

    logForgot(traceId, "GET invalid passcode", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
    });
    logElapsed(traceId, "GET completed with invalid passcode", requestStartedAt);
    res.status(401).json({ error: "Invalid passcode!" });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] GET failed`, getErrorDetails(error));
    logElapsed(traceId, "GET failed elapsed", requestStartedAt);
    res.status(500).json({ error: error.message, traceId });
  }
})

router.put("/forgot", async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();
  try {
    logForgot(traceId, "PUT started", {
      hasBodyEmail: Boolean(req.body?.email),
      hasHeaderEmail: Boolean(req.headers.email),
      hasBodyPassword: Boolean(req.body?.password),
      hasHeaderPassword: Boolean(req.headers.password),
      contentType: req.headers["content-type"],
    });

    // Old frontend sent these in headers. Body support is kept for cleaner API calls.
    const email = req.body.email || req.headers.email;
    const password = req.body.password || req.headers.password;

    if (!email || !password) {
      logForgot(traceId, "PUT failed validation: missing email or password");
      return res.status(400).json({ error: 'Empty email or password' });
    }

    const userLookupStartedAt = Date.now();
    logForgot(traceId, "PUT looking up user", {
      email: maskEmail(email),
      passwordLength: String(password).length,
    });
    const user = await User.findOne({ email });
    logElapsed(traceId, "PUT user lookup finished", userLookupStartedAt);

    if (!user) {
      logForgot(traceId, "PUT user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }
    logForgot(traceId, "PUT user found", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
    });

    // compare password to the one in document...
    const compareStartedAt = Date.now();
    logForgot(traceId, "PUT checking if password changed", { userID: user.userID });
    if (await comparePassword(password, user.password)) {
      logElapsed(traceId, "PUT password comparison finished", compareStartedAt);
      logForgot(traceId, "PUT rejected same password", { userID: user.userID });
      return res.status(400).json({ error: "Password must be different than previous password!" });
    }
    logElapsed(traceId, "PUT password comparison finished", compareStartedAt);

    // change password :D
    const hashStartedAt = Date.now();
    logForgot(traceId, "PUT hashing new password", { userID: user.userID });
    let passwordHash = await hashPassword(password);
    logElapsed(traceId, "PUT password hash finished", hashStartedAt);
    user.password = passwordHash;
    user.resetCode = null;
    logForgot(traceId, "PUT saving new password", { userID: user.userID });
    const saveStartedAt = Date.now();
    await user.save();
    logElapsed(traceId, "PUT password save finished", saveStartedAt);
    logForgot(traceId, "PUT password changed successfully", { userID: user.userID });
    logElapsed(traceId, "PUT completed", requestStartedAt);
    res.status(200).json({ message: "Successfully changed password!" });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] PUT failed`, getErrorDetails(error));
    logElapsed(traceId, "PUT failed elapsed", requestStartedAt);
    res.status(500).json({ error: error.message, traceId });
  }
})

module.exports = router;
