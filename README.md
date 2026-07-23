# Mighty Lube Backend

Express and MongoDB backend for the Mighty Lube product configurator, customer accounts, carts, submitted configurations, email notifications, and administrator dashboard.

## Versions

| Version | Git branch | Description |
| --- | --- | --- |
| `1.0.0` | `AddTechNote` | Original customer configurator backend and security-PIN password recovery |
| `2.0.0` | `adminDashboard` | Role-based administration, configuration/user management, audit information, sorting, and filtering |

Version 2.0.0 extends version 1.0.0 with:

- One shared login/session system for users and administrators.
- Automatic `user` role assignment for new accounts.
- Admin-only middleware and dashboard APIs.
- Configuration totals for requested, pending, and completed work.
- Configuration editing and status updates.
- User listing, role changes, and administrator password resets.
- Configuration `createdAt`, `updatedAt`, `createdBy`, and `updatedBy` audit information.
- User and configuration sorting and date filtering.
- Configuration status filtering.
- Local/production server and database configuration.

## Getting started

```bash
npm install
node app.js
```

Local defaults:

```text
Server:   http://localhost:8080
API base: http://localhost:8080/api
MongoDB:  mongodb://127.0.0.1:27017/mighty_lube
```

The application reads the root `.env` file. Never commit real credentials.

<details>
<summary><strong>Environment variables</strong></summary>

