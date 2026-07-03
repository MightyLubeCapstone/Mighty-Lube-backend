require('dotenv').config();
const express = require('express');
const { Resend } = require("resend");
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
 * Resend sends email through HTTPS, which avoids SMTP connection issues.
 */
const resend = new Resend(process.env.RESEND_API_KEY);
const emailFrom = process.env.EMAIL_FROM;

if (!process.env.RESEND_API_KEY || !emailFrom) {
  throw new Error("RESEND_API_KEY or EMAIL_FROM is missing in environment variables");
}

console.log("[email-config] Resend API config loaded", {
  from: emailFrom,
  hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
  nodeEnv: process.env.NODE_ENV || "development",
});

async function sendMailWithRetry(mailOptions, traceId, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logForgot(traceId, "Email API send attempt started", {
        attempt,
        maxAttempts,
        to: maskEmail(mailOptions.to),
        from: mailOptions.from,
        subject: mailOptions.subject,
      });

      const result = await resend.emails.send({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text,
        reply_to: mailOptions.replyTo,
      });

      logForgot(traceId, "Email API send attempt succeeded", {
        attempt,
        id: result?.data?.id,
      });

      return result;
    } catch (error) {
      lastError = error;

      logForgot(traceId, "Email API send attempt failed", {
        attempt,
        maxAttempts,
        error: getErrorDetails(error),
      });

      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, attempt * 2000));
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
 * 4. Generate a 6-digit reset code.
 * 5. Save the reset code in MongoDB.
 * 6. Verify SMTP connection.
 * 7. Send the reset code to the user's email.
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
    });

    // Generate a random 6-digit one-time reset code.
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store reset code on user document.
    user.resetCode = resetCode;

    // Save reset code to database.
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

    // Prepare reset email.
    const mailOptions = {
      from: emailFrom,
      to: email,
      subject: "Mighty Lube Password Reset",
      text: `Your one-time passcode is ${user.resetCode}`,
    };

    logForgot(traceId, "POST email API config before send", {
      from: mailOptions.from,
      to: maskEmail(email),
      hasResendApiKey: Boolean(process.env.RESEND_API_KEY),
    });

    // Send reset email.
    const sendStartedAt = Date.now();

    logForgot(traceId, "POST sending reset email", {
      to: maskEmail(email),
      from: maskEmail(mailOptions.from),
      subject: mailOptions.subject,
      textLength: mailOptions.text.length,
    });
    
    const sendInfo = await sendMailWithRetry(mailOptions, traceId);

    logElapsed(traceId, "POST sendMail finished", sendStartedAt);

    // Log email result.
    logForgot(traceId, "POST reset email sent", {
      to: maskEmail(email),
      resendId: sendInfo?.data?.id,
    });

    logElapsed(traceId, "POST completed", requestStartedAt);

    return res.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(`[forgot-password:${traceId}] POST failed`, getErrorDetails(error));
    logElapsed(traceId, "POST failed elapsed", requestStartedAt);
    return res.status(500).json({ error: error.message, traceId });
  }
});

/**
 * -------------------------------------------------------------------------
 * GET /forgot
 * -------------------------------------------------------------------------
 * Purpose:
 * Step 2 of the Forgot Password process.
 *
 * Flow:
 * 1. Receive email and passcode from request headers.
 * 2. Validate email and passcode.
 * 3. Search for the user in the database.
 * 4. Compare submitted passcode with saved reset code.
 * 5. Clear reset code if valid.
 * -------------------------------------------------------------------------
 */
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
 * 4. Make sure new password is different from old password.
 * 5. Hash the new password.
 * 6. Save updated password.
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
      hasBodyPassword: Boolean(req.body?.password),
      hasHeaderPassword: Boolean(req.headers.password),
      contentType: req.headers["content-type"],
    });

    // Old frontend sent these in headers.
    // Body support is kept for cleaner API calls.
    const email = req.body.email || req.headers.email;
    const password = req.body.password || req.headers.password;

    // Validate email and password.
    if (!email || !password) {
      logForgot(traceId, "PUT failed validation: missing email or password");
      return res.status(400).json({ error: 'Empty email or password' });
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
    });

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

module.exports = router;
