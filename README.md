# Mighty Lube Backend

Express and MongoDB backend for the Mighty Lube Product Configurator.

The backend supports:

- Customer accounts and authentication
- Product configuration
- Cart and Draft workflows
- Submitted configurations
- Administrator dashboard
- User management
- Product-specific validation
- Customer image uploads
- Private object storage
- Secure image preview
- Email/RFQ workflows

The backend has been migrated to support the new reusable Product Configurator architecture.

---

## Current Architecture

The current product configuration flow is:

```text
Flutter Frontend
      ↓
Product API Route
      ↓
Authentication
      ↓
Product-Specific Validation Model
      ↓
Common ProductConfiguration
      ↓
MongoDB
```

Product-specific models validate product data.

The validated product data is then stored through the common
`ProductConfiguration` structure.

This separates:

```text
Product-Specific Validation
            ↓
Common Configuration Persistence
```

and avoids maintaining a completely separate persistence workflow for every
product.

---

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- Session-based authentication
- Multer for multipart image uploads
- S3-compatible private object storage
- Email notification integration

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node app.js
```

or use the configured npm start command:

```bash
npm start
```

Local defaults:

```text
Server:   http://localhost:8080
API Base: http://localhost:8080/api
MongoDB:  mongodb://127.0.0.1:27017/mighty_lube
```

The application reads configuration from environment variables.

Never commit real credentials to Git.

---

## Environment Configuration

Example environment configuration:

```env
NODE_ENV=development

DB_MODE=local

MONGODB_URI_LOCAL=mongodb://127.0.0.1:27017/mighty_lube
MONGODB_URI_PRODUCTION=<mongodb-uri>

SERVER_MODE=local

SERVER_HOST_LOCAL=127.0.0.1
SERVER_PORT_LOCAL=8080

SERVER_HOST_PRODUCTION=0.0.0.0
SERVER_PORT_PRODUCTION=8080

API_BASE_URL_LOCAL=http://localhost:8080/api
API_BASE_URL_PRODUCTION=https://configurator-67eol.sevalla.app/api

RESEND_API_KEY=<resend-api-key>
EMAIL_FROM=<verified-sender>
ORDER_EMAIL_TO=<notification-recipient>
```

Object-storage credentials are also provided through the deployment
environment.

Do not place real storage credentials in this README.

Hosting providers may provide `PORT`; the deployment environment can
override the local server port.

---

## Backend Version

The backend exposes a version API.

```http
GET /api/version
```

The version is read from `package.json`.

Example response:

```json
{
  "name": "mighty-lube",
  "version": "<current-package-version>",
  "environment": "production"
}
```

`package.json` should remain the source of truth for the backend version.

---

## Health Check

```http
GET /
```

The health endpoint confirms that the backend server is running.

Example:

```json
{
  "success": true,
  "message": "Backend server is running"
}
```

---

# Authentication and Authorization

Protected APIs require:

```http
Authorization: Bearer <sessionID>
```

Users and administrators use the same session/authentication system.

Authorization is determined using the authenticated user's role.

Current roles:

```text
user
admin
```

New customer accounts should receive:

```text
role: user
```

The signup request must not be allowed to assign an administrator role.

---

## Login

```http
POST /api/sessions
Content-Type: application/json
```

Example:

```json
{
  "username": "customer@example.com",
  "password": "password"
}
```

Successful authentication returns the session information used for
protected APIs.

---

## Validate Session

```http
GET /api/sessions
Authorization: Bearer <sessionID>
```

The endpoint validates the session and returns authenticated user
information.

---

## Logout

```http
DELETE /api/sessions
Authorization: Bearer <sessionID>
```

---

# User APIs

The backend supports:

- Username availability
- Account registration
- Current-user information
- Profile updates
- Account deletion
- Password recovery
- Security PIN validation
- Password reset
- Role-based authorization

---

## Check Username

```http
GET /api/users/username
```

---

## Register User

```http
POST /api/users
Content-Type: application/json
```

Example:

```json
{
  "username": "customer@example.com",
  "password": "password",
  "securityPin": "1234",
  "firstName": "Example",
  "lastName": "Customer",
  "email": "customer@example.com",
  "phoneNumber": "9876543210",
  "companyName": "Example Company",
  "country": "USA"
}
```

New users receive the normal customer/user role.

---

## Current User

```http
GET /api/users/userinfo
Authorization: Bearer <sessionID>
```

---

## Update User

```http
PUT /api/users
Authorization: Bearer <sessionID>
Content-Type: application/json
```

---

## Delete User

```http
DELETE /api/users
Authorization: Bearer <sessionID>
```

---

# Forgot Password

Normal-user password recovery uses the security PIN flow.

### Find Account

```http
POST /api/email/forgot
```

### Verify Security PIN

```http
POST /api/email/forgot/verify-pin
```

### Set New Password

```http
PUT /api/email/forgot
```

A normal user must successfully complete the required recovery validation
before changing the password.

---

# Product Configurator Architecture

The product backend was migrated to support the new frontend Product
Configurator architecture.

Each migrated product generally has:

```text
Product-Specific Mongoose Model
              +
