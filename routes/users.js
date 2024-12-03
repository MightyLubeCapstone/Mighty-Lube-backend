const express = require("express");
const bcrypt = require("bcrypt"); // used for creating hash of password
const { sql, pool, poolConnect } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID
const { hashPassword, postSession } = require("./sessions");

const router = express.Router();

async function checkUser(username) {
	try {
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("username", sql.VarChar, username)
			.query("SELECT * FROM tblUsers WHERE username = @username");
		return response.recordset.length > 0;
	} catch (error) {
		console.error("Error in checkUser:", error);
		throw error;
	}
}


async function getUser(username) {
	try {
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("username", sql.VarChar, username)
			.query("SELECT * FROM tblUsers WHERE username = @username");
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function getUserFirstNameLastName(username) {
	try {
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("username", sql.VarChar, username)
			.query("SELECT firstName, lastName FROM tblUsers WHERE username = @username");
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}


async function postUser(userID, firstName, lastName, username, passwordHash,
	emailAddress, phoneNumber, companyName, country) {
	try { // FIXME: Should I call to getuser to check if that user already exists
		await poolConnect;
		const request = pool.request();
		const response = await request
			.input("userID", sql.VarChar, userID)
			.input("firstName", sql.VarChar, firstName)
			.input("lastName", sql.VarChar, lastName)
			.input("username", sql.VarChar, username)
			.input("password", sql.VarChar, passwordHash)
			.input("emailAddress", sql.VarChar, emailAddress)
			.input("phoneNumber", sql.VarChar, phoneNumber)
			.input("companyName", sql.VarChar, companyName)
			.input("country", sql.VarChar, country)
			.query(`INSERT INTO tblUsers (userID, firstName, lastName, username, password, emailAddress, phoneNumber, companyName, country)
					VALUES (@userID, @firstName, @lastName, @username, @password, @emailAddress, @phoneNumber, @companyName, @country)`);
		return response.rowsAffected[0] > 0 ? true : false;
	} catch (error) {
		console.log(error);
	}
}

async function deleteUser(userID) {
	try {
		const request = pool.request();
		const response = await request
			.input("userID", sql.VarChar, userID)
			.query("DELETE FROM tblUsers WHERE userID = @userID");
		return response.recordset[0];
	} catch (error) {
		console.log(error);
		throw error;
	}
}

router.get("/username", async (req, res) => {
	try {
		const { username } = req.header("username");
		const user = await getUser(username);
		if (!user) { //FIXME: This does not actually check if username is available. Insomnia tests fail
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
		const username = req.header("username");

		if (!username) {
			return res.status(400).json({ message: "Username is required!" });
		}

		const user = await getUserFirstNameLastName(username);

		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		console.log(`First Name: ${user.firstName}, Last Name: ${user.lastName}`);

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
		const { username, password, firstname: firstName, lastname: lastName, emailaddress: emailAddress, phonenumber: phoneNumber, companyname: companyName, country } = req.headers;

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
		else if (country !== undefined && !country.match(/^[a-zA-Z]+$/)) {
			return res.status(400).send("Invalid country");
		} else {
			// generate a unique ID for the user
			const userID = uuid.v4();
			// Hash password
			const passwordHash = await hashPassword(password);
			// Insert new account into database
			// FIXME: check if userID and username already exist using user var
			const user = await postUser(userID, firstName, lastName, username,
				passwordHash, emailAddress, phoneNumber,
				companyName, country);
			if (user) {
				// Generate session ID
				const sessionID = uuid.v4();
				// Add new session to tblSessions
				const sessionInsert = await postSession(sessionID, userID);
				if (sessionInsert) {
					// Return session ID
					return res.status(201).json({
						status: "success",
						sessionID: sessionID,
					});
				}
			} else {
				return res.status(400).send("Account not created");
			}
		}
	} catch (e) {
		console.error(e);
		res.status(500).json({error: "Internal server error", e});
	}
});


router.delete("/", async (req, res) => {
	try {
		const { userID } = req.headers("userID");
		const response = deleteUser(userID);
		if (!response) {
			res.status(400).json({ error: "User not found" });
		} else {
			res.status(200).json({ message: "User deleted" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
