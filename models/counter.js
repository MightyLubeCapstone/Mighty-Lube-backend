const mongoose = require("mongoose");


// =========================================================
// COUNTER
//
// Simple named sequence used for human-readable numbers.
//
// Example:
//
// { name: "rfq", seq: 10003 }
//
// nextSequence() uses one atomic findOneAndUpdate ($inc),
// so two requests at the same time can never get the same
// number.
// =========================================================

const CounterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    seq: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);


// Own model name and collection: utils/orderutils.js already
// registers a "Counter" model ({ _id, sequence_value }) on the
// "counters" collection for order IDs.
const Counter =
  mongoose.models.RfqCounter ||
  mongoose.model(
    "RfqCounter",
    CounterSchema,
    "rfq_counters"
  );


// =========================================================
// RFQ NUMBERS
//
// 5 digits: 10001 -> 99999
// =========================================================

const RFQ_COUNTER = "rfq";

const RFQ_FIRST_NUMBER = 10001;

const RFQ_LAST_NUMBER = 99999;


async function nextSequence(
  name,
  firstNumber
) {
  // First call creates the counter at (firstNumber - 1)
  // and increments it, so it returns firstNumber.
  const counter =
    await Counter.findOneAndUpdate(
      { name },
      [
        {
          $set: {
            seq: {
              $add: [
                {
                  $ifNull: [
                    "$seq",
                    firstNumber - 1,
                  ],
                },
                1,
              ],
            },
          },
        },
      ],
      {
        new: true,
        upsert: true,
      }
    );

  return counter.seq;
}


async function nextRfqNumber() {
  const rfqNumber =
    await nextSequence(
      RFQ_COUNTER,
      RFQ_FIRST_NUMBER
    );

  if (rfqNumber > RFQ_LAST_NUMBER) {
    throw new Error(
      "RFQ number limit reached (99999)."
    );
  }

  return rfqNumber;
}


// =========================================================
// PROJECT NUMBERS
//
// Separate counter from RFQ numbers.
// 5 digits: 10001 -> 99999, shown as P-10001.
// =========================================================

const PROJECT_COUNTER = "project";


async function nextProjectNumber() {
  const projectNumber =
    await nextSequence(
      PROJECT_COUNTER,
      RFQ_FIRST_NUMBER
    );

  if (projectNumber > RFQ_LAST_NUMBER) {
    throw new Error(
      "Project number limit reached (99999)."
    );
  }

  return projectNumber;
}


module.exports = {
  Counter,
  nextSequence,
  nextRfqNumber,
  nextProjectNumber,
};
