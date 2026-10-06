const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const uuid = require("uuid");
const User = require("../models/user");

const sessionsRoute = express.Router();

// =========================================================
// CONSTANTS
// =========================================================

const NORMAL_SESSION_DURATION_MS =
	1000 * 60 * 60 * 12; // 12 hours

const REMEMBER_TOKEN_DURATION_MS =
	1000 * 60 * 60 * 24 * 30; // 30 days

// =========================================================
// PASSWORD HELPERS
// =========================================================

async function hashPassword(password) {
	const saltRounds = 10;

	const salt = await bcrypt.genSalt(
		saltRounds
	);

	return await bcrypt.hash(
		password,
		salt
	);
}

async function comparePassword(
	password,
	hash
) {
	return await bcrypt.compare(
		password,
		hash
	);
}

// =========================================================
// REMEMBER TOKEN HELPERS
// =========================================================

function createRememberToken() {
	return crypto
		.randomBytes(48)
		.toString("hex");
}

function hashRememberToken(token) {
	return crypto
		.createHash("sha256")
		.update(token)
		.digest("hex");
}

// =========================================================
// CREATE NORMAL SESSION
// =========================================================

function createNormalSession(user) {
	const sessionID = uuid.v4();

	const now = new Date();

	const expiresAt = new Date(
		now.getTime() +
		NORMAL_SESSION_DURATION_MS
	);

	user.sessions.push({
		sessionID,
		createdAt: now,
		expiresAt
	});

	return {
		sessionID,
		expiresAt
	};
}

// =========================================================
// REMOVE EXPIRED REMEMBER TOKENS
// =========================================================

function removeExpiredRememberTokens(user) {
	const now = new Date();

	if (!Array.isArray(user.rememberTokens)) {
		user.rememberTokens = [];
		return;
	}

	user.rememberTokens =
		user.rememberTokens.filter(
			(token) =>
				token.expiresAt &&
				new Date(token.expiresAt) > now
		);
}

// =========================================================
// AUTHENTICATE NORMAL SESSION
// =========================================================

async function authenticate(
	req,
	res,
	next
) {
	const { authorization } =
		req.headers;

	if (
		!authorization ||
		!authorization.startsWith("Bearer ")
	) {
		return res.status(401).json({
			error:
				"Unauthorized: Missing token",
			message:
				"Session is missing, invalid, or expired"
		});
	}

	req.sessionID =
		authorization.slice(7);

	try {
		const user =
			await User.findOne({
				"sessions.sessionID":
					req.sessionID
			});

		if (!user) {
			return res.status(401).json({
				error: "Invalid session!",
				message:
					"Session is missing, invalid, or expired"
			});
		}

		const session =
			user.sessions.find(
				(s) =>
					s.sessionID ===
					req.sessionID
			);

		if (!session) {
			return res.status(401).json({
				error: "Invalid session!",
				message:
					"Session is missing, invalid, or expired"
			});
		}

		if (
			session.expiresAt &&
			new Date(
				session.expiresAt
			) < new Date()
		) {
			const sessionID =
				session.sessionID;

			await User.findByIdAndUpdate(
				user._id,
				{
					$pull: {
						sessions: {
							sessionID
						}
					}
				},
				{
					new: true
				}
			);

			return res.status(401).json({
				error:
					"Session expired!",
				message:
					"Session is missing, invalid, or expired"
			});
		}

		req.user = user;

		next();
	} catch (error) {
		console.error(
			"Authentication error:",
			error
		);

		return res.status(500).json({
			error:
				"Internal Server Error"
		});
	}
}

// =========================================================
// REQUIRE ADMIN
// =========================================================

function requireAdmin(
	req,
	res,
	next
) {
	if (
		!req.user ||
		req.user.role !== "admin"
	) {
		return res.status(403).json({
			error:
				"Admin access required",
			message:
				"Administrator access is required"
		});
	}

	next();
}

// =========================================================
// VALIDATE CURRENT NORMAL SESSION
//
// GET /sessions
// =========================================================

sessionsRoute.get(
	"/",
	authenticate,
	async (req, res) => {
		try {
			return res.status(200).json({
				message:
					"Valid Session",

				user: {
					userID:
						req.user.userID,

					username:
						req.user.username,

					role:
						req.user.role
				}
			});
		} catch (error) {
			console.error(
				"Session validation error:",
				error
			);

			return res.status(500).json({
				error:
					"Internal server error"
			});
		}
	}
);

// =========================================================
// NORMAL USERNAME + PASSWORD LOGIN
//
// POST /sessions
//
// Body:
//
// {
//     "username": "tabish",
//     "password": "Password123",
//     "rememberAccount": true
// }
//
// rememberAccount = true
// -> normal 12-hour session
// -> 30-day remember token
//
// rememberAccount = false
// -> normal 12-hour session only
// =========================================================