Product-Specific Express Route
              ↓
Common ProductConfiguration
```

The responsibilities are intentionally separated.

### Product Model

Responsible for:

```text
Product field validation
Required-field validation
Data type validation
Product-specific rules
```

### Product Route

Responsible for:

```text
Authentication
Request validation
Quantity validation
Product model validation
Preparing configurationData
Creating ProductConfiguration
Returning API response
```

### ProductConfiguration

Responsible for the shared configuration lifecycle and persistence.

---

# Product API Flow

Typical product request:

```text
POST /api/<product>
       ↓
Authenticate
       ↓
Read Product Data
       ↓
Validate Quantity
       ↓
Validate Product Model
       ↓
Prepare configurationData
       ↓
Create ProductConfiguration
       ↓
Save to MongoDB
       ↓
Return configurationID
```

A typical product request contains:

```json
{
  "PRODUCTData": {
    "conveyorName": "Example Conveyor"
  },
  "numRequested": 1
}
```

The exact product-data property depends on the product API.

---

# Product Validation Models

Product-specific Mongoose models are primarily used to validate the
configuration received from the frontend.

Conceptually:

```javascript
const validation = new ProductModel(PRODUCTData);

await validation.validate();

const configurationData = validation.toObject({
  versionKey: false,
});
```

Validated data is then used when creating the common configuration.

---

# Common ProductConfiguration

Migrated products use the common `ProductConfiguration` persistence
structure.

The common configuration contains information such as:

```text
configurationID
userID
configurationName
productType
productName
status
isComplete
numRequested
configurationData
createdBy
updatedBy
```

Product-specific fields are stored inside:

```text
configurationData
```

Example:

```json
{
  "configurationID": "configuration-uuid",
  "userID": "user-uuid",
  "configurationName": "Main Conveyor",
  "productType": "CC5_CL",
  "productName": "CC5 Chain Lubricator",
  "status": "cart",
  "isComplete": true,
  "numRequested": 1,
  "configurationData": {
    "conveyorName": "Main Conveyor"
  }
}
```

---

# Why Common ProductConfiguration Is Used

Previously, product workflows relied more heavily on product-specific
handling.

The migrated architecture uses:

```text
Product Model
    ↓
Validate Product Data
    ↓
ProductConfiguration
    ↓
Persist Common Configuration
```

Benefits:

- Consistent configuration lifecycle
- Consistent Cart integration
- Common quantity handling
- Common ownership information
- Common audit information
- Easier product migration
- Less duplicated persistence logic

---

# Frontend / Backend Field Contract

Frontend field keys and backend model fields must remain aligned.

Example:

Frontend:

```dart
key: 'wheelOpenType'
```

Backend:

```javascript
wheelOpenType: {
  type: String,
  required: true,
  trim: true,
}
```

A mismatch such as:

```text
Frontend:
wheelOpenType

Backend:
wheelOpenRaceStyle
```

causes backend validation to fail even when the customer completed the
frontend form correctly.

When migrating or modifying a product, always compare the actual frontend
field keys with the backend model.

---

# Required and Optional Fields

If the frontend defines:

```dart
required: true
```

the backend model should normally require the same field.

Optional frontend fields should remain optional unless there is a
documented backend requirement.

Frontend and backend validation should describe the same product contract.

---

# Handling "Other"

Some frontend dropdowns support:

```text
Other
```

When the customer selects `Other`, the frontend can replace the literal
`Other` value with custom text.

Example:

```text
Dropdown:
Daifuku
Frost
Rapid
Other

