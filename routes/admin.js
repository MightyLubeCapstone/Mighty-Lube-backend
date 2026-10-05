// const express = require("express");
// const mongoose = require("mongoose");

// const User = require("../models/user");

// const ProductConfiguration = require("../models/product_configuration");

// const {
//   getSignedFileUrl,
// } = require("../Services/object_storage_service");

// const {
//   authenticate,
//   requireAdmin,
//   hashPassword,
// } = require("./sessions");


// const router = express.Router();


// // =========================================================
// // CONFIGURATION ACTOR
// // =========================================================

// function configurationActor(user) {
//   return {
//     userID: user.userID,
//     username: user.username,
//     firstName: user.firstName || "",
//     lastName: user.lastName || "",
//     role: user.role || "user",
//   };
// }


// // =========================================================
// // DATE HELPERS
// // =========================================================

// function startOfDay(date) {
//   const result = new Date(date);

//   result.setHours(
//     0,
//     0,
//     0,
//     0
//   );

//   return result;
// }


// function endOfDay(date) {
//   const result = new Date(date);

//   result.setHours(
//     23,
//     59,
//     59,
//     999
//   );

//   return result;
// }


// function parseDateInput(
//   value,
//   useEndOfDay = false
// ) {
//   if (!value) {
//     return null;
//   }


//   const dateOnly =
//     /^\d{4}-\d{2}-\d{2}$/.test(
//       value
//     );


//   const parsed =
//     new Date(
//       dateOnly
//         ? `${value}T00:00:00`
//         : value
//     );


//   if (
//     Number.isNaN(
//       parsed.getTime()
//     )
//   ) {
//     const error =
//       new Error(
//         `Invalid date: ${value}`
//       );

//     error.status = 400;

//     throw error;
//   }


//   return (
//     dateOnly &&
//     useEndOfDay
//   )
//     ? endOfDay(parsed)
//     : parsed;
// }


// // =========================================================
// // LIST QUERY
// //
// // Used by both:
// //
// // GET /api/admin/configurations
// // GET /api/admin/users
// // =========================================================

// function getListQuery(query) {
//   const sortBy =
//     query.sortBy ||
//     "createdAt";


//   const sortOrder =
//     String(
//       query.sortOrder ||
//       "asc"
//     ).toLowerCase();


//   const dateField =
//     query.dateField ||
//     "createdAt";


//   const requestedDateFilter =
//     String(
//       query.dateFilter ||
//       (
//         query.startDate ||
//         query.endDate
//           ? "custom"
//           : "all"
//       )
//     ).toLowerCase();


//   const dateFilterAliases = {
//     all: "all",
//     today: "today",
//     lastday: "lastDay",
//     yesterday: "lastDay",
//     thisweek: "thisWeek",
//     custom: "custom",
//   };


//   const dateFilter =
//     dateFilterAliases[
//       requestedDateFilter
//     ];


//   if (
//     ![
//       "createdAt",
//       "updatedAt",
//     ].includes(sortBy)
//   ) {
//     const error =
//       new Error(
//         "sortBy must be createdAt or updatedAt"
//       );

//     error.status = 400;

//     throw error;
//   }


//   if (
//     ![
//       "asc",
//       "desc",
//     ].includes(sortOrder)
//   ) {
//     const error =
//       new Error(
//         "sortOrder must be asc or desc"
//       );

//     error.status = 400;

//     throw error;
//   }


//   if (
//     ![
//       "createdAt",
//       "updatedAt",
//     ].includes(dateField)
//   ) {
//     const error =
//       new Error(
//         "dateField must be createdAt or updatedAt"
//       );

//     error.status = 400;

//     throw error;
//   }


//   if (!dateFilter) {
//     const error =
//       new Error(
//         "dateFilter must be all, today, lastDay, thisWeek, or custom"
//       );

//     error.status = 400;

//     throw error;
//   }


//   let startDate = null;
//   let endDate = null;

//   const now =
//     new Date();


//   // =======================================================
//   // TODAY
//   // =======================================================

//   if (
//     dateFilter ===
//     "today"
//   ) {
//     startDate =
//       startOfDay(now);

//     endDate =
//       endOfDay(now);
//   }


//   // =======================================================
//   // YESTERDAY
//   // =======================================================

//   else if (
//     dateFilter ===
//     "lastDay"
//   ) {
//     const yesterday =
//       new Date(now);

//     yesterday.setDate(
//       yesterday.getDate() - 1
//     );


//     startDate =
//       startOfDay(
//         yesterday
//       );

//     endDate =
//       endOfDay(
//         yesterday
//       );
//   }


//   // =======================================================
//   // THIS WEEK
//   // =======================================================

//   else if (
//     dateFilter ===
//     "thisWeek"
//   ) {
//     const mondayOffset =
//       (
//         now.getDay() + 6
//       ) % 7;


//     startDate =
//       startOfDay(now);


//     startDate.setDate(
//       startDate.getDate() -
//       mondayOffset
//     );


//     endDate =
//       endOfDay(now);
//   }


//   // =======================================================
//   // CUSTOM
//   // =======================================================

//   else if (
//     dateFilter ===
//     "custom"
//   ) {
//     if (
//       !query.startDate ||
//       !query.endDate
//     ) {
//       const error =
//         new Error(
//           "startDate and endDate are required for a custom date filter"
//         );

//       error.status = 400;

//       throw error;
//     }


//     startDate =
//       parseDateInput(
//         query.startDate
//       );


//     endDate =
//       parseDateInput(
//         query.endDate,
//         true
//       );


//     if (
//       startDate >
//       endDate
//     ) {
//       const error =
//         new Error(
//           "startDate cannot be after endDate"
//         );

//       error.status = 400;

//       throw error;
//     }
//   }


//   return {
//     sortBy,
//     sortOrder,
//     dateField,
//     dateFilter,
//     startDate,
//     endDate,
//   };
// }


// // =========================================================
// // FILTER AND SORT
// //
// // Mainly kept for user list.
// // =========================================================

// function filterAndSort(
//   items,
//   listQuery
// ) {
//   const {
//     sortBy,
//     sortOrder,
//     dateField,
//     startDate,
//     endDate,
//   } = listQuery;


//   const filtered =
//     startDate &&
//     endDate
//       ? items.filter(
//           (item) => {
//             const value =
//               new Date(
//                 item[
//                   dateField
//                 ]
//               );


//             return (
//               !Number.isNaN(
//                 value.getTime()
//               ) &&
//               value >= startDate &&
//               value <= endDate
//             );
//           }
//         )
//       : items;


//   const direction =
//     sortOrder === "asc"
//       ? 1
//       : -1;


//   return filtered.sort(
//     (a, b) => {
//       const difference =
//         new Date(
//           a[sortBy]
//         ) -
//         new Date(
//           b[sortBy]
//         );


//       if (
//         difference !== 0
//       ) {
//         return (
//           difference *
//           direction
//         );
//       }


//       return String(
//         a._id
//       ).localeCompare(
//         String(
//           b._id
//         )
//       ) * direction;
//     }
//   );
// }


// // =========================================================
// // SERIALIZE QUERY
// // =========================================================

// function serializeListQuery(
//   listQuery
// ) {
//   return {
//     sortBy:
//       listQuery.sortBy,

//     sortOrder:
//       listQuery.sortOrder,

//     dateField:
//       listQuery.dateField,

//     dateFilter:
//       listQuery.dateFilter,

//     startDate:
//       listQuery.startDate
//         ? listQuery.startDate.toISOString()
//         : null,

//     endDate:
//       listQuery.endDate
//         ? listQuery.endDate.toISOString()
//         : null,
//   };
// }


// // =========================================================
// // ADMIN CONFIGURATION STATUS FILTER
// //
// // IMPORTANT:
// //
// // ProductConfiguration has TWO separate workflow states:
// //
// // USER STATUS:
// //
// // draft
// // cart
// // submitted
// //
// // ADMIN STATUS:
// //
// // requested
// // pending
// // done
// //
// // This filter is for ADMIN STATUS only.
// //
// // For backward compatibility with the current Flutter
// // AdminListFilters implementation, both:
// //
// // ?status=requested
// //
// // and:
// //
// // ?adminStatus=requested
// //
// // are accepted.
// // =========================================================

// function getStatusFilter(query) {
//   const rawStatus =
//     query.adminStatus ||
//     query.status ||
//     query.statuses ||
//     "all";


//   const statuses =
//     String(rawStatus)
//       .split(",")
//       .map(
//         (status) =>
//           status
//             .trim()
//             .toLowerCase()
//       )
//       .filter(Boolean);


//   if (
//     statuses.length === 0 ||
//     statuses.includes(
//       "all"
//     )
//   ) {
//     return [];
//   }


//   const allowedStatuses = [
//     "requested",
//     "pending",
//     "done",
//   ];


//   const invalidStatuses =
//     statuses.filter(
//       (status) =>
//         !allowedStatuses.includes(
//           status
//         )
//     );


//   if (
//     invalidStatuses.length > 0
//   ) {
//     const error =
//       new Error(
//         "status must be requested, pending, done, all, or a comma-separated combination"
//       );

//     error.status = 400;

//     throw error;
//   }


//   return [
//     ...new Set(
//       statuses
//     ),
//   ];
// }


// // =========================================================
// // ALL ADMIN ROUTES REQUIRE:
// //
// // 1. Valid login session
// // 2. Admin role
// // =========================================================

// router.use(
//   authenticate,
//   requireAdmin
// );


// // =========================================================
// // GET /api/admin/configurations
// //
// // ADMIN:
// //
// // Can see configurations belonging to ALL USERS.
// //
// // IMPORTANT:
// //
// // Only configurations submitted by users enter the
// // administrator workflow.
// //
// // User workflow:
// //
// // draft -> cart -> submitted
// //
// // Admin workflow:
// //
// // requested -> pending -> done
// //
// // Data comes directly from:
// //
// // product_configurations
// //
// // Examples:
// //
// // /api/admin/configurations
// //
// // /api/admin/configurations?status=requested
// //
// // /api/admin/configurations?status=pending
// //
// // /api/admin/configurations?status=requested,pending
// //
// // /api/admin/configurations?adminStatus=done
// //
// // /api/admin/configurations?dateFilter=today
// // =========================================================

// router.get(
//   "/configurations",
//   async (req, res) => {
//     try {
//       const listQuery =
//         getListQuery(
//           req.query
//         );


