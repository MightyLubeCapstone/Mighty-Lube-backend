// =========================================================
// BACKFILL RFQ NUMBERS (run once per database)
//
// Gives an RFQ number to every submitted/completed
// configuration that was finalized before RFQ numbers
// existed. Oldest submission gets the lowest number.
//
// Safe to run again: records that already have a number
// are skipped.
//
// Usage:
//
//   node scripts/backfillRfqNumbers.js --dry-run   (preview only)
//   node scripts/backfillRfqNumbers.js             (write)
//
// Database is chosen the same way as the server:
//
//   DB_MODE=local       -> MONGODB_URI_LOCAL
//   DB_MODE=production  -> MONGODB_URI_PRODUCTION
// =========================================================

require("dotenv").config();

const mongoose = require("mongoose");

const { dbConnect } = require("../config/config");

const ProductConfiguration = require("../models/product_configuration");

const { nextRfqNumber } = require("../models/counter");


async function main() {
  const dryRun = process.argv.includes("--dry-run");

  await dbConnect();

  const configurations =
    await ProductConfiguration.find(
      {
        status: {
          $in: [
            "submitted",
            "completed",
          ],
        },
        rfqNumber: null,
      },
      {
        configurationID: 1,
        productName: 1,
        submittedAt: 1,
      }
    )
      .sort({
        submittedAt: 1,
        createdAt: 1,
      })
      .lean();

  console.log(
    `${configurations.length} configuration(s) need an RFQ number.` +
      (dryRun ? " (dry run - nothing will be saved)" : "")
  );

  let assigned = 0;

  for (const configuration of configurations) {
    if (dryRun) {
      console.log(
        `  would number ${configuration.configurationID} (${configuration.productName || "-"})`
      );
      continue;
    }

    const rfqNumber = await nextRfqNumber();

    const result =
      await ProductConfiguration.updateOne(
        {
          _id: configuration._id,
          rfqNumber: null,
        },
        {
          $set: {
            rfqNumber,
          },
        }
      );

    if (result.modifiedCount === 1) {
      assigned += 1;

      console.log(
        `  RFQ-${rfqNumber} -> ${configuration.configurationID}`
      );
    }
  }

  if (!dryRun) {
    console.log(`Done. ${assigned} RFQ number(s) assigned.`);
  }
}


main()
  .catch((error) => {
    console.error("Backfill failed:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