Custom Value:
Custom Manufacturer
```

Backend receives:

```text
Custom Manufacturer
```

For this type of field, do not use an enum that only accepts the original
dropdown values.

Also do not introduce separate fields such as:

```text
otherManufacturer
otherChainSize
otherApplicationEnvironment
```

unless the frontend actually sends those fields.

---

# Quantity Validation

Product APIs validate:

```text
numRequested
```

Quantity must be a positive integer.

Conceptually:

```javascript
const quantity = Number(numRequested);

if (!Number.isInteger(quantity) || quantity < 1) {
  return res.status(400).json({
    success: false,
    message: "numRequested must be a positive integer",
  });
}
```

---

# Product Route Registration

Product routes are registered centrally in:

```text
app.js
```

Example:

```javascript
const productRoute = require("./routes/...");

app.use("/api/product", productRoute);
```

When adding a product backend:

```text
Create Model
    ↓
Create Route
    ↓
Register Route in app.js
    ↓
Add Frontend Endpoint
    ↓
Test
```

---

# Cart APIs

Cart routes require a valid authenticated session.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/cart` | List cart orders |
| `PUT` | `/api/cart` | Restore saved work into cart |
| `PUT` | `/api/cart/order` | Update a cart order |
| `GET` | `/api/cart/order` | Get order details |
| `DELETE` | `/api/cart/order` | Delete an order |

Migrated product APIs create configurations that participate in the common
cart/configuration workflow.

---

# Draft APIs

Drafts allow customers to save unfinished configuration work.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/drafts` | List drafts |
| `PUT` | `/api/drafts` | Save current work as draft |
| `DELETE` | `/api/drafts` | Delete draft |

The newer frontend works with draft concepts including:

```text
draftID
items
quantity
createdAt
```

---

# Submitted Configurations

Authenticated users can access submitted configurations.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/configurations` | List submitted configurations |
| `PUT` | `/api/configurations` | Submit/finalize configuration |
| `DELETE` | `/api/configurations/:configId` | Delete configuration |

The overall lifecycle is:

```text
Product Configuration
        ↓
Cart
        ↓
Draft (optional)
        ↓
Finalize
        ↓
Submitted Configuration
```

---

# Customer Image Upload

The backend now supports customer-uploaded configuration images.

Upload endpoint:

```http
POST /api/uploads/image
Authorization: Bearer <sessionID>
Content-Type: multipart/form-data
```

Multipart fields:

```text
image
projectKey
```

The user must be authenticated before an image can be uploaded.

---

# Supported Image Types

Currently supported MIME types:

```text
image/jpeg
image/png
image/webp
```

Unsupported image formats are rejected.

The upload API also applies a file-size limit.

---

# Image Upload Flow

```text
Flutter
   ↓
POST /api/uploads/image
   ↓
Authentication
   ↓
Multer
   ↓
Validate Image
   ↓
Generate Object Key
   ↓
Private Object Storage
   ↓
Return Image Metadata
```

The backend does not return a permanent public image URL for storage in the
configuration.

---

# Private Object Storage

Customer-uploaded images are stored in private S3-compatible object
storage.

Current object organization follows:

```text
product-configurations/
└── <userID>-<productType>/
    └── <generated-file-id>.<extension>
```

The user ID comes from the authenticated user.

The product/project key is validated before it is used as part of the
object-storage path.

Clients must not be allowed to supply arbitrary storage paths.

---

# Image Metadata

MongoDB stores image metadata instead of the binary image.

Example:

```json
{
  "objectKey": "product-configurations/user-id-CC5_CL/image-id.jpg",
  "originalName": "factory.jpg",
  "contentType": "image/jpeg",
  "size": 123456
}
```

Supported product models can use an image metadata schema conceptually
similar to:

```javascript
const ImageMetadataSchema = new mongoose.Schema(
  {
    objectKey: {
      type: String,
      required: true,
      trim: true,
    },

    originalName: {
      type: String,
      required: true,
      trim: true,
    },

    contentType: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);
```

---

# Image Storage Rules

The backend follows these rules:

```text
Do not store local Flutter/device paths.

Do not store temporary signed URLs.

Store permanent objectKey + metadata.

Generate signed URLs only when an image needs to be viewed.

Keep customer images private.
```

---

# Admin Dashboard APIs

Admin APIs require an administrator session.

Main Admin functionality includes:

- Configuration listing
- Sorting
- Date filtering
- Workflow-status filtering
- Configuration details
- Configuration editing
- Configuration deletion
- Admin workflow updates
- Customer image access
- User listing
- User editing
- Role management
- Password reset
- User deletion