//       const statusFilter =
//         getStatusFilter(
//           req.query
//         );


//       // ===================================================
//       // BUILD MONGODB QUERY
//       //
//       // Admin queue contains ONLY configurations already
//       // submitted by a user.
//       // ===================================================

//       const mongoQuery = {
//         status:
//           "submitted",
//       };


//       // Admin status filter
//       if (
//         statusFilter.length > 0
//       ) {
//         mongoQuery.adminStatus = {
//           $in:
//             statusFilter,
//         };
//       }


//       // Date filter
//       if (
//         listQuery.startDate &&
//         listQuery.endDate
//       ) {
//         mongoQuery[
//           listQuery.dateField
//         ] = {
//           $gte:
//             listQuery.startDate,

//           $lte:
//             listQuery.endDate,
//         };
//       }


//       // ===================================================
//       // SORT
//       // ===================================================

//       const sortDirection =
//         listQuery.sortOrder ===
//         "asc"
//           ? 1
//           : -1;


//       const configurations =
//         await ProductConfiguration
//           .find(
//             mongoQuery
//           )
//           .sort({
//             [listQuery.sortBy]:
//               sortDirection,
//           })
//           .lean();


//       // ===================================================
//       // SUMMARY
//       //
//       // Summary now represents ADMIN WORKFLOW.
//       //
//       // requested:
//       // Newly submitted by user.
//       //
//       // pending:
//       // Admin/business team is processing it.
//       //
//       // done:
//       // Admin/business processing completed.
//       // ===================================================

//       const summary = {
//         total:
//           configurations.length,

//         requested: 0,

//         pending: 0,

//         done: 0,
//       };


//       configurations.forEach(
//         (configuration) => {
//           const adminStatus =
//             configuration.adminStatus ||
//             "requested";


//           if (
//             summary[
//               adminStatus
//             ] !== undefined
//           ) {
//             summary[
//               adminStatus
//             ] += 1;
//           }
//         }
//       );


//       // ===================================================
//       // RESPONSE
//       // ===================================================

//       return res
//         .status(200)
//         .json({
//           summary,

//           query: {
//             ...serializeListQuery(
//               listQuery
//             ),

//             status:
//               statusFilter.length > 0
//                 ? statusFilter
//                 : ["all"],
//           },

//           data:
//             configurations.map(
//               (
//                 configuration
//               ) => ({
//                 configurationID:
//                   configuration.configurationID,

//                 userID:
//                   configuration.userID,

//                 configurationName:
//                   configuration.configurationName,

//                 productType:
//                   configuration.productType,

//                 productName:
//                   configuration.productName,

//                 status:
//                   configuration.status,

//                 adminStatus:
//                   configuration.adminStatus ||
//                   "requested",

//                 isComplete:
//                   configuration.isComplete,

//                 numRequested:
//                   configuration.numRequested,

//                 configurationData:
//                   configuration.configurationData,

//                 draftID:
//                   configuration.draftID,

//                 draftTitle:
//                   configuration.draftTitle,

//                 createdBy:
//                   configuration.createdBy,

//                 updatedBy:
//                   configuration.updatedBy,

//                 submittedAt:
//                   configuration.submittedAt,

//                 completedAt:
//                   configuration.completedAt,

//                 adminRequestedAt:
//                   configuration.adminRequestedAt,

//                 adminStartedAt:
//                   configuration.adminStartedAt,

//                 adminCompletedAt:
//                   configuration.adminCompletedAt,

//                 createdAt:
//                   configuration.createdAt,

//                 updatedAt:
//                   configuration.updatedAt,
//               })
//             ),
//         });

//     } catch (error) {
//       console.error(
//         "Failed to fetch admin configurations:",
//         error
//       );


//       if (
//         error.status === 400
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               error.message,
//           });
//       }


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to fetch configurations",
//         });
//     }
//   }
// );


// // =========================================================
// // GET /api/admin/configurations/:configurationID
// //
// // Admin can fetch ANY user's complete configuration.
// // =========================================================

// router.get(
//   "/configurations/:configurationID",
//   async (req, res) => {
//     try {
//       const {
//         configurationID,
//       } = req.params;


//       const configuration =
//         await ProductConfiguration.findOne({
//           configurationID,
//         });


//       if (
//         !configuration
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "Configuration not found",
//           });
//       }


//       return res
//         .status(200)
//         .json({
//           configuration,
//         });

//     } catch (error) {
//       console.error(
//         "Failed to fetch configuration:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to fetch configuration",
//         });
//     }
//   }
// );


// // =========================================================
// // POST /api/admin/configurations/:configurationID/image-url
// //
// // ADMIN ONLY
// //
// // Generates a temporary signed URL for an image stored
// // inside a ProductConfiguration.
// //
// // REQUEST BODY:
// //
// // {
// //   "imageKey": "someFieldImage"
// // }
// //
// // IMPORTANT:
// //
// // Frontend does NOT send objectKey directly.
// //
// // Backend:
// //
// // 1. Finds configuration by configurationID.
// // 2. Reads configurationData[imageKey].
// // 3. Gets the stored objectKey.
// // 4. Verifies that the object belongs to the same user.
// // 5. Generates a temporary signed URL.
// //
// // Object Storage remains private.
// //
// // Signed URL expiry:
// // 3600 seconds = 1 hour.
// // =========================================================

// router.post(
//   "/configurations/:configurationID/image-url",
//   async (req, res) => {
//     try {
//       const {
//         configurationID,
//       } = req.params;

//       const {
//         imageKey,
//       } = req.body || {};

//       // ===================================================
//       // VALIDATE IMAGE KEY
//       // ===================================================

//       if (
//         typeof imageKey !== "string" ||
//         !imageKey.trim()
//       ) {
//         return res
//           .status(400)
//           .json({
//             success: false,
//             message:
//               "imageKey is required",
//           });
//       }

//       const normalizedImageKey =
//         imageKey.trim();

//       // ===================================================
//       // FIND CONFIGURATION
//       // ===================================================

//       const configuration =
//         await ProductConfiguration
//           .findOne({
//             configurationID,
//           })
//           .lean();

//       if (!configuration) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Configuration not found",
//           });
//       }

//       // ===================================================
//       // VALIDATE CONFIGURATION DATA
//       // ===================================================

//       const configurationData =
//         configuration.configurationData;

//       if (
//         !configurationData ||
//         typeof configurationData !==
//           "object" ||
//         Array.isArray(
//           configurationData
//         )
//       ) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Configuration data not found",
//           });
//       }

//       // ===================================================
//       // FIND IMAGE METADATA
//       //
//       // Example:
//       //
//       // configurationData = {
//       //   someFieldImage: {
//       //     objectKey:
//       //       "product-configurations/USER123/abc.jpg",
//       //     originalName:
//       //       "factory.jpg",
//       //     contentType:
//       //       "image/jpeg",
//       //     size:
//       //       123456
//       //   }
//       // }
//       // ===================================================

//       const imageData =
//         configurationData[
//           normalizedImageKey
//         ];

//       if (
//         !imageData ||
//         typeof imageData !==
//           "object" ||
//         Array.isArray(imageData)
//       ) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Image not found in configuration",
//           });
//       }

//       // ===================================================
//       // VALIDATE OBJECT KEY
//       // ===================================================

//       const objectKey =
//         imageData.objectKey;

//       if (
//         typeof objectKey !== "string" ||
//         !objectKey.trim()
//       ) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Image object key not found",
//           });
//       }

//       const normalizedObjectKey =
//         objectKey.trim();

//       // ===================================================
//       // VERIFY IMAGE OWNERSHIP
//       //
//       // Upload route stores files using:
//       //
//       // product-configurations/{userID}/{uuid}.extension
//       //
//       // Therefore the object referenced by this
//       // configuration must belong to the same user.
//       // ===================================================

//       if (
//         !configuration.userID ||
//         typeof configuration.userID !==
//           "string"
//       ) {
//         return res
//           .status(500)
//           .json({
//             success: false,
//             message:
//               "Configuration user information is invalid",
//           });
//       }

//       const expectedPrefix =`product-configurations/${configuration.userID}-${configuration.productType}/`;

//       if (
//         !normalizedObjectKey.startsWith(
//           expectedPrefix
//         )
//       ) {
//         return res
//           .status(403)
//           .json({
//             success: false,
//             message:
//               "Image does not belong to this configuration",
//           });
//       }

//       // ===================================================
//       // GENERATE TEMPORARY SIGNED URL
//       // ===================================================

//       const expiresIn =
//         3600;

//       const signedUrl =
//         await getSignedFileUrl(
//           normalizedObjectKey,
//           expiresIn
//         );

//       // ===================================================
//       // RESPONSE
//       // ===================================================

//       return res
//         .status(200)
//         .json({
//           success: true,

//           file: {
//             objectKey:
//               normalizedObjectKey,

//             originalName:
//               typeof imageData.originalName ===
//               "string"
//                 ? imageData.originalName
//                 : "",

//             contentType:
//               typeof imageData.contentType ===
//               "string"
//                 ? imageData.contentType
//                 : "",

//             size:
//               typeof imageData.size ===
//               "number"
//                 ? imageData.size
//                 : 0,

//             url:
//               signedUrl,

//             expiresIn,
//           },
//         });
//     } catch (error) {
//       console.error(
//         "Failed to generate admin image signed URL:",
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           success: false,
//           message:
//             "Failed to generate image URL",
//         });
//     }
//   }
// );

// // =========================================================
// // PATCH /api/admin/configurations/:configurationID
// //
// // Admin can edit configuration content.
// //
// // Allowed here:
// //
// // configurationName
// // configurationData
// // numRequested
// // isComplete
// //
// // User status and admin status are intentionally NOT
// // changed here.
// //
// // There is a separate admin workflow status API below.
// // =========================================================

// router.patch(
//   "/configurations/:configurationID",
//   async (req, res) => {
//     try {
//       const {
//         configurationID,
//       } = req.params;


//       const {
//         configurationName,
//         configurationData,
//         numRequested,
//         isComplete,
//       } = req.body;


//       // ===================================================
//       // AT LEAST ONE FIELD REQUIRED
//       // ===================================================

//       if (
//         configurationName === undefined &&
//         configurationData === undefined &&
//         numRequested === undefined &&
//         isComplete === undefined
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Provide at least one field to update",
//           });
//       }


