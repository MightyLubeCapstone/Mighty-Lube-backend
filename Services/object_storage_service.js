const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// ============================================================
// SEVALLA OBJECT STORAGE CONFIGURATION
// ============================================================

const OBJECT_STORAGE_ENDPOINT = process.env.OBJECT_STORAGE_ENDPOINT;
const OBJECT_STORAGE_REGION =
  process.env.OBJECT_STORAGE_REGION || "auto";
const OBJECT_STORAGE_BUCKET = process.env.OBJECT_STORAGE_BUCKET;
const OBJECT_STORAGE_ACCESS_KEY =
  process.env.OBJECT_STORAGE_ACCESS_KEY;
const OBJECT_STORAGE_SECRET_KEY =
  process.env.OBJECT_STORAGE_SECRET_KEY;

// ============================================================
// S3 CLIENT
// Sevalla Object Storage is S3-compatible.
// ============================================================

const s3Client = new S3Client({
  region: OBJECT_STORAGE_REGION,
  endpoint: OBJECT_STORAGE_ENDPOINT,

  credentials: {
    accessKeyId: OBJECT_STORAGE_ACCESS_KEY,
    secretAccessKey: OBJECT_STORAGE_SECRET_KEY,
  },
});

// ============================================================
// UPLOAD FILE
// ============================================================

async function uploadFile({
  buffer,
  objectKey,
  contentType,
}) {
  if (!buffer) {
    throw new Error("File buffer is required");
  }

  if (!objectKey) {
    throw new Error("Object key is required");
  }

  if (!contentType) {
    throw new Error("Content type is required");
  }

  const command = new PutObjectCommand({
    Bucket: OBJECT_STORAGE_BUCKET,
    Key: objectKey,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  return {
    objectKey,
  };
}

// ============================================================
// GET SIGNED URL
//
// Object Storage remains private.
// This generates a temporary URL for viewing/downloading a file.
// Default expiry: 1 hour.
// ============================================================

async function getSignedFileUrl(
  objectKey,
  expiresIn = 3600
) {
  if (!objectKey) {
    throw new Error("Object key is required");
  }

  const command = new GetObjectCommand({
    Bucket: OBJECT_STORAGE_BUCKET,
    Key: objectKey,
  });

  return getSignedUrl(
    s3Client,
    command,
    {
      expiresIn,
    }
  );
}

// ============================================================
// DELETE FILE
// ============================================================

async function deleteFile(objectKey) {
  if (!objectKey) {
    throw new Error("Object key is required");
  }

  const command = new DeleteObjectCommand({
    Bucket: OBJECT_STORAGE_BUCKET,
    Key: objectKey,
  });

  await s3Client.send(command);

  return true;
}

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  uploadFile,
  getSignedFileUrl,
  deleteFile,
};