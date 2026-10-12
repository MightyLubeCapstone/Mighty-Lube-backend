require('dotenv').config();
const express = require('express');
const nodemailer = require("nodemailer");
const { authenticate, comparePassword, hashPassword } = require("../routes/sessions");
const mappings = require("../models/mappings");
const User = require('../models/user');

const router = express.Router();

/**
 * Creates a unique trace ID for each forgot-password request.
 * This makes logs easier to follow.
 */
function createTraceId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Logs each forgot-password step with the trace ID.
 */
function logForgot(traceId, step, details = {}) {
  console.log(`[forgot-password:${traceId}] ${step}`, details);
}

/**
 * Masks email addresses before logging.
 * Example: test@gmail.com -> te***@gmail.com
 */
function maskEmail(email) {
  if (!email || typeof email !== "string") return email;
  const [name, domain] = email.split("@");
  if (!domain) return "***";
  return `${name.slice(0, 2)}***@${domain}`;
}

/**
 * Masks secret values before logging.
 * Shows only length, first two characters, and last two characters.
 */
function maskSecret(value) {
  if (!value) return null;
  return {
    exists: true,
    length: value.length,
    startsWith: value.slice(0, 2),
    endsWith: value.slice(-2),
  };
}

/**
 * Converts error objects into detailed log-friendly objects.
 */
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

/**
 * Logs how long a step took.
 */
function logElapsed(traceId, step, startedAt) {
  logForgot(traceId, step, { elapsedMs: Date.now() - startedAt });
}


/**
 * Email API configuration.
 * All outgoing emails use Gmail SMTP via Nodemailer.
 */

const emailFrom = process.env.SMTP_USER;

const SECURITY_PIN_VERIFIED_MARKER = "SECURITY_PIN_VERIFIED";

if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
  console.warn(
    "[email] Gmail SMTP credentials are missing."
  );
}

const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true").toLowerCase() === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

async function sendMailWithRetry(
  mailOptions,
  traceId,
  maxAttempts = 3
) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await emailTransporter.sendMail(mailOptions);

      console.log(`[email:${traceId}] Sent successfully`, {
        messageId: result.messageId,
        acceptedCount: result.accepted?.length || 0,
        rejectedCount: result.rejected?.length || 0,
      });

      return result;
    } catch (error) {
      lastError = error;

      console.error(`[email:${traceId}] Attempt ${attempt} failed`, {
        code: error.code,
        responseCode: error.responseCode,
        message: error.message,
      });

      if (attempt < maxAttempts) {
        await new Promise((resolve) =>
          setTimeout(resolve, attempt * 2000)
        );
      }
    }
  }

  throw lastError;
}

function getMappedInfo(order) {
  const modelName = order.productType ? order.productType : null;

  // Finds the mapping object for this product type.
  const modelMapping = mappings[`${modelName}_Mapping`];

  /**
   * Maps normal top-level configuration values.
   */
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

  /**
   * Maps nested template/monitor data values.
   */
  function mapTemplateValues(field, selectedValue) {
    if (!modelMapping || !modelMapping.monitorData[field])
      return selectedValue;
    return modelMapping.monitorData[field][selectedValue.toString()];
  }

  let mappedInfo = order.productConfigurationInfo;

  // Map top-level fields and remove empty/unselected values.
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

    // Remove MongoDB internal ID from email output.
    delete mappedInfo._id;
  }

  // Handle monitorData/templateA fields.
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

      // Remove MongoDB internal ID from email output.
      delete mappedInfo.templateBData._id;
    }
  }

  // Handle templateCData fields.
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

    // Remove MongoDB internal ID from email output.
    delete mappedInfo.templateCData._id;
  }

  // Handle templateDData fields.
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

    // Remove MongoDB internal ID from email output.
    delete mappedInfo.templateDData._id;
  }

  // Handle templateEData fields.
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

    // Remove MongoDB internal ID from email output.
    delete mappedInfo.templateEData._id;
  }

  // Handle templateFData fields.
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

    // Remove MongoDB internal ID from email output.
    delete mappedInfo.templateFData._id;
  }

  // Return the cleaned and readable product configuration.
  return mappedInfo;
}



router.post('/send-email', authenticate, async (req, res) => {
  try {
    // Get the latest configuration saved by the user.
    const configuration = req.user.configurations[req.user.configurations.length - 1];

    // Get the logged-in user's email address.
    const email = req.user["email"];

    // Validate that the user has an email.
    if (!email) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Start building the email body with user contact information.
    let emailContent =
      `Contact Information:\n\tName: ${req.user["firstName"]} ${req.user["lastName"]}\n\tPhone: ${req.user["phoneNumber"]}\n\tCompany: ${req.user["companyName"]}\n\tCountry: ${req.user["country"]}`;

    // Add each product/order from the user's cart into the email body.
    configuration.cart.forEach((order) => {
      emailContent +=
        `\n\n\n#################################################\n${order.productType}\n\nRequested number of this item: ${order.numRequested}\n`;

      // Convert internal configuration values into readable mapped values.
      order = getMappedInfo(order);

      // Add each configuration field to the email body.
      Object.entries(order).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Format nested objects nicely.
          emailContent += `\n${key}:\n${JSON.stringify(value, null, 2)}\n`;
        } else {
          // Format simple key-value fields.
          emailContent += `\n${key}:\t${value}\n`;
        }
      });
    });

    // Email options for sending the product configuration.
    const mailOptions = {
      from: emailFrom,
      replyTo: email,
      to: "mightylubeemailtest@gmail.com",
      subject: configuration.configurationName,
      text: emailContent,
    };

    // Send the email.
    await sendMailWithRetry(mailOptions, createTraceId());

    // Return success response.
    res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    // Log and return email sending errors.
    console.error('Email error:', error.message);
    res.status(500).json({ error: error.message });
  }
});