//       // ===================================================
//       // VALIDATE configurationName
//       // ===================================================

//       if (
//         configurationName !== undefined &&
//         (
//           typeof configurationName !==
//             "string" ||
//           !configurationName.trim()
//         )
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "configurationName must be a non-empty string",
//           });
//       }


//       // ===================================================
//       // VALIDATE configurationData
//       // ===================================================

//       if (
//         configurationData !== undefined &&
//         (
//           typeof configurationData !==
//             "object" ||
//           configurationData ===
//             null ||
//           Array.isArray(
//             configurationData
//           )
//         )
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "configurationData must be an object",
//           });
//       }


//       // ===================================================
//       // VALIDATE QUANTITY
//       // ===================================================

//       if (
//         numRequested !== undefined
//       ) {
//         const quantity =
//           Number(
//             numRequested
//           );


//         if (
//           Number.isNaN(
//             quantity
//           ) ||
//           quantity < 1
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "numRequested must be at least 1",
//             });
//         }
//       }


//       // ===================================================
//       // VALIDATE isComplete
//       // ===================================================

//       if (
//         isComplete !== undefined &&
//         typeof isComplete !==
//           "boolean"
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "isComplete must be boolean",
//           });
//       }


//       // ===================================================
//       // FIND CONFIGURATION
//       // ===================================================

//       const configuration =
//         await ProductConfiguration.findOne({
//           configurationID,
//         });


//       if (
//         !configuration
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "Configuration not found",
//           });
//       }


//       // ===================================================
//       // APPLY UPDATES
//       // ===================================================

//       if (
//         configurationName !==
//         undefined
//       ) {
//         configuration.configurationName =
//           configurationName.trim();
//       }


//       if (
//         configurationData !==
//         undefined
//       ) {
//         configuration.configurationData = {
//           ...configuration.configurationData,
//           ...configurationData,
//         };


//         configuration.markModified(
//           "configurationData"
//         );
//       }


//       if (
//         numRequested !==
//         undefined
//       ) {
//         configuration.numRequested =
//           Number(
//             numRequested
//           );
//       }


//       if (
//         isComplete !==
//         undefined
//       ) {
//         configuration.isComplete =
//           isComplete;
//       }


//       configuration.updatedBy =
//         configurationActor(
//           req.user
//         );


//       await configuration.save();


//       return res
//         .status(200)
//         .json({
//           message:
//             "Configuration updated",

//           configuration,
//         });

//     } catch (error) {
//       console.error(
//         "Failed to update configuration:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to update configuration",
//         });
//     }
//   }
// );


// // =========================================================
// // PATCH /api/admin/configurations/:configurationID/status
// //
// // ADMIN WORKFLOW STATUS
// //
// // IMPORTANT:
// //
// // This endpoint does NOT change:
// //
// // configuration.status
// //
// // User status stays:
// //
// // submitted
// //
// // This endpoint changes:
// //
// // configuration.adminStatus
// //
// // Allowed:
// //
// // requested
// // pending
// // done
// //
// // Example:
// //
// // {
// //   "status": "pending"
// // }
// //
// // Lifecycle:
// //
// // submitted + requested
// //          ↓
// // submitted + pending
// //          ↓
// // submitted + done
// //
// // Endpoint name "/status" is retained for backward
// // compatibility with the existing Flutter AdminApiService.
// // =========================================================

// router.patch(
//   "/configurations/:configurationID/status",
//   async (req, res) => {
//     try {
//       const {
//         configurationID,
//       } = req.params;


//       const requestedStatus =
//         String(
//           req.body.status ||
//           req.body.adminStatus ||
//           ""
//         )
//           .trim()
//           .toLowerCase();


//       const allowedStatuses = [
//         "requested",
//         "pending",
//         "done",
//       ];


//       if (
//         !allowedStatuses.includes(
//           requestedStatus
//         )
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Admin status must be requested, pending, or done",
//           });
//       }


//       const configuration =
//         await ProductConfiguration.findOne({
//           configurationID,
//         });


//       if (
//         !configuration
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "Configuration not found",
//           });
//       }


//       // ===================================================
//       // ADMIN WORKFLOW STARTS ONLY AFTER USER SUBMISSION
//       // ===================================================

//       if (
//         configuration.status !==
//         "submitted"
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Only submitted configurations can enter the admin workflow",
//           });
//       }


//       const now =
//         new Date();


//       // ===================================================
//       // UPDATE ADMIN STATUS
//       //
//       // IMPORTANT:
//       //
//       // DO NOT change:
//       //
//       // configuration.status
//       //
//       // It remains "submitted".
//       // ===================================================

//       configuration.adminStatus =
//         requestedStatus;


//       // ===================================================
//       // REQUESTED TIMESTAMP
//       // ===================================================

//       if (
//         requestedStatus ===
//         "requested"
//       ) {
//         configuration.adminRequestedAt =
//           configuration.adminRequestedAt ||
//           now;

//         configuration.adminStartedAt =
//           null;

//         configuration.adminCompletedAt =
//           null;
//       }


//       // ===================================================
//       // PENDING TIMESTAMP
//       // ===================================================

//       if (
//         requestedStatus ===
//         "pending"
//       ) {
//         configuration.adminRequestedAt =
//           configuration.adminRequestedAt ||
//           configuration.submittedAt ||
//           now;

//         configuration.adminStartedAt = now;

//         configuration.adminCompletedAt =
//           null;
//       }


//       // ===================================================
//       // DONE TIMESTAMP
//       // ===================================================

//       if (
//         requestedStatus ===
//         "done"
//       ) {
//         configuration.adminRequestedAt =
//           configuration.adminRequestedAt ||
//           configuration.submittedAt ||
//           now;

//        configuration.adminCompletedAt = now;
//       }


//       configuration.updatedBy =
//         configurationActor(
//           req.user
//         );


//       await configuration.save();


//       return res
//         .status(200)
//         .json({
//           message:
//             "Admin configuration status updated",

//           configuration,
//         });

//     } catch (error) {
//       console.error(
//         "Failed to update admin configuration status:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to update admin configuration status",
//         });
//     }
//   }
// );


// // =========================================================
// // DELETE /api/admin/configurations/:configurationID
// //
// // ADMIN ONLY
// //
// // Admin can hard-delete ANY user's configuration.
// // =========================================================

// router.delete(
//   "/configurations/:configurationID",
//   async (req, res) => {
//     try {
//       const {
//         configurationID,
//       } = req.params;


//       const deletedConfiguration =
//         await ProductConfiguration.findOneAndDelete({
//           configurationID,
//         });


//       if (
//         !deletedConfiguration
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "Configuration not found",
//           });
//       }


//       return res
//         .status(200)
//         .json({
//           message:
//             "Configuration deleted successfully",

//           configurationID:
//             deletedConfiguration.configurationID,
//         });

//     } catch (error) {
//       console.error(
//         "Failed to delete configuration:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to delete configuration",
//         });
//     }
//   }
// );


// // =========================================================
// // GET /api/admin/users
// //
// // UNCHANGED USER ADMIN LOGIC.
// //
// // Authentication secrets are intentionally never returned.
// // =========================================================

// router.get(
//   "/users",
//   async (req, res) => {
//     try {
//       const listQuery =
//         getListQuery(
//           req.query
//         );


//       const storedUsers =
//         await User.find({})
//           .select(
//             "userID username role firstName lastName email phoneNumber companyName country createdAt updatedAt"
//           )
//           .lean();


//       const normalizedUsers =
//         storedUsers.map(
//           (user) => {
//             const fallbackCreatedAt =
//               user._id.getTimestamp();


//             return {
//               ...user,

//               createdAt:
//                 user.createdAt ||
//                 fallbackCreatedAt,

//               updatedAt:
//                 user.updatedAt ||
//                 user.createdAt ||
//                 fallbackCreatedAt,
//             };
//           }
//         );


//       const users =
//         filterAndSort(
//           normalizedUsers,
//           listQuery
//         );


//       return res
//         .status(200)
//         .json({
//           count:
//             users.length,

//           query:
//             serializeListQuery(
//               listQuery
//             ),

//           data:
//             users,
//         });

//     } catch (error) {
//       console.error(
//         "Failed to fetch admin users:",
//         error
//       );


//       if (
//         error.status === 400
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               error.message,
//           });
//       }


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to fetch users",
//         });
//     }
//   }
// );


// // =========================================================
// // PATCH /api/admin/users/:userId/password
// //
// // UNCHANGED USER ADMIN LOGIC.
// //
// // Admin can reset any user's password.
// // =========================================================

// router.patch(
//   "/users/:userId/password",
//   async (req, res) => {
//     try {
//       const {
//         userId,
//       } = req.params;


//       const password =
//         req.body.password ||
//         req.body.newPassword;


//       if (!password) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "New password is required",
//           });
//       }


//       if (
//         typeof password !==
//           "string" ||
//         password.length < 8 ||
//         password.length > 50
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Password must be between 8 and 50 characters",
//           });
//       }


//       const identifiers = [
//         {
//           userID:
//             userId,
//         },
//       ];


//       if (
//         mongoose.isValidObjectId(
//           userId
//         )
//       ) {
//         identifiers.push({
//           _id:
//             userId,
//         });
//       }


//       const targetUser =
//         await User.findOne({
//           $or:
//             identifiers,
//         });


//       if (
//         !targetUser
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "User not found",
//           });
//       }


//       targetUser.password =
//         await hashPassword(
//           password
//         );


//       targetUser.resetCode =
//         null;


//       // Password reset invalidates sessions.
//       targetUser.sessions =
//         [];


//       await targetUser.save();


//       return res
//         .status(200)
//         .json({
//           message:
//             "Password reset successfully",

//           user: {
//             userID:
//               targetUser.userID,

//             username:
//               targetUser.username,

//             role:
//               targetUser.role,
//           },
//         });

//     } catch (error) {
//       console.error(
//         "Failed to reset user password:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to reset user password",
//         });
//     }
//   }
// );


// // =========================================================
// // PATCH /api/admin/users/:userId/role
// //
// // UNCHANGED USER ADMIN LOGIC.
// // =========================================================

// router.patch(
//   "/users/:userId/role",
//   async (req, res) => {
//     try {
//       const {
//         userId,
//       } = req.params;


//       const {
//         role,
//       } = req.body;


