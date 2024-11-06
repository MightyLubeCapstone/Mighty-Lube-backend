const bodyParser = require('body-parser');
const express = require('express');
const crypto = require('crypto'); // used for creating hash of password

// TODO: Database setup:


// Used for API routes
const app = express();


app.post('/create_account', async (req, res) => {
    try{
        // Get header fields
        const userID = req.header('userID'); // User ID
        const username = req.header('username'); // Username
        const password = req.header('password'); // Password
        const firstName = req.header('firstName'); // First name
        const lastName = req.header('lastName'); // Last name
        const emailAddress = req.header('emailAddress'); // Email address
        const phoneNumber = req.header('phoneNumber'); // Phone number
        const companyName = req.header('companyName'); // Company name
        const country = req.header('country'); // Country
        // Check if not null fields are empty
        if (!userID || !username || !password || !firstName || !lastName || !emailAddress) {
            return res.status(400).send('Missing fields');
        }
        // Username/password verification
        // FIXME: What are the username/password min requirements?
        else if (username.length < 6 || username.length > 24 || password.length < 8 || password.length > 50) {
            return res.status(400).send('Invalid username/password');
        }
        // Prevent SQL injection
        else if (!userID.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).send('Invalid user ID');
        }
        else if (!username.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).send('Invalid username');
        }
        else if (!firstName.match(/^[a-zA-Z]+$/)) {
            return res.status(400).send('Invalid first name');
        }
        else if (!lastName.match(/^[a-zA-Z]+$/)) {
            return res.status(400).send('Invalid last name');
        }
        else if (!emailAddress.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/)) {
            return res.status(400).send('Invalid email address');
        }
        else if (phoneNumber !== undefined && !phoneNumber.match(/^\(?\d{3}\)?[\d -]?\d{3}[\d -]?\d{4}$/)) {
            return res.status(400).send('Invalid phone number');
        }
        // Handle non-required fields
        else if (companyName !== undefined && !companyName.match(/^[a-zA-Z0-9]+$/)) {
            return res.status(400).send('Invalid company name');
        }
        // FIXME: Do we want to check if the country is valid? https://www.npmjs.com/package/countries-list
        else if (country !== undefined && !country.match(/^[a-zA-Z]+$/)) {
            return res.status(400).send('Invalid country');
        }
        else {
            // Hash password
            const passwordHash = crypto.createHash('sha256')
                .update(username)   // Use the username as the salt
                .update(password)   // Use the password as the data
                .digest('hex');    // Get the hash in hexadecimal
            // Insert new account into database
            database.executeQuery(
                `INSERT INTO tblUsers (userID, firstName, lastName, username, password, emailAddress, phoneNumber, companyName, country)
                     VALUES ('${userID}', '${firstName}', '${lastName}', '${username}', '${passwordHash}', '${emailAddress}', '${phoneNumber}',
                      '${companyName}', '${country}')`);
            // Generate session ID
            // FIXME: How do we generate a session ID?

            // Add new session to tblSessions
            database.executeQuery(
                `INSERT INTO tblSessions (sessionID, userID) VALUES ('${sessionID}', '${userID}')`
            ).then(() => {
                // Return session ID
                return res.status(200).send(
                    {
                        status: 'success',
                        sessionID: sessionID
                    }
                );
            }).catch((e) => {
                if (e instanceof RequestError && e.message.includes('Violation of PRIMARY KEY constraint')) {
                    return res.status(400).send('User already exists');
                } else{
                    console.error(e);
                }
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).send('Internal server error');
    }
});

module.exports = app;