---

# Admin Configurations

```http
GET /api/admin/configurations
Authorization: Bearer <admin-sessionID>
```

Configuration listing supports server-side sorting and filtering.

Supported concepts include:

```text
sortBy
sortOrder
dateField
dateFilter
startDate
endDate
status
```

Workflow status filtering supports:

```text
requested
pending
done
```

---

# Admin Workflow

Configurations have a separate Admin workflow:

```text
Requested
Pending
Done
```

Admin can move between the supported workflow states.

This workflow is separate from the normal configuration lifecycle status.

---

# Admin Workflow Timestamps

Admin workflow transitions are tracked using fields such as:

```text
adminRequestedAt
adminStartedAt
adminCompletedAt
```

Conceptually:

```text
Requested
    ↓
adminRequestedAt

Pending
    ↓
adminStartedAt

Done
    ↓
adminCompletedAt
```

---

## Pending

When status changes to:

```text
pending
```

the backend starts the Pending period from the actual transition time.

```text
adminStartedAt = current time
```

The completion timestamp is cleared when a new Pending period starts.

If a configuration goes from Done back to Pending, a new Pending period
starts.

---

## Done

When status changes to:

```text
done
```

the backend records:

```text
adminCompletedAt
```

This timestamp is used as the Admin completion date.

---

## Requested

When the workflow returns to:

```text
requested
```

active processing/completion timestamps are reset according to the current
workflow.

This keeps workflow timestamps synchronized with Admin status.

---

# Admin Customer Image Access

Admin can view customer-uploaded images attached to configurations.

The database stores only the image metadata/object key.

When Admin requests an image:

```text
Admin Frontend
      ↓
Image URL API
      ↓
Find Configuration
      ↓
Find Image Metadata
      ↓
Validate Ownership
      ↓
Generate Signed URL
      ↓
Return Temporary URL
```

---

# Signed Image URL API

Admin image access uses a configuration-based endpoint.

```http
POST /api/admin/configurations/:configurationID/image-url
Authorization: Bearer <admin-sessionID>
Content-Type: application/json
```

Request:

```json
{
  "imageKey": "plantLayoutImage"
}
```

The frontend sends the configuration field name containing the image
metadata.

It does not need to send an arbitrary object-storage path.

---

# Image Ownership Validation

Before generating a signed URL, the backend verifies that the image belongs
to the configuration.

Current expected prefix:

```text
product-configurations/<configuration.userID>-<configuration.productType>/
```

Conceptually:

```javascript
const expectedPrefix =
  `product-configurations/${configuration.userID}-${configuration.productType}/`;
```

If the stored object key does not belong to the expected configuration
location, access is rejected.

This protects private images from cross-configuration access.

---

# Admin User Management

Admin user APIs support:

- List users
- Sort users
- Filter users by date
- View user information
- Edit user information
- Change user role
- Reset user password
- Delete user

Sensitive authentication data must never be returned through user-list or
user-detail APIs.

This includes:

```text
Password Hashes
Security PINs
Reset Codes
Sessions
```

---

# Admin Role Management

Normal users and Admin users share the authentication system.

Role authorization is handled by the backend.

Allowed roles:

```text
user
admin
```

Admin-only routes must always verify administrator access on the server.

Frontend role checks are not a replacement for backend authorization.

---

# Order / RFQ / Email APIs

Existing order, RFQ and email functionality remains part of the backend.

Examples include:

```text
/api/orders/...
/api/rfq/...
/api/email/...
```

These workflows support configuration/order processing and notifications.

---

# Database Architecture

MongoDB stores:

```text
Users
Sessions / authentication-related data
Product Configurations
Cart / Draft information
Submitted configurations
Admin workflow information
Audit information
Customer image metadata
```

The major Product Configurator migration is the use of the common:

```text
ProductConfiguration
```

for migrated product persistence.

---

# Database Changes

The new backend architecture introduced/updated the following database
concepts.

### Common Product Configuration

Product-specific configuration data is stored inside:

```text
configurationData
```

while shared information remains at the common configuration level.

---

### Quantity

Configuration quantity is maintained using:

```text
numRequested
```

---

### Audit Information

Configuration records can maintain actor and timestamp information such as:

```text
createdAt
updatedAt
createdBy
updatedBy
```