//       if (
//         ![
//           "user",
//           "admin",
//         ].includes(role)
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Role must be either user or admin",
//           });
//       }


//       const identifiers = [
//         {
//           userID:
//             userId,
//         },
//       ];


//       if (
//         mongoose.isValidObjectId(
//           userId
//         )
//       ) {
//         identifiers.push({
//           _id:
//             userId,
//         });
//       }


//       const targetUser =
//         await User.findOne({
//           $or:
//             identifiers,
//         });


//       if (
//         !targetUser
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "User not found",
//           });
//       }


//       if (
//         String(
//           targetUser._id
//         ) ===
//           String(
//             req.user._id
//           ) &&
//         role !==
//           "admin"
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "You cannot remove your own admin role",
//           });
//       }


//       targetUser.role =
//         role;


//       await targetUser.save();


//       return res
//         .status(200)
//         .json({
//           message:
//             "User role updated",

//           user: {
//             userID:
//               targetUser.userID,

//             username:
//               targetUser.username,

//             role:
//               targetUser.role,
//           },
//         });

//     } catch (error) {
//       console.error(
//         "Failed to update user role:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to update user role",
//         });
//     }
//   }
// );





// // =========================================================
// // PATCH /api/admin/users/:userId
// //
// // ADMIN ONLY
// //
// // Admin can update a user's profile information.
// //
// // Allowed fields:
// //
// // firstName
// // lastName
// // username
// // email
// // phoneNumber
// // companyName
// // country
// //
// // Password and role are intentionally NOT updated here.
// //
// // Separate APIs already exist for:
// //
// // PATCH /api/admin/users/:userId/password
// // PATCH /api/admin/users/:userId/role
// // =========================================================

// router.patch(
//   "/users/:userId",
//   async (req, res) => {
//     try {
//       const {
//         userId,
//       } = req.params;


//       const {
//         firstName,
//         lastName,
//         username,
//         email,
//         phoneNumber,
//         companyName,
//         country,
//       } = req.body;


//       // ===================================================
//       // AT LEAST ONE FIELD REQUIRED
//       // ===================================================

//       if (
//         firstName === undefined &&
//         lastName === undefined &&
//         username === undefined &&
//         email === undefined &&
//         phoneNumber === undefined &&
//         companyName === undefined &&
//         country === undefined
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Provide at least one user field to update",
//           });
//       }


//       // ===================================================
//       // FIND USER
//       //
//       // Supports:
//       //
//       // userID
//       // MongoDB _id
//       // ===================================================

//       const identifiers = [
//         {
//           userID:
//             userId,
//         },
//       ];


//       if (
//         mongoose.isValidObjectId(
//           userId
//         )
//       ) {
//         identifiers.push({
//           _id:
//             userId,
//         });
//       }


//       const targetUser =
//         await User.findOne({
//           $or:
//             identifiers,
//         });


//       if (
//         !targetUser
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "User not found",
//           });
//       }


//       // ===================================================
//       // VALIDATE FIRST NAME
//       // ===================================================

//       if (
//         firstName !== undefined
//       ) {
//         if (
//           typeof firstName !==
//             "string" ||
//           !firstName.trim()
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "firstName must be a non-empty string",
//             });
//         }
//       }


//       // ===================================================
//       // VALIDATE LAST NAME
//       // ===================================================

//       if (
//         lastName !== undefined
//       ) {
//         if (
//           typeof lastName !==
//             "string" ||
//           !lastName.trim()
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "lastName must be a non-empty string",
//             });
//         }
//       }


//       // ===================================================
//       // VALIDATE USERNAME
//       // ===================================================

//       if (
//         username !== undefined
//       ) {
//         if (
//           typeof username !==
//             "string" ||
//           !username.trim()
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "username must be a non-empty string",
//             });
//         }


//         const existingUsername =
//           await User.findOne({
//             username:
//               username.trim(),

//             _id: {
//               $ne:
//                 targetUser._id,
//             },
//           });


//         if (
//           existingUsername
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "Account with that username already exists",
//             });
//         }
//       }


//       // ===================================================
//       // VALIDATE EMAIL
//       // ===================================================

//       if (
//         email !== undefined
//       ) {
//         if (
//           typeof email !==
//             "string" ||
//           !email.trim()
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "email must be a non-empty string",
//             });
//         }


//         const existingEmail =
//           await User.findOne({
//             email:
//               email.trim(),

//             _id: {
//               $ne:
//                 targetUser._id,
//             },
//           });


//         if (
//           existingEmail
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 "Account with that email already exists",
//             });
//         }
//       }


//       // ===================================================
//       // VALIDATE OPTIONAL STRING FIELDS
//       // ===================================================

//       const optionalStringFields = {
//         phoneNumber,
//         companyName,
//         country,
//       };


//       for (
//         const [
//           fieldName,
//           value,
//         ] of Object.entries(
//           optionalStringFields
//         )
//       ) {
//         if (
//           value !== undefined &&
//           typeof value !==
//             "string"
//         ) {
//           return res
//             .status(400)
//             .json({
//               error:
//                 `${fieldName} must be a string`,
//             });
//         }
//       }


//       // ===================================================
//       // APPLY UPDATES
//       // ===================================================

//       if (
//         firstName !== undefined
//       ) {
//         targetUser.firstName =
//           firstName.trim();
//       }


//       if (
//         lastName !== undefined
//       ) {
//         targetUser.lastName =
//           lastName.trim();
//       }


//       if (
//         username !== undefined
//       ) {
//         targetUser.username =
//           username.trim();
//       }


//       if (
//         email !== undefined
//       ) {
//         targetUser.email =
//           email.trim();
//       }


//       if (
//         phoneNumber !== undefined
//       ) {
//         targetUser.phoneNumber =
//           phoneNumber.trim();
//       }


//       if (
//         companyName !== undefined
//       ) {
//         targetUser.companyName =
//           companyName.trim();
//       }


//       if (
//         country !== undefined
//       ) {
//         targetUser.country =
//           country.trim();
//       }


//       await targetUser.save();


//       // ===================================================
//       // RESPONSE
//       //
//       // Never return:
//       //
//       // password
//       // sessions
//       // securityPin
//       // resetCode
//       // ===================================================

//       return res
//         .status(200)
//         .json({
//           message:
//             "User updated successfully",

//           user: {
//             _id:
//               targetUser._id,

//             userID:
//               targetUser.userID,

//             username:
//               targetUser.username,

//             role:
//               targetUser.role,

//             firstName:
//               targetUser.firstName,

//             lastName:
//               targetUser.lastName,

//             email:
//               targetUser.email,

//             phoneNumber:
//               targetUser.phoneNumber,

//             companyName:
//               targetUser.companyName,

//             country:
//               targetUser.country,

//             createdAt:
//               targetUser.createdAt,

//             updatedAt:
//               targetUser.updatedAt,
//           },
//         });

//     } catch (error) {
//       console.error(
//         "Failed to update user:",
//         error
//       );


//       // Mongo duplicate-key protection
//       if (
//         error &&
//         error.code === 11000
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "Username or email already exists",
//           });
//       }


//       if (
//         error &&
//         error.name ===
//           "ValidationError"
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               error.message,
//           });
//       }


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to update user",
//         });
//     }
//   }
// );


// // =========================================================
// // DELETE /api/admin/users/:userId
// //
// // ADMIN ONLY
// //
// // Admin can permanently delete another user.
// //
// // An administrator cannot delete their own account from
// // this API. This prevents accidentally removing the admin
// // account currently being used.
// // =========================================================

// router.delete(
//   "/users/:userId",
//   async (req, res) => {
//     try {
//       const {
//         userId,
//       } = req.params;


//       // ===================================================
//       // FIND USER
//       //
//       // Supports:
//       //
//       // userID
//       // MongoDB _id
//       // ===================================================

//       const identifiers = [
//         {
//           userID:
//             userId,
//         },
//       ];


//       if (
//         mongoose.isValidObjectId(
//           userId
//         )
//       ) {
//         identifiers.push({
//           _id:
//             userId,
//         });
//       }


//       const targetUser =
//         await User.findOne({
//           $or:
//             identifiers,
//         });


//       if (
//         !targetUser
//       ) {
//         return res
//           .status(404)
//           .json({
//             error:
//               "User not found",
//           });
//       }


//       // ===================================================
//       // PREVENT SELF DELETE
//       // ===================================================

//       if (
//         String(
//           targetUser._id
//         ) ===
//           String(
//             req.user._id
//           )
//       ) {
//         return res
//           .status(400)
//           .json({
//             error:
//               "You cannot delete your own administrator account",
//           });
//       }


//       // ===================================================
//       // DELETE USER
//       // ===================================================

//       await User.deleteOne({
//         _id:
//           targetUser._id,
//       });


//       // ===================================================
//       // IMPORTANT
//       //
//       // We intentionally DO NOT delete the user's
//       // ProductConfiguration records here.
//       //
//       // ProductConfiguration stores actor snapshots and
//       // configuration history independently of User.
//       //
//       // If configuration deletion should happen together
//       // with user deletion later, implement that explicitly.
//       // ===================================================


//       return res
//         .status(200)
//         .json({
//           message:
//             "User deleted successfully",

//           userID:
//             targetUser.userID,
//         });

//     } catch (error) {
//       console.error(
//         "Failed to delete user:",
//         error
//       );


//       return res
//         .status(500)
//         .json({
//           error:
//             "Failed to delete user",
//         });
//     }
//   }
// );

// module.exports = router;



const express = require("express");
const mongoose = require("mongoose");
const { isDeepStrictEqual } = require("node:util");

const User = require("../models/user");

const ProductConfiguration = require("../models/product_configuration");

const {
  getSignedFileUrl,
} = require("../Services/object_storage_service");

const {
  authenticate,
  requireAdmin,
  hashPassword,
} = require("./sessions");


const router = express.Router();


// =========================================================
// CONFIGURATION ACTOR
// =========================================================

function configurationActor(user) {
  return {
    userID: user.userID,
    username: user.username,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    role: user.role || "user",
  };
}


// =========================================================
// AUDIT HELPERS
// =========================================================

// Creates a safe plain copy for activityHistory.
//
// This is important because configurationData may contain
// nested objects / arrays and we do not want the historical
// "from" value to accidentally reference a value that is
// later changed in memory.

