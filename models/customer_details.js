const mongoose = require("mongoose");


// =========================================================
// CUSTOMER DETAILS
//
// Who the RFQs are for. Entered at Finalize:
//
// - Project RFQs    -> saved once on the Project and shared
//                      by every RFQ in it (edits are live).
// - Standalone RFQs -> saved on each RFQ.
//
// Four sections, all plain text:
//
// customer        Customer name, address, phone, email
// finalCustomer   Final destination address
// contact         Contact type, name, email, phone
// additionalInfo  Notes, consultation, project status,
//                 install, shipping, preferred ship date
//
// Dropdown values ("Other" + typed text) arrive as the
// final text, e.g. "Collect" or "Customer's own truck".
//
// Required: customer country, address1, city, state,
// postalCode, phone, email.
// =========================================================

const SECTIONS = {
  customer: [
    "name",
    "country",
    "address1",
    "address2",
    "city",
    "state",
    "postalCode",
    "phone",
    "email",
  ],

  finalCustomer: [
    "name",
    "address1",
    "address2",
    "city",
    "state",
    "postalCode",
    "country",
  ],

  contact: [
    "type",
    "name",
    "email",
    "phone",
  ],

  additionalInfo: [
    "orderNotes",
    "consultation",
    "projectStatus",
    "install",
    "shipping",
    "preferredShippingDate",
  ],
};

const REQUIRED_CUSTOMER_FIELDS = {
  country: "Country / Region",
  address1: "Street address",
  city: "Town / City",
  state: "State",
  postalCode: "ZIP Code",
  phone: "Phone",
  email: "Email address",
};

const LONG_FIELDS = ["orderNotes"];

const FIELD_MAX_LENGTH = 200;

const LONG_FIELD_MAX_LENGTH = 2000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function sectionSchema(fields) {
  const definition = {};

  for (const field of fields) {
    definition[field] = {
      type: String,
      default: "",
      trim: true,
    };
  }

  return new mongoose.Schema(definition, {
    _id: false,
  });
}


const customerDetailsSchema = new mongoose.Schema(
  {
    customer: {
      type: sectionSchema(SECTIONS.customer),
      default: () => ({}),
    },

    finalCustomer: {
      type: sectionSchema(SECTIONS.finalCustomer),
      default: () => ({}),
    },

    contact: {
      type: sectionSchema(SECTIONS.contact),
      default: () => ({}),
    },

    additionalInfo: {
      type: sectionSchema(SECTIONS.additionalInfo),
      default: () => ({}),
    },
  },
  {
    _id: false,
  }
);


// =========================================================
// NORMALIZE + VALIDATE
//
// Returns { value } with only the known fields as trimmed
// text, or { error } with a message for the user.
// =========================================================

function normalizeCustomerDetails(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      error: "Customer details are required",
    };
  }

  const value = {};

  for (const [section, fields] of Object.entries(SECTIONS)) {
    const source =
      input[section] && typeof input[section] === "object"
        ? input[section]
        : {};

    value[section] = {};

    for (const field of fields) {
      const raw = source[field];

      const text =
        raw === undefined || raw === null
          ? ""
          : `${raw}`.trim();

      const maxLength = LONG_FIELDS.includes(field)
        ? LONG_FIELD_MAX_LENGTH
        : FIELD_MAX_LENGTH;

      if (text.length > maxLength) {
        return {
          error: `${field} must be ${maxLength} characters or less`,
        };
      }

      value[section][field] = text;
    }
  }

  for (const [field, label] of Object.entries(REQUIRED_CUSTOMER_FIELDS)) {
    if (!value.customer[field]) {
      return {
        error: `${label} is required`,
      };
    }
  }

  if (!EMAIL_PATTERN.test(value.customer.email)) {
    return {
      error: "Customer email address is not valid",
    };
  }

  if (
    value.contact.email &&
    !EMAIL_PATTERN.test(value.contact.email)
  ) {
    return {
      error: "Contact email address is not valid",
    };
  }

  return {
    value,
  };
}


// Old projects / RFQs have no details yet.
function hasCustomerDetails(details) {
  return Boolean(
    details &&
    details.customer &&
    details.customer.email
  );
}


module.exports = {
  customerDetailsSchema,
  normalizeCustomerDetails,
  hasCustomerDetails,
};