/**
 * -------------------------------------------------------------------------
 * POST /forgot
 * -------------------------------------------------------------------------
 * Purpose:
 * Step 1 of the Forgot Password process.
 *
 * Flow:
 * 1. Receive user's email.
 * 2. Validate the email.
 * 3. Search for the user in the database.
 * 4. If user exists, frontend can ask for the saved security pin.
 *
 * Old unused flow kept in comments below:
 * - Generate a 6-digit reset code.
 * - Save the reset code in MongoDB.
 * - Send the reset code to the user's email.
 * -------------------------------------------------------------------------
 */
router.post('/forgot', async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();

  try {
    // Log incoming request details.
    logForgot(traceId, "POST started", {
      hasBody: Boolean(req.body),
      hasEmail: Boolean(req.body?.email),
      contentType: req.headers["content-type"],
      userAgent: req.headers["user-agent"],
    });

    // Get email from request body.
    const { email } = req.body;

    // Validate email.
    if (!email) {
      logForgot(traceId, "POST failed validation: missing email");
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Look up user by email.
    const userLookupStartedAt = Date.now();
    logForgot(traceId, "POST looking up user", { email: maskEmail(email) });

    const user = await User.findOne({ email });

    logElapsed(traceId, "POST user lookup finished", userLookupStartedAt);

    // Stop if user does not exist.
    if (!user) {
      logForgot(traceId, "POST user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }

    // Log found user details.
    logForgot(traceId, "POST user found", {
      userID: user.userID,
      mongooseId: String(user._id),
      hasExistingResetCode: Boolean(user.resetCode),
      hasSecurityPin: Boolean(user.securityPin),
    });

    /*
     * OLD UNUSED EMAIL-CODE FLOW:
     *
     * const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
     * user.resetCode = resetCode;
     * await user.save();
     *
     * const mailOptions = {
     *   from: emailFrom,
     *   to: email,
     *   subject: "Mighty Lube Password Reset",
     *   text: `Your one-time passcode is ${user.resetCode}`,
     * };
     *
     * await sendMailWithRetry(mailOptions, traceId);
     */

    logElapsed(traceId, "POST completed", requestStartedAt);

    return res.status(200).json({
      message: 'User found. Please verify security pin.',
      canVerifyPin: true,
    });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] POST failed`, getErrorDetails(error));
    logElapsed(traceId, "POST failed elapsed", requestStartedAt);
    return res.status(500).json({ error: error.message, traceId });
  }
});

/*
 * OLD UNUSED PASSCODE VALIDATION ROUTE:
 *
 * This route was used when forgot password emailed a one-time passcode.
 * The new flow uses the user's saved securityPin instead.
 *
router.get("/forgot", async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();

  try {
    // Log request details.
    logForgot(traceId, "GET started", {
      hasEmail: Boolean(req.headers.email),
      hasPasscode: Boolean(req.headers.passcode),
      contentType: req.headers["content-type"],
    });

    // Get email and passcode from headers.
    const { email, passcode } = req.headers;

    // Validate required values.
    if (!email || !passcode) {
      logForgot(traceId, "GET failed validation: missing email or passcode");
      return res.status(400).json({ error: 'Empty email or passcode' });
    }

    // Look up user by email.
    const userLookupStartedAt = Date.now();

    logForgot(traceId, "GET looking up user", {
      email: maskEmail(email),
    });

    const user = await User.findOne({ email });

    logElapsed(traceId, "GET user lookup finished", userLookupStartedAt);

    // Stop if user does not exist.
    if (!user) {
      logForgot(traceId, "GET user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }

    // Log user reset-code status.
    logForgot(traceId, "GET user found", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
      passcodeLength: String(passcode).length,
      resetCodeLength: user.resetCode ? String(user.resetCode).length : 0,
    });

    // Compare submitted passcode with stored reset code.
    if (passcode == user.resetCode) {
      // Clear reset code after successful validation.
      user.resetCode = null;

      logForgot(traceId, "GET passcode valid, clearing reset code", {
        userID: user.userID,
      });

      const saveStartedAt = Date.now();

      await user.save();

      logElapsed(traceId, "GET reset code clear save finished", saveStartedAt);

      logForgot(traceId, "GET reset code cleared", {
        userID: user.userID,
      });

      logElapsed(traceId, "GET completed", requestStartedAt);

      return res.status(200).json({ message: "Validated passcode!" });
    }

    // Passcode did not match.
    logForgot(traceId, "GET invalid passcode", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
    });

    logElapsed(traceId, "GET completed with invalid passcode", requestStartedAt);

    return res.status(401).json({ error: "Invalid passcode!" });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] GET failed`, getErrorDetails(error));
    logElapsed(traceId, "GET failed elapsed", requestStartedAt);
    return res.status(500).json({ error: error.message, traceId });
  }
});
*/

/**
 * Backward-compatible PIN verification route.
 *
 * Some frontend code still calls:
 * GET /api/email/forgot?email=...&securityPin=...
 *
 * The preferred new route is:
 * POST /api/email/forgot/verify-pin
 */