function auditValue(value) {
  if (value === undefined) {
    return null;
  }

  if (value === null) {
    return null;
  }

  if (
    typeof value !== "object"
  ) {
    return value;
  }

  return JSON.parse(
    JSON.stringify(value)
  );
}


// Compare two values including nested objects / arrays.

function auditValuesEqual(
  firstValue,
  secondValue
) {
  return isDeepStrictEqual(
    auditValue(firstValue),
    auditValue(secondValue)
  );
}


// Adds a change only when the old and new values are
// genuinely different.

function addAuditChange(
  changes,
  field,
  from,
  to
) {
  if (
    auditValuesEqual(
      from,
      to
    )
  ) {
    return;
  }

  changes.push({
    field,
    from: auditValue(from),
    to: auditValue(to),
  });
}


// Compares incoming configurationData with the currently
// stored configurationData.
//
// Existing admin update behaviour is a MERGE:
//
// {
//   ...existingConfigurationData,
//   ...incomingConfigurationData
// }
//
// Therefore only keys actually supplied by the request are
// considered for audit logging.
//
// Each changed product field receives its own audit entry:
//
// configurationData.conveyorSpeed
// configurationData.chainSize
// etc.

function addConfigurationDataAuditChanges(
  changes,
  existingData,
  incomingData
) {
  const currentData =
    existingData &&
    typeof existingData === "object" &&
    !Array.isArray(existingData)
      ? existingData
      : {};

  for (
    const [
      key,
      newValue,
    ] of Object.entries(
      incomingData
    )
  ) {
    addAuditChange(
      changes,
      `configurationData.${key}`,
      currentData[key],
      newValue
    );
  }
}


// =========================================================
// DATE HELPERS
// =========================================================

function startOfDay(date) {
  const result = new Date(date);

  result.setHours(
    0,
    0,
    0,
    0
  );

  return result;
}


function endOfDay(date) {
  const result = new Date(date);

  result.setHours(
    23,
    59,
    59,
    999
  );

  return result;
}


function parseDateInput(
  value,
  useEndOfDay = false
) {
  if (!value) {
    return null;
  }

  const dateOnly =
    /^\d{4}-\d{2}-\d{2}$/.test(
      value
    );

  const parsed =
    new Date(
      dateOnly
        ? `${value}T00:00:00`
        : value
    );

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    const error =
      new Error(
        `Invalid date: ${value}`
      );

    error.status = 400;

    throw error;
  }

  return (
    dateOnly &&
    useEndOfDay
  )
    ? endOfDay(parsed)
    : parsed;
}


// =========================================================
// LIST QUERY
//
// Used by both:
//
// GET /api/admin/configurations
// GET /api/admin/users
// =========================================================

function getListQuery(query) {
  const sortBy =
    query.sortBy ||
    "createdAt";

  const sortOrder =
    String(
      query.sortOrder ||
      "asc"
    ).toLowerCase();

  const dateField =
    query.dateField ||
    "createdAt";

  const requestedDateFilter =
    String(
      query.dateFilter ||
      (
        query.startDate ||
        query.endDate
          ? "custom"
          : "all"
      )
    ).toLowerCase();

  const dateFilterAliases = {
    all: "all",
    today: "today",
    lastday: "lastDay",
    yesterday: "lastDay",
    thisweek: "thisWeek",
    custom: "custom",
  };

  const dateFilter =
    dateFilterAliases[
      requestedDateFilter
    ];

  if (
    ![
      "createdAt",
      "updatedAt",
    ].includes(sortBy)
  ) {
    const error =
      new Error(
        "sortBy must be createdAt or updatedAt"
      );

    error.status = 400;

    throw error;
  }

  if (
    ![
      "asc",
      "desc",
    ].includes(sortOrder)
  ) {
    const error =
      new Error(
        "sortOrder must be asc or desc"
      );

    error.status = 400;

    throw error;
  }

  if (
    ![
      "createdAt",
      "updatedAt",
    ].includes(dateField)
  ) {
    const error =
      new Error(
        "dateField must be createdAt or updatedAt"
      );

    error.status = 400;

    throw error;
  }

  if (!dateFilter) {
    const error =
      new Error(
        "dateFilter must be all, today, lastDay, thisWeek, or custom"
      );

    error.status = 400;

    throw error;
  }

  let startDate = null;
  let endDate = null;

  const now =
    new Date();


  // =======================================================
  // TODAY
  // =======================================================

  if (
    dateFilter ===
    "today"
  ) {
    startDate =
      startOfDay(now);

    endDate =
      endOfDay(now);
  }


  // =======================================================
  // YESTERDAY
  // =======================================================

  else if (
    dateFilter ===
    "lastDay"
  ) {
    const yesterday =
      new Date(now);

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    startDate =
      startOfDay(
        yesterday
      );

    endDate =
      endOfDay(
        yesterday
      );
  }


  // =======================================================
  // THIS WEEK
  // =======================================================

  else if (
    dateFilter ===
    "thisWeek"
  ) {
    const mondayOffset =
      (
        now.getDay() + 6
      ) % 7;

    startDate =
      startOfDay(now);

    startDate.setDate(
      startDate.getDate() -
      mondayOffset
    );

    endDate =
      endOfDay(now);
  }


  // =======================================================
  // CUSTOM
  // =======================================================

  else if (
    dateFilter ===
    "custom"
  ) {
    if (
      !query.startDate ||
      !query.endDate
    ) {
      const error =
        new Error(
          "startDate and endDate are required for a custom date filter"
        );

      error.status = 400;

      throw error;
    }

    startDate =
      parseDateInput(
        query.startDate
      );

    endDate =
      parseDateInput(
        query.endDate,
        true
      );

    if (
      startDate >
      endDate
    ) {
      const error =
        new Error(
          "startDate cannot be after endDate"
        );

      error.status = 400;

      throw error;
    }
  }

  return {
    sortBy,
    sortOrder,
    dateField,
    dateFilter,
    startDate,
    endDate,
  };
}


// =========================================================
// FILTER AND SORT
//
// Mainly kept for user list.
// =========================================================

function filterAndSort(
  items,
  listQuery
) {
  const {
    sortBy,
    sortOrder,
    dateField,
    startDate,
    endDate,
  } = listQuery;

  const filtered =
    startDate &&
    endDate
      ? items.filter(
          (item) => {
            const value =
              new Date(
                item[
                  dateField
                ]
              );

            return (
              !Number.isNaN(
                value.getTime()
              ) &&
              value >= startDate &&
              value <= endDate
            );
          }
        )
      : items;

  const direction =
    sortOrder === "asc"
      ? 1
      : -1;

  return filtered.sort(
    (a, b) => {
      const difference =
        new Date(
          a[sortBy]
        ) -
        new Date(
          b[sortBy]
        );

      if (
        difference !== 0
      ) {
        return (
          difference *
          direction
        );
      }

      return String(
        a._id
      ).localeCompare(
        String(
          b._id
        )
      ) * direction;
    }
  );
}


// =========================================================
// SERIALIZE QUERY
// =========================================================

function serializeListQuery(
  listQuery
) {
  return {
    sortBy:
      listQuery.sortBy,

    sortOrder:
      listQuery.sortOrder,

    dateField:
      listQuery.dateField,

    dateFilter:
      listQuery.dateFilter,

    startDate:
      listQuery.startDate
        ? listQuery.startDate.toISOString()
        : null,

    endDate:
      listQuery.endDate
        ? listQuery.endDate.toISOString()
        : null,
  };
}


// =========================================================
// ADMIN CONFIGURATION STATUS FILTER
//
// IMPORTANT:
//
// ProductConfiguration has TWO separate workflow states:
//
// USER STATUS:
//
// draft
// cart
// submitted
//
// ADMIN STATUS:
//
// requested
// pending
// done
//
// This filter is for ADMIN STATUS only.
//
// For backward compatibility with the current Flutter
// AdminListFilters implementation, both:
//
// ?status=requested
//
// and:
//
// ?adminStatus=requested
//
// are accepted.
// =========================================================

function getStatusFilter(query) {
  const rawStatus =
    query.adminStatus ||
    query.status ||
    query.statuses ||
    "all";

  const statuses =
    String(rawStatus)
      .split(",")
      .map(
        (status) =>
          status
            .trim()
            .toLowerCase()
      )
      .filter(Boolean);

  if (
    statuses.length === 0 ||
    statuses.includes(
      "all"
    )
  ) {
    return [];
  }

  const allowedStatuses = [
    "requested",
    "pending",
    "done",
  ];

  const invalidStatuses =
    statuses.filter(
      (status) =>
        !allowedStatuses.includes(
          status
        )
    );

  if (
    invalidStatuses.length > 0
  ) {
    const error =
      new Error(
        "status must be requested, pending, done, all, or a comma-separated combination"
      );

    error.status = 400;

    throw error;
  }

  return [
    ...new Set(
      statuses
    ),
  ];
}


// =========================================================
// ALL ADMIN ROUTES REQUIRE:
//
// 1. Valid login session
// 2. Admin role
// =========================================================

router.use(
  authenticate,
  requireAdmin
);


// =========================================================
// GET /api/admin/configurations
//
// ADMIN:
//
// Can see configurations belonging to ALL USERS.
//
// IMPORTANT:
//
// Only configurations submitted by users enter the
// administrator workflow.
//
// User workflow:
//
// draft -> cart -> submitted
//
// Admin workflow:
//
// requested -> pending -> done
//
// Data comes directly from:
//
// product_configurations
// =========================================================

