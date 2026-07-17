const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const { authenticate, requireAdmin, hashPassword } = require("./sessions");

const router = express.Router();

function normalizeConfigurationStatus(status) {
	const normalized = String(status || "requested").trim().toLowerCase();

	if (["complete", "completed", "done"].includes(normalized)) return "done";
	if (normalized === "pending") return "pending";
	return "requested";
}

// Every route in this file requires a valid session belonging to an admin.
router.use(authenticate, requireAdmin);

// GET /api/admin/configurations
// Returns configuration data only, plus totals for the dashboard cards.
router.get("/configurations", async (_req, res) => {
	try {
		const configurations = await User.aggregate([
			{ $unwind: "$configurations" },
			{ $replaceRoot: { newRoot: "$configurations" } },
			{ $sort: { dateOrdered: -1 } }
		]);

		const summary = {
			total: configurations.length,
			requested: 0,
			pending: 0,
			done: 0
		};

		const data = configurations.map((configuration) => {
			const status = normalizeConfigurationStatus(configuration.orderStatus);
			summary[status] += 1;
			return { ...configuration, status };
		});

		return res.status(200).json({
			summary,
			data
		});
	} catch (error) {
		console.error("Failed to fetch admin configurations:", error);
		return res.status(500).json({ error: "Failed to fetch configurations" });
	}
});

// PATCH /api/admin/configurations/:configurationId
// Admins may edit configuration content, but not status or server-owned dates here.
router.patch("/configurations/:configurationId", async (req, res) => {
	try {
		const { configurationId } = req.params;
		const { configurationName, cart } = req.body;

		if (!mongoose.isValidObjectId(configurationId)) {
			return res.status(400).json({ error: "Invalid configuration ID" });
		}

		if (configurationName !== undefined &&
			(typeof configurationName !== "string" || !configurationName.trim())) {
			return res.status(400).json({ error: "configurationName must be a non-empty string" });
		}

		if (cart !== undefined && !Array.isArray(cart)) {
			return res.status(400).json({ error: "cart must be an array" });
		}

		if (configurationName === undefined && cart === undefined) {
			return res.status(400).json({
				error: "Provide configurationName or cart to update"
			});
		}

		const user = await User.findOne({ "configurations._id": configurationId });
		if (!user) {
			return res.status(404).json({ error: "Configuration not found" });
		}

		const configuration = user.configurations.id(configurationId);
		if (configurationName !== undefined) {
			configuration.configurationName = configurationName.trim();
		}
		if (cart !== undefined) {
			configuration.cart = cart;
		}

		user.markModified("configurations");
		await user.save();

		return res.status(200).json({
			message: "Configuration updated",
			configuration: {
				...configuration.toObject(),
				status: normalizeConfigurationStatus(configuration.orderStatus)
			}
		});
	} catch (error) {
		console.error("Failed to update configuration:", error);
		return res.status(500).json({ error: "Failed to update configuration" });
	}
});

// PATCH /api/admin/configurations/:configurationId/status
router.patch("/configurations/:configurationId/status", async (req, res) => {
	try {
		const { configurationId } = req.params;
		const requestedStatus = String(req.body.status || "").trim().toLowerCase();

		if (!["requested", "pending", "done"].includes(requestedStatus)) {
			return res.status(400).json({
				error: "Status must be requested, pending, or done"
			});
		}

		if (!mongoose.isValidObjectId(configurationId)) {
			return res.status(400).json({ error: "Invalid configuration ID" });
		}

		const user = await User.findOne({ "configurations._id": configurationId });
		if (!user) {
			return res.status(404).json({ error: "Configuration not found" });
		}

		const configuration = user.configurations.id(configurationId);
		configuration.orderStatus = requestedStatus === "done"
			? "Complete"
			: requestedStatus.charAt(0).toUpperCase() + requestedStatus.slice(1);

		if (requestedStatus === "done") {
			configuration.completeDate = configuration.completeDate || new Date();
			for (const order of configuration.cart || []) {
				order.completeDate = order.completeDate || configuration.completeDate;
			}
		} else {
			configuration.completeDate = null;
		}

		user.markModified("configurations");
		await user.save();

		return res.status(200).json({
			message: "Configuration status updated",
			configuration: {
				...configuration.toObject(),
				status: requestedStatus
			}
		});
	} catch (error) {
		console.error("Failed to update configuration status:", error);
		return res.status(500).json({ error: "Failed to update configuration status" });
	}
});

// GET /api/admin/users
// Authentication secrets are intentionally never returned.
router.get("/users", async (_req, res) => {
	try {
		const users = await User.find({})
			.select("userID username role firstName lastName email phoneNumber companyName country")
			.sort({ firstName: 1, lastName: 1 })
			.lean();

		return res.status(200).json({
			count: users.length,
			data: users
		});
	} catch (error) {
		console.error("Failed to fetch admin users:", error);
		return res.status(500).json({ error: "Failed to fetch users" });
	}
});

// PATCH /api/admin/users/:userId/password
// An authenticated admin may reset their own or another user's password.
router.patch("/users/:userId/password", async (req, res) => {
	try {
		const { userId } = req.params;
		const password = req.body.password || req.body.newPassword;

		if (!password) {
			return res.status(400).json({ error: "New password is required" });
		}

		if (typeof password !== "string" || password.length < 8 || password.length > 50) {
			return res.status(400).json({
				error: "Password must be between 8 and 50 characters"
			});
		}

		const identifiers = [{ userID: userId }];
		if (mongoose.isValidObjectId(userId)) {
			identifiers.push({ _id: userId });
		}

		const targetUser = await User.findOne({ $or: identifiers });
		if (!targetUser) {
			return res.status(404).json({ error: "User not found" });
		}

		targetUser.password = await hashPassword(password);
		targetUser.resetCode = null;
		// Password resets revoke all sessions for the affected account.
		targetUser.sessions = [];
		await targetUser.save();

		return res.status(200).json({
			message: "Password reset successfully",
			user: {
				userID: targetUser.userID,
				username: targetUser.username,
				role: targetUser.role
			}
		});
	} catch (error) {
		console.error("Failed to reset user password:", error);
		return res.status(500).json({ error: "Failed to reset user password" });
	}
});

// PATCH /api/admin/users/:userId/role
router.patch("/users/:userId/role", async (req, res) => {
	try {
		const { userId } = req.params;
		const { role } = req.body;

		if (!["user", "admin"].includes(role)) {
			return res.status(400).json({ error: "Role must be either user or admin" });
		}

		const identifiers = [{ userID: userId }];
		if (mongoose.isValidObjectId(userId)) {
			identifiers.push({ _id: userId });
		}

		const targetUser = await User.findOne({ $or: identifiers });
		if (!targetUser) {
			return res.status(404).json({ error: "User not found" });
		}

		if (String(targetUser._id) === String(req.user._id) && role !== "admin") {
			return res.status(400).json({ error: "You cannot remove your own admin role" });
		}

		targetUser.role = role;
		await targetUser.save();

		return res.status(200).json({
			message: "User role updated",
			user: {
				userID: targetUser.userID,
				username: targetUser.username,
				role: targetUser.role
			}
		});
	} catch (error) {
		console.error("Failed to update user role:", error);
		return res.status(500).json({ error: "Failed to update user role" });
	}
});

module.exports = router;