router.get("/forgot", async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();

  try {
    const email = req.query.email || req.headers.email;
    const securityPin = req.query.securityPin || req.query.securitypin || req.headers.securitypin;

    logForgot(traceId, "GET PIN verify started", {
      hasEmail: Boolean(email),
      hasSecurityPin: Boolean(securityPin),
      queryKeys: Object.keys(req.query || {}),
    });

    if (!email || !securityPin) {
      logForgot(traceId, "GET PIN verify failed validation: missing email or security pin");
      return res.status(400).json({ error: 'Empty email or security pin' });
    }

    const userLookupStartedAt = Date.now();
    logForgot(traceId, "GET PIN verify looking up user", { email: maskEmail(email) });
    const user = await User.findOne({ email });
    logElapsed(traceId, "GET PIN verify user lookup finished", userLookupStartedAt);

    if (!user) {
      logForgot(traceId, "GET PIN verify user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }

    logForgot(traceId, "GET PIN verify user found", {
      userID: user.userID,
      hasSecurityPin: Boolean(user.securityPin),
      submittedPinLength: String(securityPin).length,
      savedPinLength: user.securityPin ? String(user.securityPin).length : 0,
    });

    
const submittedPin = String(securityPin ?? "").trim();
const savedPin = String(user.securityPin ?? "").trim();

if (!savedPin || !submittedPin || submittedPin !== savedPin) {

      logForgot(traceId, "GET PIN verify invalid security pin", { userID: user.userID });
      return res.status(400).json({ error: "Invalid security pin!" });
    }

   
const resetToken = otpCrypto.randomBytes(32).toString("hex");

const resetTokenHash = otpCrypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

const resetTokenExpiresAt = new Date(
  Date.now() + 10 * 60 * 1000
);

await User.updateOne(
  { _id: user._id },
  {
    $set: {
      passwordResetPinTokenHash: resetTokenHash,
      passwordResetPinTokenExpiresAt: resetTokenExpiresAt,
    },
    $unset: {
      resetCode: "",
    },
  }
);

logElapsed(traceId, "PIN verify completed", requestStartedAt);

return res.status(200).json({
  message: "Security pin verified!",
  resetToken,
  expiresIn: 600,
});

  } catch (error) {
    console.error(`[forgot-password:${traceId}] GET PIN verify failed`, getErrorDetails(error));
    logElapsed(traceId, "GET PIN verify failed elapsed", requestStartedAt);
    return res.status(500).json({ error: error.message, traceId });
  }
});

/**
 * -------------------------------------------------------------------------
 * POST /forgot/verify-pin
 * -------------------------------------------------------------------------
 * Purpose:
 * Step 2 of the Forgot Password process.
 *
 * Flow:
 * 1. Receive email and securityPin.
 * 2. Validate both values.
 * 3. Search for the user in the database.
 * 4. Compare submitted pin with saved securityPin.
 * -------------------------------------------------------------------------
 */
router.post("/forgot/verify-pin", async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();

  try {
    const email = req.body.email || req.headers.email;
    const securityPin = req.body.securityPin || req.headers.securitypin;

    logForgot(traceId, "PIN verify started", {
      hasEmail: Boolean(email),
      hasSecurityPin: Boolean(securityPin),
      contentType: req.headers["content-type"],
    });

    if (!email || !securityPin) {
      logForgot(traceId, "PIN verify failed validation: missing email or security pin");
      return res.status(400).json({ error: 'Empty email or security pin' });
    }

    const userLookupStartedAt = Date.now();
    logForgot(traceId, "PIN verify looking up user", { email: maskEmail(email) });
    const user = await User.findOne({ email });
    logElapsed(traceId, "PIN verify user lookup finished", userLookupStartedAt);

    if (!user) {
      logForgot(traceId, "PIN verify user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }

    logForgot(traceId, "PIN verify user found", {
      userID: user.userID,
      hasSecurityPin: Boolean(user.securityPin),
      submittedPinLength: String(securityPin).length,
      savedPinLength: user.securityPin ? String(user.securityPin).length : 0,
    });

    
const submittedPin = String(securityPin ?? "").trim();
const savedPin = String(user.securityPin ?? "").trim();

if (!savedPin || !submittedPin || submittedPin !== savedPin) {

      logForgot(traceId, "PIN verify invalid security pin", { userID: user.userID });
      return res.status(400).json({ error: "Invalid security pin!" });
    }

    user.resetCode = SECURITY_PIN_VERIFIED_MARKER;
    await user.save();

    logElapsed(traceId, "PIN verify completed", requestStartedAt);
    return res.status(200).json({ message: "Security pin verified!" });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] PIN verify failed`, getErrorDetails(error));
    logElapsed(traceId, "PIN verify failed elapsed", requestStartedAt);
    return res.status(500).json({ error: error.message, traceId });
  }
});

/**
 * -------------------------------------------------------------------------
 * PUT /forgot
 * -------------------------------------------------------------------------
 * Purpose:
 * Step 3 of the Forgot Password process.
 *
 * Flow:
 * 1. Receive email and new password.
 * 2. Validate required values.
 * 3. Search for the user in the database.
 * 4. Confirm the security pin was already verified.
 * 5. Make sure new password is different from old password.
 * 6. Hash the new password.
 * 7. Save updated password.
 * -------------------------------------------------------------------------
 */
router.put("/forgot", async (req, res) => {
  const traceId = createTraceId();
  const requestStartedAt = Date.now();

  try {
    // Log request details.
    logForgot(traceId, "PUT started", {
      hasBodyEmail: Boolean(req.body?.email),
      hasHeaderEmail: Boolean(req.headers.email),
      hasQueryEmail: Boolean(req.query?.email),
      hasBodySecurityPin: Boolean(req.body?.securityPin),
      hasHeaderSecurityPin: Boolean(req.headers.securitypin),
      hasBodyPassword: Boolean(req.body?.password),
      hasHeaderPassword: Boolean(req.headers.password),
      hasQueryPassword: Boolean(req.query?.password),
      contentType: req.headers["content-type"],
    });

    // The final screen only asks the user for password, but the frontend must
    // still send email as hidden state so the backend knows which account to update.
    const email = req.body.email || req.headers.email || req.query.email;
    const password = req.body.password || req.headers.password || req.query.password;

    if (!email) {
      logForgot(traceId, "PUT failed validation: missing email");
      return res.status(400).json({
        error: "Email is required to update password.",
        code: "MISSING_EMAIL",
      });
    }

    if (!password) {
      logForgot(traceId, "PUT failed validation: missing password");
      return res.status(400).json({
        error: "New password is required.",
        code: "MISSING_PASSWORD",
      });
    }

    // Look up user by email.
    const userLookupStartedAt = Date.now();

    logForgot(traceId, "PUT looking up user", {
      email: maskEmail(email),
      passwordLength: String(password).length,
    });

    const user = await User.findOne({ email });

    logElapsed(traceId, "PUT user lookup finished", userLookupStartedAt);

    // Stop if user does not exist.
    if (!user) {
      logForgot(traceId, "PUT user not found", { email: maskEmail(email) });
      return res.status(404).json({ error: 'No user found with that email!' });
    }

    // Log found user details.
    logForgot(traceId, "PUT user found", {
      userID: user.userID,
      hasResetCode: Boolean(user.resetCode),
      hasSecurityPin: Boolean(user.securityPin),
    });

    if (user.resetCode !== SECURITY_PIN_VERIFIED_MARKER) {
      logForgot(traceId, "PUT rejected because security pin was not verified", { userID: user.userID });
      return res.status(403).json({
        error: "Security pin must be verified before changing password.",
        code: "SECURITY_PIN_NOT_VERIFIED",
      });
    }

    logForgot(traceId, "PUT security pin verification marker found", { userID: user.userID });

    // Check if new password is same as old password.
    const compareStartedAt = Date.now();

    logForgot(traceId, "PUT checking if password changed", {
      userID: user.userID,
    });

    if (await comparePassword(password, user.password)) {
      logElapsed(traceId, "PUT password comparison finished", compareStartedAt);

      logForgot(traceId, "PUT rejected same password", {
        userID: user.userID,
      });

      return res.status(400).json({
        error: "Password must be different than previous password!",
      });
    }

    logElapsed(traceId, "PUT password comparison finished", compareStartedAt);

    // Hash new password before saving.
    const hashStartedAt = Date.now();

    logForgot(traceId, "PUT hashing new password", {
      userID: user.userID,
    });

    let passwordHash = await hashPassword(password);

    logElapsed(traceId, "PUT password hash finished", hashStartedAt);

    // Save new password and clear reset code.
    user.password = passwordHash;
    user.resetCode = null;

    logForgot(traceId, "PUT saving new password", {
      userID: user.userID,
    });

    const saveStartedAt = Date.now();

    await user.save();

    logElapsed(traceId, "PUT password save finished", saveStartedAt);

    logForgot(traceId, "PUT password changed successfully", {
      userID: user.userID,
    });

    logElapsed(traceId, "PUT completed", requestStartedAt);

    return res.status(200).json({
      message: "Successfully changed password!",
    });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] PUT failed`, getErrorDetails(error));
    logElapsed(traceId, "PUT failed elapsed", requestStartedAt);
    return res.status(500).json({ error: error.message, traceId });
  }
});



