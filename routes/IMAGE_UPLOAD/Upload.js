const express = require("express");
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const { authenticate } = require("../sessions");
const { uploadFile } = require("../../Services/object_storage_service");

const router = express.Router();

// ============================================================
// MULTER CONFIGURATION
//
// File memory me temporarily rahegi.
// Local server disk par save nahi hogi.
// ============================================================

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    // Maximum image size: 10 MB
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(
        new Error(
          "Only JPG, JPEG, PNG and WEBP images are allowed"
        )
      );
    }

    callback(null, true);
  },
});

// ============================================================
// POST /api/uploads/image
// ============================================================

router.post(
  "/image",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      // ======================================================
      // VALIDATE FILE
      // ======================================================

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image file is required",
        });
      }

      // ======================================================
      // VALIDATE PROJECT KEY
      //
      // Flutter sends:
      //
      // fields: {
      //   projectKey: widget.product.id
      // }
      //
      // Example:
      // CC5_CL
      // PFO_CLS_OP139A
      // PROTEIN_FGLM
      // ======================================================

      const projectKey = req.body?.projectKey?.trim();

      if (!projectKey) {
        return res.status(400).json({
          success: false,
          message: "projectKey is required",
        });
      }

      // ======================================================
      // USER ID
      // ======================================================

      const userID = req.user?.userID;

      if (!userID) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      // ======================================================
      // SAFE STORAGE VALUES
      //
      // Folder names must not contain characters that could
      // accidentally create another storage path.
      //
      // Example:
      //
      // User ID:
      // H102
      //
      // Project Key:
      // CC5_CL
      //
      // Folder:
      // H102-CC5_CL
      // ======================================================

      const safeUserID = String(userID)
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, "_");

      const safeProjectKey = String(projectKey)
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, "_");

      // ======================================================
      // FILE EXTENSION
      // ======================================================

      const extension =
        path.extname(req.file.originalname).toLowerCase() ||
        ".jpg";

      // ======================================================
      // UNIQUE FILE NAME
      //
      // File name UUID hi rahega so same-name files overwrite
      // nahi hongi.
      // ======================================================

      const uniqueId = crypto.randomUUID();

      // ======================================================
      // STORAGE FOLDER
      //
      // Format:
      //
      // <USER_ID>-<PROJECT_KEY>
      //
      // Example:
      //
      // H102-CC5_CL
      // ======================================================

      const folderName =
        `${safeUserID}-${safeProjectKey}`;

      // ======================================================
      // CREATE OBJECT KEY
      //
      // Final example:
      //
      // product-configurations/
      //   H102-CC5_CL/
      //     1ed09f9b-26af-4501-9167-9a8040ed86f2.jpg
      // ======================================================

      const objectKey =
        `product-configurations/` +
        `${folderName}/` +
        `${uniqueId}${extension}`;

      // ======================================================
      // UPLOAD TO SEVALLA OBJECT STORAGE
      // ======================================================

      const uploadedFile = await uploadFile({
        buffer: req.file.buffer,
        objectKey,
        contentType: req.file.mimetype,
      });

      // ======================================================
      // RESPONSE
      //
      // Bucket is private, so we permanently store objectKey.
      // We do NOT permanently store a signed URL because
      // signed URLs expire.
      // ======================================================

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",

        file: {
          objectKey: uploadedFile.objectKey,
          originalName: req.file.originalname,
          contentType: req.file.mimetype,
          size: req.file.size,
        },
      });
    } catch (error) {
      console.error("Image upload error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }
  }
);

// ============================================================
// MULTER ERROR HANDLER
// ============================================================

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Image size must not exceed 10 MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  next();
});

// ============================================================
// EXPORT
// ============================================================

module.exports = router;