router.get(
  "/configurations",
  async (req, res) => {
    try {
      const listQuery =
        getListQuery(
          req.query
        );

      const statusFilter =
        getStatusFilter(
          req.query
        );

      const mongoQuery = {
        status:
          "submitted",
      };

      if (
        statusFilter.length > 0
      ) {
        mongoQuery.adminStatus = {
          $in:
            statusFilter,
        };
      }

      if (
        listQuery.startDate &&
        listQuery.endDate
      ) {
        mongoQuery[
          listQuery.dateField
        ] = {
          $gte:
            listQuery.startDate,

          $lte:
            listQuery.endDate,
        };
      }

      const sortDirection =
        listQuery.sortOrder ===
        "asc"
          ? 1
          : -1;

      const configurations =
        await ProductConfiguration
          .find(
            mongoQuery
          )
          .sort({
            [listQuery.sortBy]:
              sortDirection,
          })
          .lean();

      const summary = {
        total:
          configurations.length,

        requested: 0,

        pending: 0,

        done: 0,
      };

      configurations.forEach(
        (configuration) => {
          const adminStatus =
            configuration.adminStatus ||
            "requested";

          if (
            summary[
              adminStatus
            ] !== undefined
          ) {
            summary[
              adminStatus
            ] += 1;
          }
        }
      );

      return res
        .status(200)
        .json({
          summary,

          query: {
            ...serializeListQuery(
              listQuery
            ),

            status:
              statusFilter.length > 0
                ? statusFilter
                : ["all"],
          },

          data:
            configurations.map(
              (
                configuration
              ) => ({
                configurationID:
                  configuration.configurationID,

                userID:
                  configuration.userID,

                configurationName:
                  configuration.configurationName,

                productType:
                  configuration.productType,

                productName:
                  configuration.productName,

                status:
                  configuration.status,

                adminStatus:
                  configuration.adminStatus ||
                  "requested",

                // NEW:
                // Authoritative start time of the CURRENT
                // admin workflow status.
                adminStatusChangedAt:
                  configuration.adminStatusChangedAt ||
                  configuration.adminRequestedAt ||
                  null,

                isComplete:
                  configuration.isComplete,

                numRequested:
                  configuration.numRequested,

                configurationData:
                  configuration.configurationData,

                draftID:
                  configuration.draftID,

                draftTitle:
                  configuration.draftTitle,

                createdBy:
                  configuration.createdBy,

                updatedBy:
                  configuration.updatedBy,

                submittedAt:
                  configuration.submittedAt,

                completedAt:
                  configuration.completedAt,

                adminRequestedAt:
                  configuration.adminRequestedAt,

                adminStartedAt:
                  configuration.adminStartedAt,

                adminCompletedAt:
                  configuration.adminCompletedAt,

                createdAt:
                  configuration.createdAt,

                updatedAt:
                  configuration.updatedAt,
              })
            ),
        });

    } catch (error) {
      console.error(
        "Failed to fetch admin configurations:",
        error
      );

      if (
        error.status === 400
      ) {
        return res
          .status(400)
          .json({
            error:
              error.message,
          });
      }

      return res
        .status(500)
        .json({
          error:
            "Failed to fetch configurations",
        });
    }
  }
);


// =========================================================
// GET /api/admin/configurations/:configurationID
//
// Admin can fetch ANY user's complete configuration.
//
// NOTE:
//
// Because the complete ProductConfiguration document is
// returned here, activityHistory and adminStatusChangedAt
// are automatically included.
// =========================================================

router.get(
  "/configurations/:configurationID",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;

      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });

      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }

      return res
        .status(200)
        .json({
          configuration,
        });

    } catch (error) {
      console.error(
        "Failed to fetch configuration:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to fetch configuration",
        });
    }
  }
);

// =========================================================
// POST /api/admin/configurations/:configurationID/image-url
//
// ADMIN ONLY
//
// Generates a temporary signed URL for an image stored
// inside a ProductConfiguration.
//
// REQUEST BODY:
//
// {
//   "imageKey": "someFieldImage"
// }
//
// IMPORTANT:
//
// Frontend does NOT send objectKey directly.
//
// Backend:
//
// 1. Finds configuration by configurationID.
// 2. Reads configurationData[imageKey].
// 3. Gets the stored objectKey.
// 4. Verifies that the object belongs to the same user.
// 5. Generates a temporary signed URL.
//
// Object Storage remains private.
//
// Signed URL expiry:
//
// 3600 seconds = 1 hour.
// =========================================================

router.post(
  "/configurations/:configurationID/image-url",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;

      const {
        imageKey,
      } = req.body || {};


      // ===================================================
      // VALIDATE IMAGE KEY
      // ===================================================

      if (
        typeof imageKey !== "string" ||
        !imageKey.trim()
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "imageKey is required",
          });
      }

      const normalizedImageKey =
        imageKey.trim();


      // ===================================================
      // FIND CONFIGURATION
      // ===================================================

      const configuration =
        await ProductConfiguration
          .findOne({
            configurationID,
          })
          .lean();

      if (!configuration) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Configuration not found",
          });
      }


      // ===================================================
      // VALIDATE CONFIGURATION DATA
      // ===================================================

      const configurationData =
        configuration.configurationData;

      if (
        !configurationData ||
        typeof configurationData !==
          "object" ||
        Array.isArray(
          configurationData
        )
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Configuration data not found",
          });
      }


      // ===================================================
      // FIND IMAGE METADATA
      //
      // Example:
      //
      // configurationData = {
      //   someFieldImage: {
      //     objectKey:
      //       "product-configurations/USER123-PRODUCT/abc.jpg",
      //     originalName:
      //       "factory.jpg",
      //     contentType:
      //       "image/jpeg",
      //     size:
      //       123456
      //   }
      // }
      // ===================================================

      const imageData =
        configurationData[
          normalizedImageKey
        ];

      if (
        !imageData ||
        typeof imageData !==
          "object" ||
        Array.isArray(imageData)
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Image not found in configuration",
          });
      }


      // ===================================================
      // VALIDATE OBJECT KEY
      // ===================================================

      const objectKey =
        imageData.objectKey;

      if (
        typeof objectKey !== "string" ||
        !objectKey.trim()
      ) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Image object key not found",
          });
      }

      const normalizedObjectKey =
        objectKey.trim();


      // ===================================================
      // VERIFY IMAGE OWNERSHIP
      //
      // Upload route stores files using:
      //
      // product-configurations/{userID}-{productType}/...
      //
      // Therefore the object referenced by this
      // configuration must belong to the same
      // user + product.
      // ===================================================

      if (
        !configuration.userID ||
        typeof configuration.userID !==
          "string"
      ) {
        return res
          .status(500)
          .json({
            success: false,
            message:
              "Configuration user information is invalid",
          });
      }

      const expectedPrefix =
        `product-configurations/${configuration.userID}-${configuration.productType}/`;

      if (
        !normalizedObjectKey.startsWith(
          expectedPrefix
        )
      ) {
        return res
          .status(403)
          .json({
            success: false,
            message:
              "Image does not belong to this configuration",
          });
      }


      // ===================================================
      // GENERATE TEMPORARY SIGNED URL
      // ===================================================

      const expiresIn =
        3600;

      const signedUrl =
        await getSignedFileUrl(
          normalizedObjectKey,
          expiresIn
        );


      // ===================================================
      // RESPONSE
      // ===================================================

      return res
        .status(200)
        .json({
          success: true,

          file: {
            objectKey:
              normalizedObjectKey,

            originalName:
              typeof imageData.originalName ===
              "string"
                ? imageData.originalName
                : "",

            contentType:
              typeof imageData.contentType ===
              "string"
                ? imageData.contentType
                : "",

            size:
              typeof imageData.size ===
              "number"
                ? imageData.size
                : 0,

            url:
              signedUrl,

            expiresIn,
          },
        });

    } catch (error) {
      console.error(
        "Failed to generate admin image signed URL:",
        error
      );

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Failed to generate image URL",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/configurations/:configurationID
//
// Admin can edit configuration content.
//
// Allowed here:
//
// configurationName
// configurationData
// numRequested
// isComplete
//
// User status and admin status are intentionally NOT
// changed here.
//
// There is a separate admin workflow status API below.
//
// NEW AUDIT BEHAVIOUR:
//
// Only ACTUAL changes are written to activityHistory.
//
// Example:
//
// {
//   action: "configuration_updated",
//   actor: {...admin},
//   changedAt: "...",
//   changes: [
//     {
//       field: "configurationData.conveyorSpeed",
//       from: "25",
//       to: "30"
//     }
//   ]
// }
//
// Sending the same value again does NOT create a
// configuration_updated activity.
// =========================================================

router.patch(
  "/configurations/:configurationID",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;

      const {
        configurationName,
        configurationData,
        numRequested,
        isComplete,
      } = req.body;


      // ===================================================
      // AT LEAST ONE FIELD REQUIRED
      // ===================================================

      if (
        configurationName === undefined &&
        configurationData === undefined &&
        numRequested === undefined &&
        isComplete === undefined
      ) {
        return res
          .status(400)
          .json({
            error:
              "Provide at least one field to update",
          });
      }


      // ===================================================
      // VALIDATE configurationName
      // ===================================================

      if (
        configurationName !== undefined &&
        (
          typeof configurationName !==
            "string" ||
          !configurationName.trim()
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "configurationName must be a non-empty string",
          });
      }


      // ===================================================
      // VALIDATE configurationData
      // ===================================================

      if (
        configurationData !== undefined &&
        (
          typeof configurationData !==
            "object" ||
          configurationData ===
            null ||
          Array.isArray(
            configurationData
          )
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "configurationData must be an object",
          });
      }


      // ===================================================
      // VALIDATE QUANTITY
      // ===================================================

      if (
        numRequested !== undefined
      ) {
        const quantity =
          Number(
            numRequested
          );

        if (
          Number.isNaN(
            quantity
          ) ||
          quantity < 1
        ) {
          return res
            .status(400)
            .json({
              error:
                "numRequested must be at least 1",
            });
        }
      }


      // ===================================================
      // VALIDATE isComplete
      // ===================================================

      if (
        isComplete !== undefined &&
        typeof isComplete !==
          "boolean"
      ) {
        return res
          .status(400)
          .json({
            error:
              "isComplete must be boolean",
          });
      }


      // ===================================================
      // FIND CONFIGURATION
      // ===================================================

      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });

      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }


      // ===================================================
      // BUILD ACTUAL CHANGES
      //
      // IMPORTANT:
      //
      // We compare BEFORE changing the document.
      //
      // Therefore activityHistory contains trustworthy:
      //
      // from -> to
      //
      // values.
      // ===================================================

      const changes = [];


      // ===================================================
      // CONFIGURATION NAME CHANGE
      // ===================================================

      if (
        configurationName !== undefined
      ) {
        const normalizedConfigurationName =
          configurationName.trim();

        addAuditChange(
          changes,
          "configurationName",
          configuration.configurationName,
          normalizedConfigurationName
        );
      }


      // ===================================================
      // CONFIGURATION DATA CHANGES
      //
      // We record each incoming field separately.
      //
      // Example:
      //
      // configurationData.chainSize
      // configurationData.conveyorSpeed
      //
      // Instead of storing the entire configurationData
      // object as one giant history entry.
      // ===================================================

      if (
        configurationData !== undefined
      ) {
        addConfigurationDataAuditChanges(
          changes,
          configuration.configurationData,
          configurationData
        );
      }


      // ===================================================
      // QUANTITY CHANGE
      // ===================================================

      if (
        numRequested !== undefined
      ) {
        addAuditChange(
          changes,
          "numRequested",
          configuration.numRequested,
          Number(
            numRequested
          )
        );
      }


      // ===================================================
      // COMPLETION CHANGE
      // ===================================================

      if (
        isComplete !== undefined
      ) {
        addAuditChange(
          changes,
          "isComplete",
          configuration.isComplete,
          isComplete
        );
      }


      // ===================================================
      // NO ACTUAL CHANGE
      //
      // Request is valid, but every supplied value is
      // already equal to the stored value.
      //
      // We intentionally:
      //
      // - do NOT create activityHistory
      // - do NOT change updatedBy
      // - do NOT call save()
      // - do NOT change updatedAt
      // ===================================================

      if (
        changes.length === 0
      ) {
        return res
          .status(200)
          .json({
            message:
              "No configuration changes detected",

            configuration,
          });
      }


      // ===================================================
      // APPLY ACTUAL UPDATES
      // ===================================================

      if (
        configurationName !==
        undefined
      ) {
        configuration.configurationName =
          configurationName.trim();
      }


      if (
        configurationData !==
        undefined
      ) {
        configuration.configurationData = {
          ...(
            configuration.configurationData ||
            {}
          ),
          ...configurationData,
        };

        configuration.markModified(
          "configurationData"
        );
      }


      if (
        numRequested !==
        undefined
      ) {
        configuration.numRequested =
          Number(
            numRequested
          );
      }


      if (
        isComplete !==
        undefined
      ) {
        configuration.isComplete =
          isComplete;
      }


      // ===================================================
      // ACTOR
      // ===================================================

      const actor =
        configurationActor(
          req.user
        );

      configuration.updatedBy =
        actor;


      // ===================================================
      // APPEND ACTIVITY
      //
      // ONE edit request = ONE activity item.
      //
      // If that edit changed five values:
      //
      // activityHistory
      //   -> one configuration_updated
      //      -> five changes
      // ===================================================

      configuration.activityHistory.push({
        action:
          "configuration_updated",

        actor,

        changedAt:
          new Date(),

        changes,
      });


      // ===================================================
      // SAVE
      // ===================================================

      await configuration.save();


      // ===================================================
      // RESPONSE
      // ===================================================

      return res
        .status(200)
        .json({
          message:
            "Configuration updated",

          configuration,
        });

    } catch (error) {
      console.error(
        "Failed to update configuration:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to update configuration",
        });
    }
  }
);