sessionsRoute.post(
	"/",
	async (req, res) => {
		try {
			const rawUsername =
				req.body.username;

			const password =
				req.body.password;

			const rememberAccount =
				req.body.rememberAccount ===
				true;

			// -----------------------------------------
			// USERNAME VALIDATION
			// -----------------------------------------

			if (
				typeof rawUsername !==
					"string" ||
				rawUsername.trim()
					.length === 0
			) {
				return res
					.status(400)
					.json({
						error:
							"Username is required",
						message:
							"Username is required"
					});
			}

			// -----------------------------------------
			// PASSWORD VALIDATION
			//
			// Password is intentionally NOT:
			// - trimmed
			// - lowercased
			// - uppercased
			//
			// Password remains case-sensitive.
			// -----------------------------------------

			if (
				typeof password !==
					"string" ||
				password.length === 0
			) {
				return res
					.status(400)
					.json({
						error:
							"Password is required",
						message:
							"Password is required"
					});
			}

			// -----------------------------------------
			// NORMALIZE USERNAME ONLY
			// -----------------------------------------

			const username =
				rawUsername
					.trim()
					.toLowerCase();

			const user =
				await User.findOne({
					username
				}).exec();

			if (!user) {
				return res
					.status(401)
					.json({
						error:
							"Unauthorized: No account found with that username!",
						message:
							"Incorrect username or password"
					});
			}

			// -----------------------------------------
			// VERIFY CASE-SENSITIVE PASSWORD
			// -----------------------------------------

			const passwordMatches =
				await comparePassword(
					password,
					user.password
				);

			if (!passwordMatches) {
				return res
					.status(401)
					.json({
						error:
							"Unauthorized: Invalid credentials!",
						message:
							"Incorrect username or password"
					});
			}

			// -----------------------------------------
			// CLEAN EXPIRED REMEMBER TOKENS
			// -----------------------------------------

			removeExpiredRememberTokens(
				user
			);

			// -----------------------------------------
			// CREATE 12-HOUR SESSION
			// -----------------------------------------

			const session =
				createNormalSession(
					user
				);

			let rememberToken = null;
			let rememberTokenExpiresAt =
				null;

			// -----------------------------------------
			// CREATE 30-DAY REMEMBER TOKEN
			// -----------------------------------------

			if (rememberAccount) {
				const rawRememberToken =
					createRememberToken();

				const tokenHash =
					hashRememberToken(
						rawRememberToken
					);

				const now =
					new Date();

				const expiresAt =
					new Date(
						now.getTime() +
							REMEMBER_TOKEN_DURATION_MS
					);

				user.rememberTokens.push({
					tokenHash,
					createdAt: now,
					expiresAt
				});

				rememberToken =
					rawRememberToken;

				rememberTokenExpiresAt =
					expiresAt;
			}

			await user.save();

			return res
				.status(201)
				.json({
					status: "success",

					sessionID:
						session.sessionID,

					sessionExpiresAt:
						session.expiresAt,

					role:
						user.role,

					user: {
						userID:
							user.userID,

						username:
							user.username,

						role:
							user.role
					},

					rememberToken,

					rememberTokenExpiresAt
				});
		} catch (error) {
			console.error(
				"Login error:",
				error
			);

			return res.status(500).json({
				error:
					"Internal server error",
				message:
					"Unable to login"
			});
		}
	}
);

// =========================================================
// CONTINUE AS / REMEMBERED LOGIN
//
// POST /sessions/remember
//
// Body:
//
// {
//     "username": "tabish",
//     "rememberToken": "..."
// }
//
// Valid remember token
// -> creates NEW 12-hour normal session
//
// IMPORTANT:
// Remember-token expiry is NOT extended here.
// It remains fixed at 30 days from its original creation.
// =========================================================