---

### Admin Workflow

Admin workflow information includes:

```text
Admin Status

adminRequestedAt
adminStartedAt
adminCompletedAt
```

This separates operational Admin processing from normal configuration
creation/submission timestamps.

---

### Customer Images

Customer image binary data is not stored in MongoDB.

MongoDB stores only metadata:

```text
objectKey
originalName
contentType
size
```

The actual file remains in private object storage.

---

# Error Handling

Common HTTP status codes:

| Status | Meaning |
| --- | --- |
| `400` | Invalid or missing request data |
| `401` | Missing, invalid, or expired session |
| `403` | Access not allowed |
| `404` | Resource or route not found |
| `422` | Product/model validation error |
| `500` | Internal server error |

Product validation errors can return field-level details.

Example:

```json
{
  "success": false,
  "message": "Invalid product configuration",
  "errors": {
    "fieldName": "Validation message"
  }
}
```

---

# Adding a New Product

For a normal new product:

```text
1. Confirm frontend Product ID.

2. Confirm frontend field keys.

3. Create the Mongoose validation model.

4. Match required/optional fields with frontend.

5. Create the Express product route.

6. Validate product data.

7. Validate numRequested.

8. Store validated data in configurationData.

9. Create ProductConfiguration.

10. Register the route in app.js.

11. Add/verify the frontend API endpoint.

12. Test the complete request.
```

---

# Product Migration Checklist

When migrating an old product:

```text
Check Product ID

Check Request Body Key

Check API Endpoint

Check Frontend Field Keys

Check Backend Model Keys

Check Required Fields

Check Optional Fields

Check Dropdown Values

Check "Other" Handling

Check Image Metadata Fields

Check Quantity

Check Product Name

Check Product Type

Check app.js Route Registration

Test Configuration Creation
```

Do not assume an old backend model matches the current frontend form.

---

# Security Notes

Never commit:

```text
.env

MongoDB credentials

Session secrets

Email API keys

Object-storage access keys

Object-storage secret keys

Private certificates

Passwords

Production credentials
```

Use deployment/environment configuration for all secrets.

Additional rules:

- Do not return password hashes.
- Do not return security PINs.
- Do not return reset codes.
- Do not expose session IDs unnecessarily.
- Admin APIs must verify Admin authorization.
- Private image URLs must be temporary.
- Validate image ownership before signing.
- Derive user ownership from authenticated sessions.
- Production APIs should use HTTPS.

A private Git repository does **not** replace proper secret management.

---

# Production

Current production backend:

```text
https://configurator-67eol.sevalla.app
```

API root:

```text
https://configurator-67eol.sevalla.app/api
```

The hosting platform manages the production application process.

Environment-specific credentials and database/storage configuration must
remain outside the repository.

---

# Notes for Future Development

Keep these rules in mind:

- Product-specific models should validate product-specific data.
- Use the common `ProductConfiguration` for the shared configuration lifecycle.
- Keep frontend and backend field keys exactly aligned.
- Keep required/optional validation synchronized.
- Allow custom text when frontend `Other` replaces the dropdown value.
- Do not invent separate `other...` fields unless frontend sends them.
- Register every new product route in `app.js`.
- Keep user ownership tied to the authenticated session.
- Store customer image metadata, not image binaries, in MongoDB.
- Never store local device image paths.
- Never persist signed URLs.
- Validate object ownership before generating signed URLs.
- Keep Admin workflow timestamps separate from normal configuration dates.
- Never commit production secrets.

---

# Migration Summary

The backend was upgraded from the previous product-specific configuration
approach to support the new reusable Mighty Lube Product Configurator.

The main backend work includes:

- Migrated product validation models
- Migrated product API routes
- Common `ProductConfiguration` persistence
- Frontend/backend field alignment
- Required and optional field validation
- Custom `Other` value handling
- Quantity validation
- Cart integration
- Draft integration
- Submitted configuration support
- Customer image upload API
- Private object-storage integration
- Permanent image metadata
- Temporary signed image URLs
- Image ownership validation
- Updated Admin configuration APIs
- Requested / Pending / Done Admin workflow
- Admin workflow timestamps
- Pending-duration tracking
- Admin customer-image access
- Existing authentication and user-management integration

The main backend design principle is:

> **Product-specific models validate the product data, while the common
> ProductConfiguration structure manages the shared configuration
> lifecycle and persistence.**