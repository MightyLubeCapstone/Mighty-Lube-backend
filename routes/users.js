const express = require("express");
const bcrypt = require("bcrypt"); // used for creating hash of password
const uuid = require("uuid"); // used for creating session ID
const { dbConnect } = require("../config/config"); // may not need this? could just be for security's sake
const { hashPassword } = require("./sessions");

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


router.get("/userinfo", async (req, res) => {
	try {
		// this needs to be redone with only a sessionID, nothing else should be stored client side
		const { username } = req.headers;
		if (!username) {
			return res.status(400).json({ message: "Username is required!" });
		}
		const user = await User.findOne({ "username": username }).exec();
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}
		return res.status(200).json({
			firstName: user.firstName,
			lastName: user.lastName,
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
		// FIXME: What are the username/password min requirements?
		else if (username.length < 6 || username.length > 24 ||
			password.length < 8 || password.length > 50) {
			return res.status(400).send("Invalid username/password");
		}
		else if (!username.match(/^[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid username");
		}
		else if (!firstName.match(/^[a-zA-Z]+$/)) {
			return res.status(400).send("Invalid first name");
		}
		else if (!lastName.match(/^[a-zA-Z]+$/)) {
			return res.status(400).send("Invalid last name");
		}
		else if (!emailAddress.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid email address");
		}
		else if (phoneNumber !== undefined &&
			!phoneNumber.match(/^\(?\d{3}\)?[\d -]?\d{3}[\d -]?\d{4}$/)) {
			return res.status(400).send("Invalid phone number");
		}
		// Handle non-required fields
		else if (companyName !== undefined && !companyName.match(/^[a-zA-Z0-9]+$/)) {
			return res.status(400).send("Invalid company name");
		}
		else if (country !== undefined && !country.match(/^[a-zA-Z\s]+$/)) {
			return res.status(400).send("Invalid country");
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


router.delete("/", async (req, res) => {
	try {
		// cleanup for testing
		const { sessionID } = req.body;
		const result = await User.deleteOne({ "sessions.sessionID": sessionID });
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