// =========================================================
// PATCH /api/admin/configurations/:configurationID/status
//
// ADMIN WORKFLOW:
//
// requested -> pending -> done
//
// Status can also move backwards:
//
// done -> pending
// pending -> requested
// done -> requested
//
// IMPORTANT:
//
// adminStatusChangedAt is the authoritative timestamp for
// the CURRENT admin status.
//
// Example:
//
// 10 Sep:
// requested
//
// 20 Sep:
// requested -> pending
// adminStatusChangedAt = 20 Sep
//
// 25 Sep:
// pending -> requested
// adminStatusChangedAt = 25 Sep
//
// Therefore Requested timer starts again from 25 Sep,
// instead of incorrectly continuing from 10 Sep.
//
// Every genuine status transition is also added to:
//
// activityHistory
//
// Selecting the SAME status again:
//
// - does NOT reset timer
// - does NOT create activity
// - does NOT change updatedBy
// - does NOT save the document
// =========================================================

router.patch(
  "/configurations/:configurationID/status",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;

      const {
        status,
        adminStatus,
      } = req.body || {};


      // ===================================================
      // SUPPORT CURRENT REQUEST SHAPE
      //
      // Prefer adminStatus when supplied.
      //
      // status is kept supported for compatibility with
      // existing frontend/API usage.
      // ===================================================

      const requestedStatus =
        String(
          adminStatus ??
          status ??
          ""
        )
          .trim()
          .toLowerCase();


      // ===================================================
      // VALIDATE STATUS
      // ===================================================

      const allowedStatuses = [
        "requested",
        "pending",
        "done",
      ];

      if (
        !allowedStatuses.includes(
          requestedStatus
        )
      ) {
        return res
          .status(400)
          .json({
            error:
              "Admin status must be requested, pending, or done",
          });
      }


      // ===================================================
      // FIND CONFIGURATION
      // ===================================================

      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });

      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }


      // ===================================================
      // ADMIN WORKFLOW IS ONLY FOR SUBMITTED CONFIGURATIONS
      // ===================================================

      if (
        configuration.status !==
        "submitted"
      ) {
        return res
          .status(400)
          .json({
            error:
              "Only submitted configurations can use the admin workflow",
          });
      }


      // ===================================================
      // CURRENT STATUS
      //
      // Legacy submitted configurations may not have an
      // explicit adminStatus.
      //
      // Existing system treats those records as requested,
      // therefore we preserve that behaviour.
      // ===================================================

      const previousStatus =
        configuration.adminStatus ||
        "requested";


      // ===================================================
      // SAME STATUS
      //
      // Example:
      //
      // Current = pending
      // Request = pending
      //
      // Nothing actually changed.
      //
      // DO NOT:
      //
      // - reset adminStatusChangedAt
      // - reset adminStartedAt
      // - create activityHistory
      // - update updatedBy
      // - save
      // ===================================================

      if (
        previousStatus ===
        requestedStatus
      ) {
        return res
          .status(200)
          .json({
            message:
              "Admin configuration status unchanged",

            configuration,
          });
      }


      // ===================================================
      // GENUINE STATUS TRANSITION
      // ===================================================

      const now =
        new Date();

      const actor =
        configurationActor(
          req.user
        );


      // ===================================================
      // SET CURRENT ADMIN STATUS
      // ===================================================

      configuration.adminStatus =
        requestedStatus;


      // ===================================================
      // AUTHORITATIVE CURRENT STATUS TIMER
      //
      // This ALWAYS becomes NOW for a genuine transition.
      //
      // Flutter should eventually use this field for:
      //
      // Requested duration
      // Pending duration
      //
      // instead of deciding timer start from old historical
      // requested/started timestamps.
      // ===================================================

      configuration.adminStatusChangedAt =
        now;


      // ===================================================
      // LEGACY TIMESTAMPS
      //
      // We keep these because existing frontend/API code
      // already uses them.
      //
      // But adminStatusChangedAt is now the correct source
      // for the CURRENT status duration.
      // ===================================================

      if (
        requestedStatus ===
        "requested"
      ) {
        // A NEW requested period starts now.
        //
        // This is intentionally NOT:
        //
        // configuration.adminRequestedAt =
        //   configuration.adminRequestedAt || now;
        //
        // because that would preserve an old Requested
        // period and cause the timer bug.

        configuration.adminRequestedAt =
          now;

        configuration.adminStartedAt =
          null;

        configuration.adminCompletedAt =
          null;

        configuration.completedAt =
          null;
      }


      else if (
        requestedStatus ===
        "pending"
      ) {
        // Keep the most recent requested timestamp if it
        // exists.
        //
        // Legacy records may not have one, so submittedAt
        // is a reasonable compatibility fallback.

        configuration.adminRequestedAt =
          configuration.adminRequestedAt ||
          configuration.submittedAt ||
          now;

        // A NEW pending period always starts NOW.

        configuration.adminStartedAt =
          now;

        configuration.adminCompletedAt =
          null;

        configuration.completedAt =
          null;
      }


      else if (
        requestedStatus ===
        "done"
      ) {
        configuration.adminRequestedAt =
          configuration.adminRequestedAt ||
          configuration.submittedAt ||
          now;

        configuration.adminStartedAt =
          configuration.adminStartedAt ||
          now;

        configuration.adminCompletedAt =
          now;

        configuration.completedAt =
          now;
      }


      // ===================================================
      // UPDATED BY
      // ===================================================

      configuration.updatedBy =
        actor;


      // ===================================================
      // ACTIVITY HISTORY
      //
      // Example:
      //
      // {
      //   action: "admin_status_changed",
      //   actor: {
      //     userID: "...",
      //     username: "tabish",
      //     role: "admin"
      //   },
      //   changedAt: "...",
      //   changes: [
      //     {
      //       field: "adminStatus",
      //       from: "pending",
      //       to: "requested"
      //     }
      //   ]
      // }
      // ===================================================

      configuration.activityHistory.push({
        action:
          "admin_status_changed",

        actor,

        changedAt:
          now,

        changes: [
          {
            field:
              "adminStatus",

            from:
              previousStatus,

            to:
              requestedStatus,
          },
        ],
      });


      // ===================================================
      // SAVE
      // ===================================================

      await configuration.save();


      // ===================================================
      // RESPONSE
      // ===================================================

      return res
        .status(200)
        .json({
          message:
            "Admin configuration status updated",

          configuration,
        });

    } catch (error) {
      console.error(
        "Failed to update admin configuration status:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to update admin configuration status",
        });
    }
  }
);


// =========================================================
// DELETE /api/admin/configurations/:configurationID
//
// ADMIN:
//
// Permanently deletes a configuration.
//
// IMPORTANT:
//
// This keeps the existing hard-delete behaviour.
// =========================================================

router.delete(
  "/configurations/:configurationID",
  async (req, res) => {
    try {
      const {
        configurationID,
      } = req.params;

      const configuration =
        await ProductConfiguration.findOne({
          configurationID,
        });

      if (
        !configuration
      ) {
        return res
          .status(404)
          .json({
            error:
              "Configuration not found",
          });
      }

      await ProductConfiguration.deleteOne({
        configurationID,
      });

      return res
        .status(200)
        .json({
          message:
            "Configuration deleted",
        });

    } catch (error) {
      console.error(
        "Failed to delete configuration:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to delete configuration",
        });
    }
  }
);
// =========================================================
// GET /api/admin/users
//
// UNCHANGED USER ADMIN LOGIC.
//
// Authentication secrets are intentionally never returned.
// =========================================================