```env
# development selects the local server/database.
# production selects the deployed server/database.
NODE_ENV=development

DB_MODE=local
MONGODB_URI_LOCAL=mongodb://127.0.0.1:27017/mighty_lube
MONGODB_URI_PRODUCTION=<mongodb-atlas-uri>

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

Hosting providers may supply `PORT`; it overrides the configured server port.

</details>

## Authentication and authorization

Protected APIs require:

```http
Authorization: Bearer <sessionID>
```

Sessions expire after 12 hours. Users and administrators use the same login endpoint. Authorization is determined from the current `role` stored on the user document.

Allowed roles:

```text
user
admin
```

New accounts always receive `role: "user"`. The signup body cannot assign a role.

<details>
<summary><strong>Sessions: login, validate, and logout</strong></summary>

### Login

```http
POST /api/sessions
Content-Type: application/json
```

```json
{
  "username": "customer@example.com",
  "password": "password123"
}
```

```json
{
  "status": "success",
  "sessionID": "session-uuid",
  "role": "user"
}
```

### Validate session

```http
GET /api/sessions
Authorization: Bearer <sessionID>
```

```json
{
  "message": "Valid Session",
  "user": {
    "userID": "user-uuid",
    "username": "customer@example.com",
    "role": "user"
  }
}
```

### Logout

```http
DELETE /api/sessions
Authorization: Bearer <sessionID>
```

</details>

<details>
<summary><strong>Users: registration, profile, update, and deletion</strong></summary>

### Check username availability

```http
GET /api/users/username
username: customer@example.com
```

### Register

```http
POST /api/users
Content-Type: application/json
```

```json
{
  "username": "customer@example.com",
  "password": "password123",
  "securityPin": "1234",
  "firstName": "Example",
  "lastName": "Customer",
  "email": "customer@example.com",
  "phoneNumber": "9876543210",
  "companyName": "Example Company",
  "country": "USA"
}
```

`emailAddress` is accepted as an alias for `email`.

### Get current user

```http
GET /api/users/userinfo
Authorization: Bearer <sessionID>
```

### Update current user

```http
PUT /api/users
Authorization: Bearer <sessionID>
Content-Type: application/json
```

```json
{
  "firstName": "Example",
  "lastName": "Customer",
  "username": "customer@example.com",
  "email": "customer@example.com",
  "phoneNumber": "9876543210",
  "companyName": "Example Company"
}
```

### Delete current user

```http
DELETE /api/users
Authorization: Bearer <sessionID>
Content-Type: application/json
```

```json
{
  "password": "current-password"
}
```

</details>

<details>
<summary><strong>Forgot password: normal-user security PIN flow</strong></summary>

### Find account

```http
POST /api/email/forgot
Content-Type: application/json
```

```json
{
  "email": "customer@example.com"
}
```

### Verify security PIN

```http
POST /api/email/forgot/verify-pin
Content-Type: application/json
```

```json
{
  "email": "customer@example.com",
  "securityPin": "1234"
}
```

The backward-compatible `GET /api/email/forgot?email=...&securityPin=...` route is also available.

### Set new password

```http
PUT /api/email/forgot
Content-Type: application/json
```

```json
{
  "email": "customer@example.com",
  "password": "newPassword123"
}
```

A normal user must verify the security PIN before changing the password.

</details>

<details>
<summary><strong>Admin configurations: list, sort, filter, edit, and change status</strong></summary>

All routes in this section require an administrator session.

### List configurations

```http
GET /api/admin/configurations
Authorization: Bearer <admin-sessionID>
```

Supported query parameters:

| Parameter | Values | Default |
| --- | --- | --- |
| `sortBy` | `createdAt`, `updatedAt` | `createdAt` |
| `sortOrder` | `asc`, `desc` | `asc` |
| `dateField` | `createdAt`, `updatedAt` | `createdAt` |
| `dateFilter` | `all`, `today`, `lastDay`, `thisWeek`, `custom` | `all` |
| `startDate` | `YYYY-MM-DD` | Required for `custom` |
| `endDate` | `YYYY-MM-DD` | Required for `custom` |
| `status` | `all`, `requested`, `pending`, `done`, or comma-separated values | `all` |

Examples:

```http
GET /api/admin/configurations?status=pending&sortBy=updatedAt&sortOrder=desc
GET /api/admin/configurations?dateFilter=today&dateField=createdAt
GET /api/admin/configurations?dateFilter=thisWeek&status=requested,pending
GET /api/admin/configurations?dateFilter=custom&startDate=2026-07-01&endDate=2026-07-31
```

Response:

```json
{
  "summary": {
    "total": 1,
    "requested": 0,
    "pending": 1,
    "done": 0
  },
  "query": {
    "sortBy": "updatedAt",
    "sortOrder": "desc",
    "dateField": "createdAt",
    "dateFilter": "all",
    "startDate": null,
    "endDate": null,
    "status": ["pending"]
  },
  "data": [
    {
      "_id": "configuration-id",
      "configurationName": "Factory conveyor",
      "orderStatus": "Pending",
      "status": "pending",
      "dateOrdered": "2026-07-20T10:00:00.000Z",
      "completeDate": null,
      "createdAt": "2026-07-20T10:00:00.000Z",
      "updatedAt": "2026-07-22T12:00:00.000Z",
      "createdBy": {
        "userID": "user-id",
        "username": "customer@example.com",
        "firstName": "Example",
        "lastName": "Customer",
        "role": "user"
      },
      "updatedBy": {
        "userID": "admin-id",
        "username": "admin@example.com",
        "firstName": "Admin",
        "lastName": "User",
        "role": "admin"
      },
      "cart": []
    }
  ]
}
```

Summary counts describe the filtered result set.

### Edit configuration content

```http
PATCH /api/admin/configurations/:configurationId
Authorization: Bearer <admin-sessionID>
Content-Type: application/json
```

```json
{
  "configurationName": "Updated configuration name",
  "cart": []
}
```

Only `configurationName` and `cart` are editable through this route. Status and server-owned dates are preserved.

### Change configuration status

```http
PATCH /api/admin/configurations/:configurationId/status
Authorization: Bearer <admin-sessionID>
Content-Type: application/json
```

```json
{
  "status": "pending"
}
```

Allowed values are `requested`, `pending`, and `done`. Setting `done` records completion timestamps.

</details>

<details>
<summary><strong>Admin users: list, sort, filter, role, and password</strong></summary>

All routes in this section require an administrator session.

### List users

```http
GET /api/admin/users
Authorization: Bearer <admin-sessionID>
```

The user API supports the same `sortBy`, `sortOrder`, `dateField`, `dateFilter`, `startDate`, and `endDate` parameters as the configuration API. It does not use the configuration `status` parameter.

```http
GET /api/admin/users?sortBy=createdAt&sortOrder=desc
GET /api/admin/users?dateField=updatedAt&dateFilter=thisWeek
GET /api/admin/users?dateFilter=custom&startDate=2026-07-01&endDate=2026-07-31
```

```json
{
  "count": 1,
  "query": {
    "sortBy": "createdAt",
    "sortOrder": "desc",
    "dateField": "createdAt",
    "dateFilter": "all",
    "startDate": null,
    "endDate": null
  },
  "data": [
    {
      "_id": "mongodb-user-id",
      "userID": "user-uuid",
      "username": "customer@example.com",
      "role": "user",
      "firstName": "Example",
      "lastName": "Customer",
      "email": "customer@example.com",
      "phoneNumber": "9876543210",
      "companyName": "Example Company",
      "country": "USA",
      "createdAt": "2026-07-20T10:00:00.000Z",
      "updatedAt": "2026-07-22T12:00:00.000Z"
    }
  ]
}
```

Passwords, security PINs, reset codes, and sessions are never returned.

### Change role

```http
PATCH /api/admin/users/:userId/role
Authorization: Bearer <admin-sessionID>
Content-Type: application/json
```

```json
{
  "role": "admin"
}
```

An administrator cannot remove their own admin role.

### Reset password

```http
PATCH /api/admin/users/:userId/password
Authorization: Bearer <admin-sessionID>
Content-Type: application/json
```

```json
{
  "password": "newPassword123"
}
```

`newPassword` is accepted as an alias. The password must contain 8–50 characters. All sessions for the affected account are revoked after reset.

</details>

<details>
<summary><strong>Cart APIs</strong></summary>

All cart routes require a valid session.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/cart` | List summarized cart orders |
| `PUT` | `/api/cart` | Restore a saved draft into the cart |
| `PUT` | `/api/cart/order` | Update a cart order |
| `GET` | `/api/cart/order` | Get decoded order details; send `orderid` header |
| `DELETE` | `/api/cart/order` | Delete an order; send `orderID` in the body |

