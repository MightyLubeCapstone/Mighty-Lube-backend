
const express = require("express");
const crypto = require("crypto");
const { hashPassword, authenticate, comparePassword } = require("./sessions");
const User = require("../models/user");

const router = express.Router();

function normalizeEmail(value) {
    if (typeof value !== "string") return "";
    return value.trim().toLowerCase();
}

router.get("/username", async (req, res) => {
    try {
        const { username } = req.headers;
        const user = await User.findOne({ "username": username });
        if (!user) {
            res.status(200).json({ message: "Username available!" });
            return;
        }
        res.status(400).json({ error: "Account with that username already exists!" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/userinfo", authenticate, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        return res.status(200).json({
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            companyName: user.companyName,
            phoneNumber: user.phoneNumber,
            emailAddress: user.email,
            emailVerified: user.emailVerified === true,
            role: user.role
        });
    } catch (error) {
        console.error("Error getting user information:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            username,
            password,
            firstName,
            lastName,
            emailAddress,
            email,
            phoneNumber,
            companyName,
            country,
            verificationToken
        } = req.body || {};

        const userEmail = emailAddress || email;

        const requiredFields = {
            username,
            password,
            firstName,
            lastName,
            email: userEmail,
            phoneNumber,
            companyName,
            country
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([, value]) =>
                value === undefined ||
                value === null ||
                String(value).trim() === ""
            )
            .map(([field]) => field);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields
            });
        }

        const normalized = {
            username: String(username).trim().toLowerCase(),
            password: String(password),
            firstName: String(firstName).trim(),
            lastName: String(lastName).trim(),
            email: normalizeEmail(userEmail),
            phoneNumber: String(phoneNumber).trim(),
            companyName: String(companyName).trim(),
            country: String(country).trim()
        };

        const fieldErrors = {};

        if (normalized.username.length < 6 || normalized.username.length > 24) {
            fieldErrors.username = "Username must be between 6 and 24 characters";
        }

        if (normalized.password.length < 8 || normalized.password.length > 50) {
            fieldErrors.password = "Password must be between 8 and 50 characters";
        }

        if (
            normalized.email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)
        ) {
            fieldErrors.email = "Enter a valid email address";
        }

        if (Object.keys(fieldErrors).length > 0) {
            return res.status(400).json({
                error: "Validation failed",
                fieldErrors
            });
        }

        const hasVerificationToken =
            verificationToken !== undefined &&
            verificationToken !== null &&
            verificationToken !== "";

        let tokenHash = null;

        if (hasVerificationToken) {
            if (
                typeof verificationToken !== "string" ||
                !/^[a-f0-9]{64}$/i.test(verificationToken)
            ) {
                return res.status(400).json({
                    error: "Invalid email verification token."
                });
            }

            tokenHash = crypto
                .createHash("sha256")
                .update(verificationToken)
                .digest("hex");

            const grant = await User.db
                .collection("email_verify_grants")
                .findOne({
                    tokenHash,
                    email: normalized.email,
                    purpose: "registration",
                    expiresAt: { $gt: new Date() }
                });

            if (!grant) {
                return res.status(400).json({
                    error: "Email verification expired or invalid. Please verify again."
                });
            }
        }

        const document = new User({
            username: normalized.username,
            password: await hashPassword(normalized.password),
            securityPin: null,
            firstName: normalized.firstName,
            lastName: normalized.lastName,
            email: normalized.email,
            emailVerified: false,
            phoneNumber: normalized.phoneNumber,
            companyName: normalized.companyName,
            country: normalized.country
        });

       
let emailVerified = false;

if (!tokenHash) {
    // Email verification is optional.
    // No token means the account remains unverified.
    await document.save();
} else {
    const session = await User.startSession();

    try {
        await session.withTransaction(async () => {
            // Atomically consume the registration proof.
            const consumed = await User.db
                .collection("email_verify_grants")
                .findOneAndDelete(
                    {
                        tokenHash,
                        email: normalized.email,
                        purpose: "registration",
                        expiresAt: { $gt: new Date() }
                    },
                    { session }
                );

            const grant = consumed?.value ?? consumed;

            if (!grant?._id) {
                const error = new Error(
                    "Email verification expired or invalid. Please verify again."
                );
                error.statusCode = 400;
                throw error;
            }

            // The token was valid and consumed in this transaction.
            document.emailVerified = true;

            // Save the account in the same transaction.
            await document.save({ session });

            emailVerified = true;
        });
    } finally {
        await session.endSession();
    }
}


        return res.status(201).json({
            status: "success",
            message: "Account created successfully. Please log in.",
            emailVerified,
            role: document.role
        });

    } catch (e) {
        console.error(e);
        
if (e.statusCode === 400) {
    return res.status(400).json({
        error: e.message
    });
}


        if (e.code === 11000) {
            const field = Object.keys(e.keyPattern || {})[0];

            return res.status(409).json({
                error: "Account already exists",
                fieldErrors: field
                    ? { [field]: `This ${field} is already registered` }
                    : {}
            });
        }

        if (e.name === "ValidationError") {
            const fieldErrors = Object.fromEntries(
                Object.entries(e.errors).map(
                    ([field, error]) => [field, error.message]
                )
            );

            return res.status(400).json({
                error: "Validation failed",
                fieldErrors
            });
        }

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.put("/", authenticate, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            username,
            companyName,
            phoneNumber,
            email,
            emailAddress
        } = req.body || {};

        // Email changes must go through:
        // POST /api/email/verification/request-otp
        // POST /api/email/verification/verify-otp
        const requestedEmail = emailAddress ?? email;

        if (
            requestedEmail !== undefined &&
            normalizeEmail(requestedEmail) !== normalizeEmail(req.user.email)
        ) {
            return res.status(400).json({
                error: "Please use email OTP verification to change your email."
            });
        }

        const updates = {};

        if (firstName !== undefined) updates.firstName = firstName;
        if (lastName !== undefined) updates.lastName = lastName;
        if (username !== undefined) updates.username = username;
        if (companyName !== undefined) updates.companyName = companyName;
        if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber;

        if (Object.keys(updates).length === 0) {
            return res.status(200).json({
                message: "No profile changes to update."
            });
        }

        const result = await User.updateOne(
            { userID: req.user.userID },
            { $set: updates }
        );

        return res.status(200).json({
            message: `User updated: ${result.modifiedCount}`
        });
    } catch (error) {
        console.error("Error updating user:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                error: "Username already exists."
            });
        }

        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

router.delete("/", authenticate, async (req, res) => {
    try {
        const { password } = req.body;

        if (!await comparePassword(password, req.user.password)) {
            return res.status(401).json({ error: "Invalid password!" });
        }

        const result = await User.deleteOne({
            "userID": req.user.userID
        });

        if (result.deletedCount === 0) {
            res.status(400).json({ error: "User not found" });
        } else {
            res.status(200).json({ message: "User deleted" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
