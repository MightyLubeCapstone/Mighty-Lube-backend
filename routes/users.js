const express = require("express");
const bcrypt = require("bcrypt"); // used for creating hash of password
const { sql, poolConnect } = require("../config/config");
const uuid = require("uuid"); // used for creating session ID

const router = express.Router();

async function checkUser(username) {
    try {
        const pool = await poolConnect;
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
        const pool = await poolConnect;
        const request = pool.request();
        const response = await request
			.input("username", sql.VarChar, username)
			.query("Select * from tblUsers Where username = @username");
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
		if (!user) {
			res.status(200).json({ message: "Username available!" });
			return;
		}
		res.status(400).json({ error: "Account with that username already exists!" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

async function postUser(userID, firstName, lastName, username, passwordHash, emailAddress, phoneNumber, companyName, country) {
    try {
		const pool = await poolConnect;
        const request = pool.request();
        const response = await request
            .input("userID", sql.VarChar, userID)
            .input("username", sql.VarChar, username)
            .input("password", sql.VarChar, passwordHash)
            .input("firstName", sql.VarChar, firstName)
            .input("lastName", sql.VarChar, lastName)
            .input("emailAddress", sql.VarChar, emailAddress)
            .input("phoneNumber", sql.VarChar, phoneNumber)
            .input("country", sql.VarChar, country)
            .input("companyName", sql.VarChar, companyName)
            .query(`
                INSERT INTO tblUsers (userID, username, password, firstName, lastName, emailAddress, phoneNumber, country, companyName)
                VALUES (@userID, @username, @password, @firstName, @lastName, @emailAddress, @phoneNumber, @country, @companyName)
            `);
        return true;
    } catch (error) {
        console.error("Error in postUser:", error);
        throw error;
    }
}

async function postSession(sessionID, userID) {
	try {
        const pool = await poolConnect;
        const request = pool.request();
        const response = await request
			.input("sessionID", sql.VarChar, sessionID)
			.input("userID", sql.VarChar, userID)
			.query(`INSERT INTO tblSessions (sessionID, userID) VALUES (@sessionID, @userID)`);
		return true;
    } catch (error) {
        console.error("Error in postSession:", error);
        throw error;
    }
}

router.post("/register", async (req, res) => {
	try {
		const { userID, username, password, firstName, lastName, emailAddress, phoneNumber, companyName, country } = req.body;

		// Check if not null fields are empty
		if (!userID || !username || !password || !firstName || !lastName || !emailAddress) {
			return res.status(400).send("Missing fields");
		}

		else if (username.length < 6 || username.length > 24 || password.length < 8 || password.length > 50) 
		{

			return res.status(400).send("Invalid username/password");
		}

		else if (!userID.match(/^[a-zA-Z0-9]+$/)) 
		{

			return res.status(400).send("Invalid user ID");

		}
		
		else if (!username.match(/^[a-zA-Z0-9]+$/)) 
		{

			return res.status(400).send("Invalid username");

		}
		
		else if (!firstName.match(/^[a-zA-Z]+$/)) 
		{

			return res.status(400).send("Invalid first name");

		}
		
		else if (!lastName.match(/^[a-zA-Z]+$/)) 
		{

			return res.status(400).send("Invalid last name");

		}
		
		else if (!emailAddress.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) 
		{

			return res.status(400).send("Invalid email address");

		}
		else if (phoneNumber !== undefined && !phoneNumber.match(/^\(?\d{3}\)?[\d -]?\d{3}[\d -]?\d{4}$/)) 
		{

			return res.status(400).send("Invalid phone number");

		}
		else if (companyName !== undefined && !companyName.match(/^[a-zA-Z0-9]+$/)) 
		{

			return res.status(400).send("Invalid company name");

		}
		else if (country !== undefined && !country.match(/^[a-zA-Z]+$/)) 
		{

			return res.status(400).send("Invalid country");

		} 
		else 
		{

			const userExists = await checkUser(username);
			if (userExists) {
				return res.status(400).send({ status: "error", message: "Username already exists" });
			}
	
			const passwordHash = bcrypt.hashSync(password, 10);
			const userInserted = await postUser(userID, firstName, lastName, username, passwordHash, emailAddress, phoneNumber, companyName, country);
			if (!userInserted) {
				return res.status(500).send("Failed to create user");
			}
	
			const sessionID = uuid.v4();
			const sessionInserted = await postSession(sessionID, userID);
			if (!sessionInserted) {
				return res.status(500).send("Failed to create session");
			}
	
			return res.status(200).send({ status: "success", sessionID });
		}
	} catch (e) {
		console.error(e);
		return res.status(500).send("Internal server error");
	}
});

module.exports = router;