router.get(
  "/users",
  async (req, res) => {
    try {
      const listQuery =
        getListQuery(
          req.query
        );

      const storedUsers =
        await User.find({})
          .select(
            "userID username role firstName lastName email phoneNumber companyName country createdAt updatedAt"
          )
          .lean();

      const normalizedUsers =
        storedUsers.map(
          (user) => {
            const fallbackCreatedAt =
              user._id.getTimestamp();

            return {
              ...user,

              createdAt:
                user.createdAt ||
                fallbackCreatedAt,

              updatedAt:
                user.updatedAt ||
                user.createdAt ||
                fallbackCreatedAt,
            };
          }
        );

      const users =
        filterAndSort(
          normalizedUsers,
          listQuery
        );

      return res
        .status(200)
        .json({
          count:
            users.length,

          query:
            serializeListQuery(
              listQuery
            ),

          data:
            users,
        });

    } catch (error) {
      console.error(
        "Failed to fetch admin users:",
        error
      );

      if (
        error.status === 400
      ) {
        return res
          .status(400)
          .json({
            error:
              error.message,
          });
      }

      return res
        .status(500)
        .json({
          error:
            "Failed to fetch users",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/users/:userId/password
//
// UNCHANGED USER ADMIN LOGIC.
//
// Admin can reset any user's password.
// =========================================================

router.patch(
  "/users/:userId/password",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;

      const password =
        req.body.password ||
        req.body.newPassword;

      if (!password) {
        return res
          .status(400)
          .json({
            error:
              "New password is required",
          });
      }

      if (
        typeof password !==
          "string" ||
        password.length < 8 ||
        password.length > 50
      ) {
        return res
          .status(400)
          .json({
            error:
              "Password must be between 8 and 50 characters",
          });
      }

      const identifiers = [
        {
          userID:
            userId,
        },
      ];

      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }

      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });

      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }

      targetUser.password =
        await hashPassword(
          password
        );

      targetUser.resetCode =
        null;

      // Password reset invalidates sessions.
      targetUser.sessions =
        [];

      await targetUser.save();

      return res
        .status(200)
        .json({
          message:
            "Password reset successfully",

          user: {
            userID:
              targetUser.userID,

            username:
              targetUser.username,

            role:
              targetUser.role,
          },
        });

    } catch (error) {
      console.error(
        "Failed to reset user password:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to reset user password",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/users/:userId/role
//
// UNCHANGED USER ADMIN LOGIC.
// =========================================================

router.patch(
  "/users/:userId/role",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;

      const {
        role,
      } = req.body;

      if (
        ![
          "user",
          "admin",
        ].includes(role)
      ) {
        return res
          .status(400)
          .json({
            error:
              "Role must be either user or admin",
          });
      }

      const identifiers = [
        {
          userID:
            userId,
        },
      ];

      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }

      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });

      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }

      if (
        String(
          targetUser._id
        ) ===
          String(
            req.user._id
          ) &&
        role !==
          "admin"
      ) {
        return res
          .status(400)
          .json({
            error:
              "You cannot remove your own admin role",
          });
      }

      targetUser.role =
        role;

      await targetUser.save();

      return res
        .status(200)
        .json({
          message:
            "User role updated",

          user: {
            userID:
              targetUser.userID,

            username:
              targetUser.username,

            role:
              targetUser.role,
          },
        });

    } catch (error) {
      console.error(
        "Failed to update user role:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to update user role",
        });
    }
  }
);


// =========================================================
// PATCH /api/admin/users/:userId
//
// ADMIN ONLY
//
// Admin can update a user's profile information.
//
// Allowed fields:
//
// firstName
// lastName
// username
// email
// phoneNumber
// companyName
// country
//
// Password and role are intentionally NOT updated here.
//
// Separate APIs already exist for:
//
// PATCH /api/admin/users/:userId/password
// PATCH /api/admin/users/:userId/role
// =========================================================

router.patch(
  "/users/:userId",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;

      const {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        companyName,
        country,
      } = req.body;


      // ===================================================
      // AT LEAST ONE FIELD REQUIRED
      // ===================================================

      if (
        firstName === undefined &&
        lastName === undefined &&
        username === undefined &&
        email === undefined &&
        phoneNumber === undefined &&
        companyName === undefined &&
        country === undefined
      ) {
        return res
          .status(400)
          .json({
            error:
              "Provide at least one user field to update",
          });
      }


      // ===================================================
      // FIND USER
      //
      // Supports:
      //
      // userID
      // MongoDB _id
      // ===================================================

      const identifiers = [
        {
          userID:
            userId,
        },
      ];

      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }

      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });

      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }


      // ===================================================
      // VALIDATE FIRST NAME
      // ===================================================

      if (
        firstName !== undefined
      ) {
        if (
          typeof firstName !==
            "string" ||
          !firstName.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "firstName must be a non-empty string",
            });
        }
      }


      // ===================================================
      // VALIDATE LAST NAME
      // ===================================================

      if (
        lastName !== undefined
      ) {
        if (
          typeof lastName !==
            "string" ||
          !lastName.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "lastName must be a non-empty string",
            });
        }
      }


      // ===================================================
      // VALIDATE USERNAME
      // ===================================================

      if (
        username !== undefined
      ) {
        if (
          typeof username !==
            "string" ||
          !username.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "username must be a non-empty string",
            });
        }

        const existingUsername =
          await User.findOne({
            username:
              username.trim(),

            _id: {
              $ne:
                targetUser._id,
            },
          });

        if (
          existingUsername
        ) {
          return res
            .status(400)
            .json({
              error:
                "Account with that username already exists",
            });
        }
      }


      // ===================================================
      // VALIDATE EMAIL
      // ===================================================

      if (
        email !== undefined
      ) {
        if (
          typeof email !==
            "string" ||
          !email.trim()
        ) {
          return res
            .status(400)
            .json({
              error:
                "email must be a non-empty string",
            });
        }

        const existingEmail =
          await User.findOne({
            email:
              email.trim(),

            _id: {
              $ne:
                targetUser._id,
            },
          });

        if (
          existingEmail
        ) {
          return res
            .status(400)
            .json({
              error:
                "Account with that email already exists",
            });
        }
      }


      // ===================================================
      // VALIDATE OPTIONAL STRING FIELDS
      // ===================================================

      const optionalStringFields = {
        phoneNumber,
        companyName,
        country,
      };

      for (
        const [
          fieldName,
          value,
        ] of Object.entries(
          optionalStringFields
        )
      ) {
        if (
          value !== undefined &&
          typeof value !==
            "string"
        ) {
          return res
            .status(400)
            .json({
              error:
                `${fieldName} must be a string`,
            });
        }
      }


      // ===================================================
      // APPLY UPDATES
      // ===================================================

      if (
        firstName !== undefined
      ) {
        targetUser.firstName =
          firstName.trim();
      }

      if (
        lastName !== undefined
      ) {
        targetUser.lastName =
          lastName.trim();
      }

      if (
        username !== undefined
      ) {
        targetUser.username =
          username.trim();
      }

      if (
        email !== undefined
      ) {
        targetUser.email =
          email.trim();
      }

      if (
        phoneNumber !== undefined
      ) {
        targetUser.phoneNumber =
          phoneNumber.trim();
      }

      if (
        companyName !== undefined
      ) {
        targetUser.companyName =
          companyName.trim();
      }

      if (
        country !== undefined
      ) {
        targetUser.country =
          country.trim();
      }

      await targetUser.save();


      // ===================================================
      // RESPONSE
      //
      // Never return:
      //
      // password
      // sessions
      // securityPin
      // resetCode
      // ===================================================

      return res
        .status(200)
        .json({
          message:
            "User updated successfully",

          user: {
            _id:
              targetUser._id,

            userID:
              targetUser.userID,

            username:
              targetUser.username,

            role:
              targetUser.role,

            firstName:
              targetUser.firstName,

            lastName:
              targetUser.lastName,

            email:
              targetUser.email,

            phoneNumber:
              targetUser.phoneNumber,

            companyName:
              targetUser.companyName,

            country:
              targetUser.country,

            createdAt:
              targetUser.createdAt,

            updatedAt:
              targetUser.updatedAt,
          },
        });

    } catch (error) {
      console.error(
        "Failed to update user:",
        error
      );

      // Mongo duplicate-key protection
      if (
        error &&
        error.code === 11000
      ) {
        return res
          .status(400)
          .json({
            error:
              "Username or email already exists",
          });
      }

      if (
        error &&
        error.name ===
          "ValidationError"
      ) {
        return res
          .status(400)
          .json({
            error:
              error.message,
          });
      }

      return res
        .status(500)
        .json({
          error:
            "Failed to update user",
        });
    }
  }
);


// =========================================================
// DELETE /api/admin/users/:userId
//
// ADMIN ONLY
//
// Admin can permanently delete another user.
//
// An administrator cannot delete their own account from
// this API. This prevents accidentally removing the admin
// account currently being used.
// =========================================================

router.delete(
  "/users/:userId",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;


      // ===================================================
      // FIND USER
      //
      // Supports:
      //
      // userID
      // MongoDB _id
      // ===================================================

      const identifiers = [
        {
          userID:
            userId,
        },
      ];

      if (
        mongoose.isValidObjectId(
          userId
        )
      ) {
        identifiers.push({
          _id:
            userId,
        });
      }

      const targetUser =
        await User.findOne({
          $or:
            identifiers,
        });

      if (
        !targetUser
      ) {
        return res
          .status(404)
          .json({
            error:
              "User not found",
          });
      }


      // ===================================================
      // PREVENT SELF DELETE
      // ===================================================

      if (
        String(
          targetUser._id
        ) ===
          String(
            req.user._id
          )
      ) {
        return res
          .status(400)
          .json({
            error:
              "You cannot delete your own administrator account",
          });
      }


      // ===================================================
      // DELETE USER
      // ===================================================

      await User.deleteOne({
        _id:
          targetUser._id,
      });


      // ===================================================
      // IMPORTANT
      //
      // We intentionally DO NOT delete the user's
      // ProductConfiguration records here.
      //
      // ProductConfiguration stores actor snapshots and
      // configuration history independently of User.
      //
      // If configuration deletion should happen together
      // with user deletion later, implement that explicitly.
      // ===================================================

      return res
        .status(200)
        .json({
          message:
            "User deleted successfully",

          userID:
            targetUser.userID,
        });

    } catch (error) {
      console.error(
        "Failed to delete user:",
        error
      );

      return res
        .status(500)
        .json({
          error:
            "Failed to delete user",
        });
    }
  }
);


module.exports = router;