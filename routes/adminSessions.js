const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const User = require("../models/user");

const router = express.Router();

// Compare password
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ "username": username }).exec();

        // build allowed list from env, remove empty values, compare case-insensitively
        const allowed = [process.env.EMAIL_1, process.env.EMAIL_2].filter(Boolean).map(e => e.toLowerCase().trim());
        const userEmail = (user && user.username) ? user.username.toLowerCase().trim() : "";

        if (!user || !allowed.includes(userEmail)) {
            return res.status(401).json({ error: "Unauthorized: No account found with that username!" });
        }

        if (!(await comparePassword(password, user["password"]))) {
            return res.status(401).json({ error: "Unauthorized: Invalid credentials!" });
        }

        const sessionID = uuid.v4();
        user.sessions.push({ sessionID });
        await user.save();

        return res.status(201).json({
            status: "success",
            sessionID: sessionID,
        });
    }
    catch (error) {
        res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

module.exports = router;