sessionsRoute.post(
	"/remember",
	async (req, res) => {
		try {
			const rawUsername =
				req.body.username;

			const rawRememberToken =
				req.body.rememberToken;

			if (
				typeof rawUsername !==
					"string" ||
				rawUsername.trim()
					.length === 0
			) {
				return res
					.status(400)
					.json({
						error:
							"Username is required",
						message:
							"Remembered account is invalid"
					});
			}

			if (
				typeof rawRememberToken !==
					"string" ||
				rawRememberToken.length === 0
			) {
				return res
					.status(401)
					.json({
						error:
							"Remember token is required",
						message:
							"Remembered login has expired. Please enter your password."
					});
			}

			const username =
				rawUsername
					.trim()
					.toLowerCase();

			const tokenHash =
				hashRememberToken(
					rawRememberToken
				);

			const user =
				await User.findOne({
					username,
					"rememberTokens.tokenHash":
						tokenHash
				}).exec();

			if (!user) {
				return res
					.status(401)
					.json({
						error:
							"Invalid remember token",
						message:
							"Remembered login has expired. Please enter your password."
					});
			}

			const rememberToken =
				user.rememberTokens.find(
					(token) =>
						token.tokenHash ===
						tokenHash
				);

			if (!rememberToken) {
				return res
					.status(401)
					.json({
						error:
							"Invalid remember token",
						message:
							"Remembered login has expired. Please enter your password."
					});
			}

			const now =
				new Date();

			if (
				!rememberToken.expiresAt ||
				new Date(
					rememberToken.expiresAt
				) <= now
			) {
				user.rememberTokens =
					user.rememberTokens.filter(
						(token) =>
							token.tokenHash !==
							tokenHash
					);

				await user.save();

				return res
					.status(401)
					.json({
						error:
							"Remember token expired",
						message:
							"Remembered login has expired. Please enter your password."
					});
			}

			// Remove any other expired remember tokens.
			// The current valid token remains unchanged.
			removeExpiredRememberTokens(
				user
			);

			// Create a NEW normal 12-hour session.
			const session =
				createNormalSession(
					user
				);

			await user.save();

			return res
				.status(201)
				.json({
					status: "success",

					sessionID:
						session.sessionID,

					sessionExpiresAt:
						session.expiresAt,

					role:
						user.role,

					user: {
						userID:
							user.userID,

						username:
							user.username,

						role:
							user.role
					}
				});
		} catch (error) {
			console.error(
				"Remembered login error:",
				error
			);

			return res.status(500).json({
				error:
					"Internal server error",
				message:
					"Unable to continue with remembered account"
			});
		}
	}
);

// =========================================================
// LOGOUT CURRENT NORMAL SESSION
//
// DELETE /sessions
//
// IMPORTANT:
// This does NOT remove remember tokens.
//
// Therefore:
//
// Logout
// -> normal session removed
// -> "Continue as" still works
// =========================================================

sessionsRoute.delete(
	"/",
	authenticate,
	async (req, res) => {
		try {
			const user =
				req.user;

			const sessionID =
				req.sessionID;

			if (!sessionID) {
				return res
					.status(400)
					.json({
						error:
							"Session ID is required"
					});
			}

			const updatedUser =
				await User.findByIdAndUpdate(
					user._id,
					{
						$pull: {
							sessions: {
								sessionID
							}
						}
					},
					{
						new: true
					}
				);

			if (!updatedUser) {
				return res
					.status(400)
					.json({
						error:
							"Session could not be deleted"
					});
			}

			return res
				.status(200)
				.json({
					message:
						"Session deleted"
				});
		} catch (error) {
			console.error(
				"Session delete error:",
				error
			);

			return res.status(500).json({
				error:
					"Internal server error"
			});
		}
	}
);

// =========================================================
// FORGET REMEMBERED ACCOUNT
//
// DELETE /sessions/remember
//
// Body:
//
// {
//     "username": "tabish",
//     "rememberToken": "..."
// }
//
// This endpoint intentionally does NOT require a normal
// session because the user may already be logged out or
// their 12-hour session may have expired.
//
// Only the matching hashed remember token is removed.
// =========================================================

sessionsRoute.delete(
	"/remember",
	async (req, res) => {
		try {
			const rawUsername =
				req.body.username;

			const rawRememberToken =
				req.body.rememberToken;

			if (
				typeof rawUsername !==
					"string" ||
				rawUsername.trim()
					.length === 0
			) {
				return res
					.status(400)
					.json({
						error:
							"Username is required",
						message:
							"Username is required"
					});
			}

			if (
				typeof rawRememberToken !==
					"string" ||
				rawRememberToken.length === 0
			) {
				// Nothing to revoke on the server.
				// Frontend can still remove its local remembered account.
				return res
					.status(200)
					.json({
						message:
							"Remembered account removed"
					});
			}

			const username =
				rawUsername
					.trim()
					.toLowerCase();

			const tokenHash =
				hashRememberToken(
					rawRememberToken
				);

			await User.updateOne(
				{
					username
				},
				{
					$pull: {
						rememberTokens: {
							tokenHash
						}
					}
				}
			);

			return res
				.status(200)
				.json({
					message:
						"Remembered account removed"
				});
		} catch (error) {
			console.error(
				"Remember token delete error:",
				error
			);

			return res.status(500).json({
				error:
					"Internal server error",
				message:
					"Unable to forget remembered account"
			});
		}
	}
);

// =========================================================
// EXPORTS
// =========================================================

module.exports = {
	authenticate,
	requireAdmin,
	hashPassword,
	comparePassword,
	sessionsRoute
};