</details>

<details>
<summary><strong>Draft and submitted-configuration APIs</strong></summary>

All routes require a valid session.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/drafts` | List the current user's drafts |
| `PUT` | `/api/drafts` | Save the current cart as a draft |
| `DELETE` | `/api/drafts` | Delete a draft |
| `GET` | `/api/configurations` | List the current user's submitted configurations |
| `PUT` | `/api/configurations` | Submit the current cart as a named configuration |
| `DELETE` | `/api/configurations/:configId` | Delete a configuration |

New submitted configurations record audit timestamps and actor information.

</details>

<details>
<summary><strong>Order, RFQ, and email APIs</strong></summary>

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `PUT` | `/api/orders/editing` | Authenticated | Edit an order inside a submitted configuration |
| `PUT` | `/api/orders/status` | Admin | Legacy configuration-status update |
| `PUT` | `/api/orders/complete-cart-order` | Authenticated | Mark a cart order complete |
| `GET` | `/api/orders/completion-status/:orderID` | Authenticated | Read completion status |
| `PUT` | `/api/rfq/add-to-cart` | Authenticated | Assign the next RFQ order ID in cart |
| `PUT` | `/api/rfq/add-to-configurations` | Authenticated | Assign the next RFQ order ID in configurations |
| `POST` | `/api/email/send-email` | Authenticated | Email the latest configuration |

</details>

<details>
<summary><strong>Product configurator APIs</strong></summary>

Each active product route accepts `POST /api/<product>` with a valid session, validates/builds the product configuration, and adds it to the current user's cart.

```text
/api/fglm
/api/fgco
/api/cc5_cl
/api/cc5_op40e
/api/coe_cdl
/api/coe_cel
/api/coe_op4oe
/api/eti_807
/api/eti_9000invl
/api/eti_91
/api/eti_op48e
/api/eto_2100
/api/eto_9000e
/api/eto_op48e
/api/fc_314
/api/fc_317
/api/fro_314
/api/fro_317
/api/fro_es
/api/fro_oeb
/api/fro_op139a
/api/ft_ftl
/api/ft_op40e
/api/ft_opco
```

Payload fields depend on the selected product model.

</details>

<details>
<summary><strong>Legacy dashboard APIs</strong></summary>

These routes remain available for compatibility but new admin frontend code should use `/api/admin/configurations` and `/api/admin/users`.

| Method | Endpoint | Access |
| --- | --- | --- |
| `GET` | `/api/user_orders` | Public health text |
| `GET` | `/api/user_orders/allCarts` | Admin |
| `GET` | `/api/user_orders/admin/userRaw` | Admin |

Sensitive authentication fields are excluded from legacy user responses.

</details>

## Common errors

```json
{
  "error": "Unauthorized: Missing token",
  "message": "Session is missing, invalid, or expired"
}
```

| HTTP status | Meaning |
| --- | --- |
| `400` | Invalid or missing request data |
| `401` | Session is missing, invalid, or expired |
| `403` | Administrator access is required |
| `404` | Resource or route not found |
| `500` | Internal server error |

## Upgrading from 1.0.0

1. Configure production database/server environment variables.
2. Backfill existing users with the default role:

```javascript
db.users.updateMany(
  { role: { $exists: false } },
  { $set: { role: "user" } }
)
```

3. Promote the first administrator:

```javascript
db.users.updateOne(
  { username: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

4. Use `POST /api/sessions` for both user and administrator login.
5. Send the returned bearer token to all protected APIs.

## Security notes

- Do not commit `.env` or `config/.env`.
- Do not return password hashes, security PINs, reset codes, or session IDs in user-list APIs.
- Administrator password resets revoke the affected user's sessions.
- Production dashboard APIs must always use HTTPS.
