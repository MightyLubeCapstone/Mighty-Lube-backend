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
			firstName: user.firstName,
			lastName: user.lastName,
			username: user.username,
			companyName: user.companyName,
			phoneNumber: user.phoneNumber,
			emailAddress: user.email
		});
	} catch (error) {
		console.error("Error getting users first name, last name:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { username, password, firstName, lastName, emailAddress, phoneNumber, companyName, country } = req.body;

		// Check if not null fields are empty
		if (!username || !password || !firstName || !lastName || !emailAddress) {
			return res.status(400).send("Missing fields");
		}
		// Username/password verification
		else if (username.length < 6 || username.length > 24 ||
			password.length < 8 || password.length > 50) {
			return res.status(400).send("Invalid username/password");
		} else {
			// Insert new account into database
			const newUser = new User({
				username: username,
				password: await hashPassword(password),
				firstName: firstName,
				lastName: lastName,
				email: emailAddress,
				phoneNumber: phoneNumber,
				companyName: companyName,
				country: country
			});
			const document = await User.insertOne(newUser);

			if (document) {
				// Generate session ID
				const sessionID = uuid.v4();
				// Add new session to tblSessions
				document.sessions.push({ sessionID });
				await document.save();
				// Return session ID
				return res.status(201).json({
					status: "success",
					sessionID: sessionID,
				});
			} else {
				return res.status(400).send("Account not created");
			}
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: "Internal server error", e });
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
