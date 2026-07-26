const express = require("express");
const uuid = require("uuid"); // used for creating session ID
const { hashPassword, authenticate, comparePassword } = require("./sessions");
const User = require("../models/user");

const router = express.Router();


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
			role: user.role
		});
	} catch (error) {
		console.error("Error getting users first name, last name:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/", async (req, res) => {
	try {
		const {
			username,
			password,
			securityPin,
			firstName,
			lastName,
			emailAddress,
			email,
			phoneNumber,
			companyName,
			country
			} = req.body;
			const userEmail = emailAddress || email;

		const requiredFields = {
			username,
			password,
			securityPin,
			firstName,
			lastName,
			email: userEmail,
			phoneNumber,
			companyName,
			country
		};
		const missingFields = Object.entries(requiredFields)
			.filter(([, value]) => value === undefined || value === null || String(value).trim() === "")
			.map(([field]) => field);

			if (missingFields.length > 0) {
				return res.status(400).json({
					error: "Missing required fields",
					missingFields
				});
			}

			const normalized = {
				username: String(username).trim(),
				password: String(password),
				securityPin: String(securityPin).trim(),
				firstName: String(firstName).trim(),
				lastName: String(lastName).trim(),
				email: String(userEmail).trim().toLowerCase(),
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
			if (!/^\d{6}$/.test(normalized.securityPin)) {
				fieldErrors.securityPin = "Security PIN must contain exactly 6 digits";
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
				fieldErrors.email = "Enter a valid email address";
			}

			if (Object.keys(fieldErrors).length > 0) {
				return res.status(400).json({
					error: "Validation failed",
					fieldErrors
				});
			}

			const document = new User({
				username: normalized.username,
				password: await hashPassword(normalized.password),
				// Stored as plain text for the current security-PIN recovery flow.
				securityPin: normalized.securityPin,
				firstName: normalized.firstName,
				lastName: normalized.lastName,
				email: normalized.email,
				phoneNumber: normalized.phoneNumber,
				companyName: normalized.companyName,
				country: normalized.country
			});

			const sessionID = uuid.v4();
			document.sessions.push({ sessionID });
			await document.save();

			return res.status(201).json({
				status: "success",
				sessionID,
				role: document.role
			});
		} catch (e) {
			console.error(e);
			if (e.name === "ValidationError") {
				const fieldErrors = Object.fromEntries(
					Object.entries(e.errors).map(([field, error]) => [field, error.message])
				);
				return res.status(400).json({
					error: "Validation failed",
					fieldErrors
				});
			}
			return res.status(500).json({ error: "Internal server error" });
		}
	});

router.put("/", authenticate, async (req, res) => {
	try {
		// cleanup for testing
		const { firstName, lastName, username, companyName, phoneNumber, email } = req.body;
		const result = await User.updateOne({ "userID": req.user.userID }, {
			$set: {
				firstName,
				lastName,
				username,
				companyName,
				phoneNumber,
				email
			}
		});
		res.status(201).json({ message: `User updated: ${result.modifiedCount}` });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

router.delete("/", authenticate, async (req, res) => {
	try {
		// cleanup for testing
		const { password } = req.body;
		if (!await comparePassword(password, req.user.password)) {
			return res.status(401).json({ error: "Invalid password!" });
		}
		const result = await User.deleteOne({ "userID": req.user.userID });
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
