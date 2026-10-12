const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const { version: packageBackendVersion } = require("../package.json");

const router = express.Router();
const CONFIG_PATH = path.join(__dirname, "../config/appVersion.json");

// Mobile update checks and display-only version information.
// Configuration is stored in config/appVersion.json (no database).

function safeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseVersion(version) {
  if (typeof version !== "string" || !/^\d+(?:\.\d+){0,3}$/.test(version)) {
    return null;
  }

  const parts = version.split(".").map(Number);
  return parts.every(Number.isSafeInteger) ? parts : null;
}

function compareVersions(first, second) {
  const firstParts = parseVersion(first);
  const secondParts = parseVersion(second);

  if (!firstParts || !secondParts) return null;

  const length = Math.max(firstParts.length, secondParts.length);

  for (let index = 0; index < length; index++) {
    const firstValue = firstParts[index] ?? 0;
    const secondValue = secondParts[index] ?? 0;

    if (firstValue < secondValue) return -1;
    if (firstValue > secondValue) return 1;
  }

  return 0;
}

async function readVersionConfig() {
  const fileContent = await fs.readFile(CONFIG_PATH, "utf8");
  const configuration = JSON.parse(fileContent);

  if (
    !configuration ||
    typeof configuration !== "object" ||
    Array.isArray(configuration)
  ) {
    throw new Error("Invalid app version configuration.");
  }

  return configuration;
}

function isValidStoreUrl(url) {
  try {
    const parsedUrl = new URL(url);

    return (
      parsedUrl.protocol === "https:" &&
      Boolean(parsedUrl.hostname)
    );
  } catch (_) {
    return false;
  }
}

function isConfigObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function backendVersionFor(config) {
  return (
    safeString(config?.backendVersion) ||
    packageBackendVersion ||
    "unknown"
  );
}

function noUpdateData(platform, currentVersion, config) {
  return {
    platform,
    currentVersion,
    backendVersion: backendVersionFor(config),
    frontendVersion: safeString(config?.frontendVersion) || null,
    latestVersion: null,
    minimumSupportedVersion: null,
    updateEnabled: false,
    updateAvailable: false,
    forceUpdate: false,
    updateType: "none",
    title: null,
    message: null,
    releaseNotes: "",
    storeUrl: null,
  };
}

// ============================================================
// GET /api/app-version/check?platform=android&version=3.0.2
//
// Mobile-only update checks.
// Web must not use this endpoint.
// ============================================================

router.get("/check", async (req, res) => {
  res.set("Cache-Control", "no-store");

  try {
    const platform = safeString(req.query.platform).toLowerCase();
    const currentVersion = safeString(req.query.version);

    if (!["android", "ios"].includes(platform)) {
      return res.status(400).json({
        success: false,
        message: "Valid platform is required: android or ios.",
      });
    }

    if (!parseVersion(currentVersion)) {
      return res.status(400).json({
        success: false,
        message: "A valid installed app version is required.",
      });
    }

    const allConfigurations = await readVersionConfig();
    const config = allConfigurations[platform];

    if (config === undefined || config === null) {
      return res.status(200).json({
        success: true,
        message: "No app version configuration found for platform.",
        data: noUpdateData(platform, currentVersion, null),
      });
    }

    if (!isConfigObject(config)) {
      return res.status(503).json({
        success: false,
        message: "Invalid platform version configuration.",
      });
    }

    const backendVersion = backendVersionFor(config);
    const frontendVersion =
      safeString(config.frontendVersion) || null;

    const latestVersion = safeString(config.latestVersion);
    const updateEnabled = config.updateEnabled === true;

    const configuredUpdateType =
      config.updateType === "required" ? "required" : "optional";

    let updateType = "none";

    // ========================================================
    // COMPARE INSTALLED VERSION WITH LATEST VERSION
    // ========================================================

    if (updateEnabled) {
      if (!parseVersion(latestVersion)) {
        return res.status(503).json({
          success: false,
          message: "Invalid latest app version configuration.",
        });
      }

      const comparison = compareVersions(
        currentVersion,
        latestVersion
      );

      if (comparison === null) {
        return res.status(503).json({
          success: false,
          message: "Unable to compare app versions.",
        });
      }

      if (comparison < 0) {
        updateType = configuredUpdateType;
      }
    }

    // ========================================================
    // VALIDATE STORE URL
    // ========================================================

    const storeUrl = safeString(config.storeUrl);

    if (updateType !== "none" && !isValidStoreUrl(storeUrl)) {
      console.error(
        `[app-version] Invalid store URL for ${platform}`
      );

      return res.status(503).json({
        success: false,
        message: "App update store URL is not configured.",
      });
    }

    // ========================================================
    // UPDATE FLAGS
    // ========================================================

    const updateAvailable = updateType !== "none";
    const forceUpdate = updateType === "required";

    let title = null;
    let message = null;

    if (updateType === "optional") {
      title = safeString(config.title) || "Update Available";

      message =
        safeString(config.message) ||
        "A new version of Mighty Lube is available.";
    } else if (updateType === "required") {
      title =
        safeString(config.forceUpdateTitle) ||
        "Update Required";

      message =
        safeString(config.forceUpdateMessage) ||
        "Please update Mighty Lube to continue.";
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message: "App version checked successfully.",
      data: {
        platform,
        currentVersion,

        backendVersion,
        frontendVersion,

        latestVersion: latestVersion || null,
        minimumSupportedVersion: null,

        updateEnabled,
        updateAvailable,
        forceUpdate,
        updateType,

        title,
        message,
        releaseNotes: safeString(config.releaseNotes),

        storeUrl: storeUrl || null,
      },
    });
  } catch (error) {
    console.error(
      "[app-version] Unable to check app version:",
      error
    );

    return res.status(503).json({
      success: false,
      message: "App version service is temporarily unavailable.",
    });
  }
});

// ============================================================
// GET /api/app-version/display?platform=web
// GET /api/app-version/display?platform=android
// GET /api/app-version/display?platform=ios
//
// Display-only version information.
// Never enables an update popup.
// ============================================================

router.get("/display", async (req, res) => {
  res.set("Cache-Control", "no-store");

  try {
    const platform = safeString(req.query.platform).toLowerCase();

    if (!["android", "ios", "web"].includes(platform)) {
      return res.status(400).json({
        success: false,
        message: "Valid platform is required: android, ios or web.",
      });
    }

    const allConfigurations = await readVersionConfig();
    const config = allConfigurations[platform];

    if (
      config !== undefined &&
      config !== null &&
      !isConfigObject(config)
    ) {
      return res.status(503).json({
        success: false,
        message: "Invalid platform version configuration.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Version information retrieved successfully.",
      data: noUpdateData(platform, "", config ?? null),
    });
  } catch (error) {
    console.error(
      "[app-version] Unable to get display versions:",
      error
    );

    return res.status(503).json({
      success: false,
      message: "App version service is temporarily unavailable.",
    });
  }
});

module.exports = router;