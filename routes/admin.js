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

function configurationActor(user) {
	return {
		userID: user.userID,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		role: user.role || "user"
	};
}

function startOfDay(date) {
	const result = new Date(date);
	result.setHours(0, 0, 0, 0);
	return result;
}

function endOfDay(date) {
	const result = new Date(date);
	result.setHours(23, 59, 59, 999);
	return result;
}

function parseDateInput(value, useEndOfDay = false) {
	if (!value) return null;
	const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value);
	const parsed = new Date(dateOnly ? `${value}T00:00:00` : value);
	if (Number.isNaN(parsed.getTime())) {
		const error = new Error(`Invalid date: ${value}`);
		error.status = 400;
		throw error;
	}
	return dateOnly && useEndOfDay ? endOfDay(parsed) : parsed;
}

function getListQuery(query) {
	const sortBy = query.sortBy || "createdAt";
	const sortOrder = String(query.sortOrder || "asc").toLowerCase();
	const dateField = query.dateField || "createdAt";
	const requestedDateFilter = String(
		query.dateFilter || (query.startDate || query.endDate ? "custom" : "all")
	).toLowerCase();
	const dateFilterAliases = {
		all: "all",
		today: "today",
		lastday: "lastDay",
		yesterday: "lastDay",
		thisweek: "thisWeek",
		custom: "custom"
	};
	const dateFilter = dateFilterAliases[requestedDateFilter];

	if (!["createdAt", "updatedAt"].includes(sortBy)) {
		const error = new Error("sortBy must be createdAt or updatedAt");
		error.status = 400;
		throw error;
	}
	if (!["asc", "desc"].includes(sortOrder)) {
		const error = new Error("sortOrder must be asc or desc");
		error.status = 400;
		throw error;
	}
	if (!["createdAt", "updatedAt"].includes(dateField)) {
		const error = new Error("dateField must be createdAt or updatedAt");
		error.status = 400;
		throw error;
	}
	if (!dateFilter) {
		const error = new Error("dateFilter must be all, today, lastDay, thisWeek, or custom");
		error.status = 400;
		throw error;
	}

	let startDate = null;
	let endDate = null;
	const now = new Date();

	if (dateFilter === "today") {
		startDate = startOfDay(now);
		endDate = endOfDay(now);
	} else if (dateFilter === "lastDay") {
		const yesterday = new Date(now);
		yesterday.setDate(yesterday.getDate() - 1);
		startDate = startOfDay(yesterday);
		endDate = endOfDay(yesterday);
	} else if (dateFilter === "thisWeek") {
		const mondayOffset = (now.getDay() + 6) % 7;
		startDate = startOfDay(now);
		startDate.setDate(startDate.getDate() - mondayOffset);
		endDate = endOfDay(now);
	} else if (dateFilter === "custom") {
		if (!query.startDate || !query.endDate) {
			const error = new Error("startDate and endDate are required for a custom date filter");
			error.status = 400;
			throw error;
		}
		startDate = parseDateInput(query.startDate);
		endDate = parseDateInput(query.endDate, true);
		if (startDate > endDate) {
			const error = new Error("startDate cannot be after endDate");
			error.status = 400;
			throw error;
		}
	}

	return { sortBy, sortOrder, dateField, dateFilter, startDate, endDate };
}

function filterAndSort(items, listQuery) {
	const { sortBy, sortOrder, dateField, startDate, endDate } = listQuery;
	const filtered = startDate && endDate
		? items.filter((item) => {
			const value = new Date(item[dateField]);
			return !Number.isNaN(value.getTime()) && value >= startDate && value <= endDate;
		})
		: items;

	const direction = sortOrder === "asc" ? 1 : -1;
	return filtered.sort((a, b) => {
		const difference = new Date(a[sortBy]) - new Date(b[sortBy]);
		if (difference !== 0) return difference * direction;
		return String(a._id).localeCompare(String(b._id)) * direction;
	});
}

function serializeListQuery(listQuery) {
	return {
		sortBy: listQuery.sortBy,
		sortOrder: listQuery.sortOrder,
		dateField: listQuery.dateField,
		dateFilter: listQuery.dateFilter,
		startDate: listQuery.startDate ? listQuery.startDate.toISOString() : null,
		endDate: listQuery.endDate ? listQuery.endDate.toISOString() : null
	};
}