/**
 * ============================================================
 * EMAIL OTP PASSWORD RECOVERY
 * ============================================================
 *
 * New flow:
 * 1. Request OTP
 * 2. Verify OTP
 * 3. Reset password
 *
 * Existing Security PIN routes remain unchanged.
 *
 * Requires:
 * - passwordResetOtp fields in models/user.js
 * - OTP_HASH_SECRET in environment variables
 * - Existing Resend email configuration
 * ============================================================
 */

const otpCrypto = require("crypto");

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

const OTP_IP_WINDOW_MS = 15 * 60 * 1000;
const OTP_IP_MAX_REQUESTS = 10;

const otpIpRequests = new Map();

function normalizedOtpEmail(value) {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return null;
  }

  return email;
}

async function otpHash(email, code) {
  return hashPassword(`${email}:${code}`);
}

async function otpMatches(email, code, storedHash) {
  if (!storedHash) return false;

  return comparePassword(
    `${email}:${code}`,
    storedHash
  );
}

function otpConfigReady(res) {
  if (
    !process.env.SMTP_USER ||
    !process.env.SMTP_APP_PASSWORD
  ) {
    console.error("[email-otp] Gmail SMTP not configured");

    res.status(503).json({
      error: "Password recovery is temporarily unavailable.",
    });

    return false;
  }

  return true;
}