function getStatusFilter(query) {
	const rawStatus = query.status || query.statuses || "all";
	const statuses = String(rawStatus)
		.split(",")
		.map((status) => status.trim().toLowerCase())
		.filter(Boolean);

	if (statuses.length === 0 || statuses.includes("all")) {
		return [];
	}

	const invalidStatuses = statuses.filter(
		(status) => !["requested", "pending", "done"].includes(status)
	);
	if (invalidStatuses.length > 0) {
		const error = new Error(
			"status must be requested, pending, done, all, or a comma-separated combination"
		);
		error.status = 400;
		throw error;
	}

	return [...new Set(statuses)];
}

// Every route in this file requires a valid session belonging to an admin.
router.use(authenticate, requireAdmin);

// GET /api/admin/configurations
// Returns configuration data only, plus totals for the dashboard cards.
router.get("/configurations", async (req, res) => {
	try {
		const listQuery = getListQuery(req.query);
		const statusFilter = getStatusFilter(req.query);
		const configurations = await User.aggregate([
			{ $unwind: "$configurations" },
			{
				$set: {
					"configurations.createdAt": {
						$ifNull: ["$configurations.createdAt", "$configurations.dateOrdered"]
					},
					"configurations.updatedAt": {
						$ifNull: [
							"$configurations.updatedAt",
							{ $ifNull: ["$configurations.createdAt", "$configurations.dateOrdered"] }
						]
					},
					"configurations.createdBy": {
						$ifNull: [
							"$configurations.createdBy",
							{
								userID: "$userID",
								username: "$username",
								firstName: "$firstName",
								lastName: "$lastName",
								role: { $ifNull: ["$role", "user"] }
							}
						]
					},
					"configurations.updatedBy": {
						$ifNull: [
							"$configurations.updatedBy",
							{
								userID: "$userID",
								username: "$username",
								firstName: "$firstName",
								lastName: "$lastName",
								role: { $ifNull: ["$role", "user"] }
							}
						]
					}
				}
			},
			{ $replaceRoot: { newRoot: "$configurations" } }
		]);

		const normalizedConfigurations = configurations.map((configuration) => ({
			...configuration,
			status: normalizeConfigurationStatus(configuration.orderStatus)
		}));
		const statusFilteredConfigurations = statusFilter.length > 0
			? normalizedConfigurations.filter(
				(configuration) => statusFilter.includes(configuration.status)
			)
			: normalizedConfigurations;
		const data = filterAndSort(statusFilteredConfigurations, listQuery);

		const summary = {
			total: data.length,
			requested: 0,
			pending: 0,
			done: 0
		};

		data.forEach((configuration) => {
			summary[configuration.status] += 1;
		});

		return res.status(200).json({
			summary,
			query: {
				...serializeListQuery(listQuery),
				status: statusFilter.length > 0 ? statusFilter : ["all"]
			},
			data
		});
	} catch (error) {
		console.error("Failed to fetch admin configurations:", error);
		if (error.status === 400) {
			return res.status(400).json({ error: error.message });
		}
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
		configuration.updatedAt = new Date();
		configuration.updatedBy = configurationActor(req.user);

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
		configuration.updatedAt = new Date();
		configuration.updatedBy = configurationActor(req.user);

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
router.get("/users", async (req, res) => {
	try {
		const listQuery = getListQuery(req.query);
		const storedUsers = await User.find({})
			.select("userID username role firstName lastName email phoneNumber companyName country createdAt updatedAt")
			.lean();

		const normalizedUsers = storedUsers
			.map((user) => {
				const fallbackCreatedAt = user._id.getTimestamp();
				return {
					...user,
					createdAt: user.createdAt || fallbackCreatedAt,
					updatedAt: user.updatedAt || user.createdAt || fallbackCreatedAt
				};
			});
		const users = filterAndSort(normalizedUsers, listQuery);

		return res.status(200).json({
			count: users.length,
			query: serializeListQuery(listQuery),
			data: users
		});
	} catch (error) {
		console.error("Failed to fetch admin users:", error);
		if (error.status === 400) {
			return res.status(400).json({ error: error.message });
		}
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