function otpIpAllowed(req) {
  const now = Date.now();

  const ip =
    req.ip ||
    req.socket.remoteAddress ||
    "unknown";

  if (otpIpRequests.size > 5000) {
    for (const [key, value] of otpIpRequests) {
      if (value.until <= now) {
        otpIpRequests.delete(key);
      }
    }
  }

  const record = otpIpRequests.get(ip);

  if (!record || record.until <= now) {
    otpIpRequests.set(ip, {
      count: 1,
      until: now + OTP_IP_WINDOW_MS,
    });

    return true;
  }

  record.count += 1;

  return record.count <= OTP_IP_MAX_REQUESTS;
}

function otpRequestAllowed(req, res) {
  if (!otpIpAllowed(req)) {
    res.status(429).json({
      error: "Too many requests. Please try again later.",
    });

    return false;
  }

  return true;
}

const OTP_REQUEST_RESPONSE = {
  message:
    "If an account exists for this email, a verification code will be sent.",
};

/**
 * POST /api/email/forgot/request-otp
 */
router.post("/forgot/request-otp", async (req, res) => {
  try {
    if (
      !otpConfigReady(res) ||
      !otpRequestAllowed(req, res)
    ) {
      return;
    }

    const email = normalizedOtpEmail(req.body?.email);

    if (!email) {
      return res.status(400).json({
        error: "Valid email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json(
        OTP_REQUEST_RESPONSE
      );
    }

    const now = new Date();

    const code = otpCrypto
      .randomInt(0, 1000000)
      .toString()
      .padStart(6, "0");

const codeHash = await otpHash(email, code);

    const claimed = await User.findOneAndUpdate(
      {
        _id: user._id,
        $or: [
          {
            "passwordResetOtp.lastSentAt": {
              $exists: false,
            },
          },
          {
            "passwordResetOtp.lastSentAt": null,
          },
          {
            "passwordResetOtp.lastSentAt": {
              $lte: new Date(
                now.getTime() -
                  OTP_RESEND_COOLDOWN_MS
              ),
            },
          },
        ],
      },
      {
        $set: {
          "passwordResetOtp.codeHash": codeHash,
          "passwordResetOtp.expiresAt": new Date(
            now.getTime() + OTP_EXPIRY_MS
          ),
          "passwordResetOtp.attempts": 0,
          "passwordResetOtp.lastSentAt": now,
        },
      },
      { new: true }
    );

    if (!claimed) {
      return res.status(200).json(
        OTP_REQUEST_RESPONSE
      );
    }


   
try {
  const traceId = createTraceId();

  const mailOptions = {
    from: emailFrom,
    to: email,
    subject: "Mighty Lube password reset code",
    text:
      `Your password reset code is ${code}. ` +
      "It expires in 10 minutes. " +
      "If you did not request this, ignore this email.",
  };

  await sendMailWithRetry(mailOptions, traceId);

  console.log("[email-otp] OTP email accepted by SMTP", {
    traceId,
    email: maskEmail(email),
  });

} catch (sendError) {

      await User.updateOne(
        {
          _id: user._id,
          "passwordResetOtp.codeHash": codeHash,
        },
        {
          $set: {
            "passwordResetOtp.codeHash": null,
            "passwordResetOtp.expiresAt": null,
            "passwordResetOtp.attempts": 0,
            "passwordResetOtp.lastSentAt": null,
          },
        }
      );

      console.error(
        "[email-otp] Delivery failed:",
        sendError.message
      );
    }

    return res.status(200).json(
      OTP_REQUEST_RESPONSE
    );
  } catch (error) {
    console.error(
      "[email-otp] Request failed:",
      error.message
    );

    return res.status(500).json({
      error: "Unable to process password recovery.",
    });
  }
});

/**
 * POST /api/email/forgot/verify-otp
 */
router.post("/forgot/verify-otp", async (req, res) => {
  try {
    if (
      !otpConfigReady(res) ||
      !otpRequestAllowed(req, res)
    ) {
      return;
    }

    const email = normalizedOtpEmail(req.body?.email);
    const code = req.body?.otp;

    if (
      !email ||
      typeof code !== "string" ||
      !/^\d{6}$/.test(code)
    ) {
      return res.status(400).json({
        error:
          "Valid email and 6-digit OTP are required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid or expired OTP.",
      });
    }

    const otp = user.passwordResetOtp;

    if (
      !otp?.codeHash ||
      !otp.expiresAt ||
      otp.expiresAt <= new Date() ||
      otp.attempts >= OTP_MAX_ATTEMPTS
    ) {
      return res.status(400).json({
        error: "Invalid or expired OTP.",
      });
    }

if (!(await otpMatches(email, code, otp.codeHash))) {
        await User.updateOne(
        {
          _id: user._id,
          "passwordResetOtp.codeHash": otp.codeHash,
          "passwordResetOtp.attempts": {
            $lt: OTP_MAX_ATTEMPTS,
          },
        },
        {
          $inc: {
            "passwordResetOtp.attempts": 1,
          },
        }
      );

      return res.status(400).json({
        error: "Invalid or expired OTP.",
      });
    }

    return res.status(200).json({
      message:
        "OTP verified. You can now reset your password.",
    });
  } catch (error) {
    console.error(
      "[email-otp] Verification failed:",
      error.message
    );

    return res.status(500).json({
      error: "Unable to verify OTP.",
    });
  }
});

/**
 * POST /api/email/forgot/reset-password
 */
router.post(
  "/forgot/reset-password",
  async (req, res) => {
    try {
      if (
        !otpConfigReady(res) ||
        !otpRequestAllowed(req, res)
      ) {
        return;
      }

      const email = normalizedOtpEmail(
        req.body?.email
      );

      const code = req.body?.otp;
      const password = req.body?.password;

      if (
        !email ||
        typeof code !== "string" ||
        !/^\d{6}$/.test(code)
      ) {
        return res.status(400).json({
          error:
            "Valid email and 6-digit OTP are required.",
        });
      }

      if (
        typeof password !== "string" ||
        password.length < 8 ||
        password.length > 50
      ) {
        return res.status(400).json({
          error:
            "Password must be between 8 and 50 characters.",
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

      const otp = user.passwordResetOtp;

      if (
        !otp?.codeHash ||
        !otp.expiresAt ||
        otp.expiresAt <= new Date() ||
        otp.attempts >= OTP_MAX_ATTEMPTS
      ) {
        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

if (!(await otpMatches(email, code, otp.codeHash))) { 
         await User.updateOne(
          {
            _id: user._id,
            "passwordResetOtp.codeHash":
              otp.codeHash,
            "passwordResetOtp.attempts": {
              $lt: OTP_MAX_ATTEMPTS,
            },
          },
          {
            $inc: {
              "passwordResetOtp.attempts": 1,
            },
          }
        );

        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

      if (
        await comparePassword(
          password,
          user.password
        )
      ) {
        return res.status(400).json({
          error:
            "New password must be different from the old password.",
        });
      }

      const newHash = await hashPassword(password);

      const updated = await User.findOneAndUpdate(
  {
    _id: user._id,
    "passwordResetOtp.codeHash": otp.codeHash,
    "passwordResetOtp.expiresAt": {
      $gt: new Date(),
    },
          "passwordResetOtp.attempts": {
            $lt: OTP_MAX_ATTEMPTS,
          },
        },
        {
          $set: {
            password: newHash,
            sessions: [],
            rememberTokens: [],
            "passwordResetOtp.codeHash": null,
            "passwordResetOtp.expiresAt": null,
            "passwordResetOtp.attempts": 0,
            "passwordResetOtp.lastSentAt": null,
            resetCode: null,
          },
        },
        { new: false }
      );

      if (!updated) {
        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

      return res.status(200).json({
        message:
          "Password reset successfully. Please log in again.",
      });
    } catch (error) {
      console.error(
        "[email-otp] Password reset failed:",
        error.message
      );

      return res.status(500).json({
        error: "Unable to reset password.",
      });
    }
  }
);


// ============================================================
// FORGOT USERNAME
//
// POST /api/email/forgot-username
//
// Sends the existing username to the registered email.
// No OTP or username change is required.
// ============================================================

const USERNAME_RECOVERY_RESPONSE = {
  message:
    "If an account exists with this email address, " +
    "your username will be sent to your inbox.",
};

const USERNAME_RECOVERY_COOLDOWN_MS = 60 * 1000;
const usernameRecoveryRequests = new Map();

router.post("/forgot-username", async (req, res) => {
  const traceId = createTraceId();

  try {
    // Check SMTP configuration.
    if (!process.env.SMTP_USER || !process.env.SMTP_APP_PASSWORD) {
      console.error(
        `[forgot-username:${traceId}] SMTP is not configured`
      );

      return res.status(503).json({
        error: "Username recovery is temporarily unavailable.",
      });
    }

    // Reuse existing IP-based request limiting.
    if (!otpRequestAllowed(req, res)) {
      return;
    }

    // Validate and normalize email.
    const email = normalizedOtpEmail(req.body?.email);

    if (!email) {
      return res.status(400).json({
        error: "Valid email is required.",
      });
    }

    // Look up the registered account.
    const user = await User.findOne({ email });

    // Always return the same confirmation for unknown accounts.
    if (!user) {
      return res.status(200).json(
        USERNAME_RECOVERY_RESPONSE
      );
    }

    const username = user.username;

    if (typeof username !== "string" || !username.trim()) {
      console.error(
        `[forgot-username:${traceId}] Account has no username`
      );

      return res.status(200).json(
        USERNAME_RECOVERY_RESPONSE
      );
    }

    // Limit repeat emails to the same registered account.
    const now = Date.now();
    const accountKey = String(user._id);
    const lastSentAt = usernameRecoveryRequests.get(accountKey);

    if (
      lastSentAt &&
      now - lastSentAt < USERNAME_RECOVERY_COOLDOWN_MS
    ) {
      return res.status(200).json(
        USERNAME_RECOVERY_RESPONSE
      );
    }

    // Remove expired cooldown records periodically.
    if (usernameRecoveryRequests.size > 5000) {
      for (const [key, timestamp] of usernameRecoveryRequests) {
        if (now - timestamp >= USERNAME_RECOVERY_COOLDOWN_MS) {
          usernameRecoveryRequests.delete(key);
        }
      }
    }

    usernameRecoveryRequests.set(accountKey, now);

    const mailOptions = {
      from: emailFrom,
      to: user.email || email,
      subject: "Mighty Lube - Username Recovery",
      text:
        "Hello,\n\n" +
        "We received a request to recover your Mighty Lube username.\n\n" +
        `Your username is: ${username.trim()}\n\n` +
        "You can use this username to log in to your account.\n\n" +
        "If you did not request this email, you can safely ignore it.\n\n" +
        "Regards,\n" +
        "Mighty Lube Team",
    };

    try {
      await sendMailWithRetry(mailOptions, traceId);

      console.log(
        `[forgot-username:${traceId}] Recovery email accepted`,
        {
          email: maskEmail(email),
        }
      );
    } catch (mailError) {
      // Allow another attempt if delivery fails.
      usernameRecoveryRequests.delete(accountKey);

      console.error(
        `[forgot-username:${traceId}] Email delivery failed`,
        mailError.message
      );
    }

    return res.status(200).json(
      USERNAME_RECOVERY_RESPONSE
    );

  } catch (error) {
    console.error(
      `[forgot-username:${traceId}] Request failed`,
      error.message
    );

    return res.status(500).json({
      error: "Unable to process username recovery.",
    });
  }
});


// ============================================================
// OPTIONAL EMAIL VERIFICATION
// Registration + Settings Verify Email + Change Email
// ============================================================

const emailVerifyChallenges = () =>
  User.db.collection("email_verify_challenges");

const emailVerifyGrants = () =>
  User.db.collection("email_verify_grants");

const EMAIL_VERIFY_EXPIRY_MS = 5 * 60 * 1000;
const EMAIL_VERIFY_GRANT_MS = 10 * 60 * 1000;

let emailVerifyIndexesPromise = null;

async function ensureEmailVerifyIndexes() {
  if (!emailVerifyIndexesPromise) {
    emailVerifyIndexesPromise = (async () => {
      await emailVerifyChallenges().createIndex(
        { expiresAt: 1 },
        { expireAfterSeconds: 0 }
      );

      await emailVerifyChallenges().createIndex(
        { key: 1 },
        { unique: true }
      );

      await emailVerifyGrants().createIndex(
        { expiresAt: 1 },
        { expireAfterSeconds: 0 }
      );

      await emailVerifyGrants().createIndex(
        { tokenHash: 1 },
        { unique: true }
      );
    })().catch((error) => {
      emailVerifyIndexesPromise = null;
      throw error;
    });
  }

  return emailVerifyIndexesPromise;
}

function verificationKey(purpose, email, userId) {
  return `${purpose}:${userId || "registration"}:${email}`;
}

function verificationUserId(req) {
  return req.user?._id ? String(req.user._id) : null;
}

function validVerificationRequest(req, res) {
  const purpose = req.body?.purpose;
  const email = normalizedOtpEmail(req.body?.email);

  if (
    !["registration", "verify-email", "change-email"].includes(purpose) ||
    !email
  ) {
    res.status(400).json({
      error: "Valid email and verification purpose are required.",
    });
    return null;
  }

  const userId = verificationUserId(req);

  if (purpose !== "registration" && !userId) {
    res.status(401).json({
      error: "Please log in to continue.",
    });
    return null;
  }

  if (
    purpose === "verify-email" &&
    normalizedOtpEmail(req.user?.email) !== email
  ) {
    res.status(400).json({
      error: "Please verify your current account email.",
    });
    return null;
  }

  if (
    purpose === "change-email" &&
    normalizedOtpEmail(req.user?.email) === email
  ) {
    res.status(400).json({
      error: "Please enter a different email address.",
    });
    return null;
  }

  return {
    purpose,
    email,
    userId,
    key: verificationKey(purpose, email, userId),
  };
}

function optionalVerificationAuth(req, res, next) {
  if (req.body?.purpose === "registration") {
    return next();
  }

  return authenticate(req, res, next);
}

// ------------------------------------------------------------
// POST /api/email/verification/request-otp
// ------------------------------------------------------------

router.post(
  "/verification/request-otp",
  optionalVerificationAuth,
  async (req, res) => {
    try {
      if (!otpConfigReady(res) || !otpRequestAllowed(req, res)) {
        return;
      }

      const data = validVerificationRequest(req, res);
      if (!data) return;

      await ensureEmailVerifyIndexes();

      if (data.purpose !== "verify-email") {
        const existing = await User.findOne({
          email: data.email,
        }).select("_id");

        if (existing) {
          return res.status(409).json({
            error: "This email is already registered.",
          });
        }
      } else if (req.user?.emailVerified === true) {
        return res.status(200).json({
          message: "Email is already verified.",
        });
      }

      const collection = emailVerifyChallenges();
      const now = new Date();

      const code = otpCrypto
        .randomInt(0, 1000000)
        .toString()
        .padStart(6, "0");

      const codeHash = await otpHash(data.email, code);

      // Atomically enforce the resend cooldown.
      // Only one concurrent request can claim the OTP slot.
      const cooldownCutoff = new Date(
        now.getTime() - OTP_RESEND_COOLDOWN_MS
      );

      const previous = await collection.findOne({
        key: data.key,
      });

      if (
        previous?.lastSentAt &&
        new Date(previous.lastSentAt) > cooldownCutoff
      ) {
        return res.status(429).json({
          error:
            "Please wait 60 seconds before requesting another OTP.",
        });
      }

      const challenge = {
        ...data,
        codeHash,
        attempts: 0,
        lastSentAt: now,
        expiresAt: new Date(
          now.getTime() + EMAIL_VERIFY_EXPIRY_MS
        ),
      };

      let claimed = false;

      if (previous) {
        const result = await collection.updateOne(
          {
            key: data.key,
            $or: [
              { lastSentAt: { $lte: cooldownCutoff } },
              { lastSentAt: null },
              { lastSentAt: { $exists: false } },
            ],
          },
          { $set: challenge }
        );

        claimed = result.modifiedCount === 1;
      } else {
        try {
          await collection.insertOne(challenge);
          claimed = true;
        } catch (error) {
          if (error.code !== 11000) {
            throw error;
          }
          // Another request inserted the same key first.
        }
      }

      if (!claimed) {
        return res.status(429).json({
          error:
            "Please wait 60 seconds before requesting another OTP.",
        });
      }

      try {
        await sendMailWithRetry(
          {
            from: emailFrom,
            to: data.email,
            subject: "Mighty Lube - Verify Your Email",
            text:
              `Your Mighty Lube email verification code is ${code}. ` +
              "It expires in 5 minutes. " +
              "If you did not request this, ignore this email.",
          },
          createTraceId()
        );
      } catch (error) {
        // Clear only the challenge created by this request.
        // Do not delete a newer challenge.
        await collection.deleteOne({
          key: data.key,
          codeHash,
        });

        console.error(
          "[email-verification] Delivery failed:",
          error.message
        );

        return res.status(503).json({
          error:
            "Unable to send verification email. Please try again.",
        });
      }

      return res.status(200).json({
        message: "Verification OTP sent successfully.",
      });
    } catch (error) {
      console.error(
        "[email-verification] Request failed:",
        error.message
      );

      return res.status(500).json({
        error: "Unable to request email verification.",
      });
    }
  }
);

// ------------------------------------------------------------
// POST /api/email/verification/verify-otp
// ------------------------------------------------------------

router.post(
  "/verification/verify-otp",
  optionalVerificationAuth,
  async (req, res) => {
    try {
      if (!otpRequestAllowed(req, res)) return;

      const data = validVerificationRequest(req, res);
      if (!data) return;

      const code = req.body?.otp;

      if (
        typeof code !== "string" ||
        !/^\d{6}$/.test(code)
      ) {
        return res.status(400).json({
          error: "Enter a valid 6-digit OTP.",
        });
      }

      await ensureEmailVerifyIndexes();

      const collection = emailVerifyChallenges();

      const challenge = await collection.findOne({
        key: data.key,
      });

      if (
        !challenge?.codeHash ||
        !challenge.expiresAt ||
        new Date(challenge.expiresAt) <= new Date() ||
        challenge.attempts >= OTP_MAX_ATTEMPTS
      ) {
        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

      const matches = await otpMatches(
        data.email,
        code,
        challenge.codeHash
      );

      if (!matches) {
        await collection.updateOne(
          {
            key: data.key,
            codeHash: challenge.codeHash,
            attempts: { $lt: OTP_MAX_ATTEMPTS },
            expiresAt: { $gt: new Date() },
          },
          {
            $inc: { attempts: 1 },
          }
        );

        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

      // Atomically consume the OTP.
      // A successfully claimed OTP cannot be reused.
      const claimed = await collection.findOneAndDelete({
        key: data.key,
        codeHash: challenge.codeHash,
        attempts: { $lt: OTP_MAX_ATTEMPTS },
        expiresAt: { $gt: new Date() },
      });

      if (!claimed) {
        return res.status(400).json({
          error: "Invalid or expired OTP.",
        });
      }

      // Registration:
      // Issue a short-lived verification proof.
      if (data.purpose === "registration") {
        const token = otpCrypto
          .randomBytes(32)
          .toString("hex");

        const tokenHash = otpCrypto
          .createHash("sha256")
          .update(token)
          .digest("hex");

        await emailVerifyGrants().insertOne({
          tokenHash,
          email: data.email,
          purpose: "registration",
          expiresAt: new Date(
            Date.now() + EMAIL_VERIFY_GRANT_MS
          ),
        });

        return res.status(200).json({
          message: "Email verified.",
          verificationToken: token,
        });
      }

      // Settings: Verify current email.
      if (data.purpose === "verify-email") {
        const result = await User.updateOne(
          {
            _id: req.user._id,
            email: data.email,
          },
          {
            $set: {
              emailVerified: true,
            },
          }
        );

        if (result.matchedCount !== 1) {
          return res.status(409).json({
            error:
              "Account email has changed. Please try again.",
          });
        }

        return res.status(200).json({
          message: "Email verified successfully.",
          emailVerified: true,
        });
      }

      // Settings: Change email after verifying new email.
      const existing = await User.findOne({
        email: data.email,
      }).select("_id");

      if (existing) {
        return res.status(409).json({
          error: "This email is already registered.",
        });
      }

      const currentEmail = normalizedOtpEmail(
        req.user.email
      );

      try {
        const result = await User.updateOne(
          {
            _id: req.user._id,
            email: currentEmail,
          },
          {
            $set: {
              email: data.email,
              emailVerified: true,
            },
          }
        );

        if (result.matchedCount !== 1) {
          return res.status(409).json({
            error:
              "Account email has changed. Please try again.",
          });
        }

        return res.status(200).json({
          message:
            "Email changed and verified successfully.",
          emailVerified: true,
        });
      } catch (error) {
        if (error.code === 11000) {
          return res.status(409).json({
            error: "This email is already registered.",
          });
        }

        throw error;
      }
    } catch (error) {
      console.error(
        "[email-verification] Verify failed:",
        error.message
      );

      return res.status(500).json({
        error: "Unable to verify email.",
      });
    }
  }
);


module.exports = router;
