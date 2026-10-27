const { sendMail, emailFrom } = require('./mailer');
const User = require('../models/user');

// Utility function to calculate duration between two dates
function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return 'N/A';

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;

  if (diffMs < 0) return 'Invalid duration';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}, ${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}

// Function to format timestamp for display
function formatTimestamp(date) {
  if (!date) return 'Not complete';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}

// All RFQ emails go to the shared team inbox only.
// No fallback to the sender address.
const emailTo = process.env.ORDER_EMAIL_TO || 'config@mightylube.com';

async function sendEmail(mailOptions) {
  return sendMail({
    from: mailOptions.from || emailFrom,
    to: mailOptions.to,
    cc: mailOptions.cc,
    replyTo: mailOptions.replyTo,
    subject: mailOptions.subject,
    text: mailOptions.text,
    attachments: mailOptions.attachments,
  });
}

// PDF Document Generation
let PDFDocument;

try {
  PDFDocument = require('pdfkit');
} catch (err) {
  PDFDocument = null;
  console.warn('pdfkit module is not available. PDF generation features will be disabled.');
}

function generatePdfBuffer(text) {
  return new Promise((resolve, reject) => {
    if (!PDFDocument) return reject(new Error('PDF generation is not available.'));
    try {
      const doc = new PDFDocument({ autoFirstPage: true });
      const chunk = [];
      doc.on('data', (c) => chunk.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunk)));
      doc.on('error', reject);

      // Create header banner
      const pageWidth = doc.page.width;
      const bannerHeight = 80;

      // Header background (blue banner)
      doc.rect(0, 0, pageWidth, bannerHeight)
        .fill('#2c3e50');

      // Add logo image (if it exists)
      const logoPath = require('path').join(__dirname, '..', 'assets', 'images', 'thumbnail_Outlook-va5wa3tl.png');
      try {
        const fs = require('fs');
        if (fs.existsSync(logoPath)) {
          doc.image(logoPath, 50, 15, { width: 210, height: 50 });
          // Adjust text position to make room for logo
          doc.fillColor('white')
            .font('Helvetica-Bold')
            .fontSize(24)
            .text('MIGHTY LUBE', 280, 25, { align: 'left' });
        } else {
          // No logo, use original text position
          doc.fillColor('white')
            .font('Helvetica-Bold')
            .fontSize(24)
            .text('MIGHTY LUBE', 50, 25, { align: 'left' });
        }
      } catch (err) {
        // Fallback if image loading fails
        doc.fillColor('white')
          .font('Helvetica-Bold')
          .fontSize(24)
          .text('MIGHTY LUBE', 50, 25, { align: 'left' });
      }

      // Subtitle
      doc.fontSize(12)
        .text('Order Confirmation & Receipt', 280, 50);

      // Decorative line under banner
      doc.rect(0, bannerHeight, pageWidth, 2)
        .fill('#34495e');

      // Reset to black for content
      doc.fillColor('black')
        .font('Helvetica')
        .fontSize(12);

      // Start content below banner with some padding
      doc.y = bannerHeight + 20; // Set starting position
      doc.x = 50; // Left margin

      // Let PDFKit handle text flow and page breaks automatically
      const cleanText = String(text).replace(/\t/g, '    ').trim();
      doc.text(cleanText, {
        width: pageWidth - 100, // Right margin of 50px
        align: 'left',
        lineGap: 3 // Small gap between lines
      });

      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}

// Turns a configuration's configurationData into readable lines.
// Skips internal ids; uploaded images (stored as metadata) show as "Image attached".
function formatConfigurationData(configurationData) {
  if (!configurationData || typeof configurationData !== 'object') {
    return '';
  }

  return Object.entries(configurationData)
    .filter(([key, value]) => key !== '_id' && value !== null && value !== undefined && `${value}`.trim() !== '')
    .map(([key, value]) => {
      let text;

      if (Array.isArray(value)) {
        text = value.join(', ');
      } else if (typeof value === 'object') {
        text = value.objectKey ? 'Image attached' : JSON.stringify(value);
      } else {
        text = `${value}`;
      }

      const label = key
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/_/g, ' ')
        .replace(/^./, (c) => c.toUpperCase());

      return `            ${label}: ${text}`;
    })
    .join('\n');
}

// =========================================================
// CUSTOMER DETAILS (RFQ Finalize email)
//
// Customer:
// - Customer: Fresaders
// - City: Fremont
//
// Empty fields and empty sections are left out.
// =========================================================

const CUSTOMER_DETAIL_SECTIONS = [
  ['Customer', 'customer', [
    ['name', 'Customer'], ['address1', 'Street address'], ['address2', 'Apt / Suite'],
    ['city', 'City'], ['state', 'State'], ['postalCode', 'ZIP Code'],
    ['country', 'Country'], ['phone', 'Phone'], ['email', 'Email'],
  ]],
  ['Final Customer', 'finalCustomer', [
    ['name', 'Name'], ['address1', 'Address 1'], ['address2', 'Address 2'],
    ['city', 'City'], ['state', 'State'], ['postalCode', 'Postal'], ['country', 'Country'],
  ]],
  ['Contact', 'contact', [
    ['type', 'Type'], ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'],
  ]],
  ['Additional Information', 'additionalInfo', [
    ['orderNotes', 'Order notes'], ['consultation', 'Consultation'],
    ['projectStatus', 'Project Status'], ['install', 'Install'],
    ['shipping', 'Shipping'], ['preferredShippingDate', 'Preferred Shipping Date'],
  ]],
];

function formatCustomerDetails(customerDetails) {
  if (!customerDetails) {
    return '        Customer:\n        - No customer details';
  }

  return CUSTOMER_DETAIL_SECTIONS
    .map(([title, key, fields]) => {
      const values = customerDetails[key] || {};

      const lines = fields
        .filter(([field]) => `${values[field] || ''}`.trim() !== '')
        .map(([field, label]) => `        - ${label}: ${values[field]}`);

      return lines.length > 0
        ? `        ${title}:\n${lines.join('\n')}`
        : null;
    })
    .filter(Boolean)
    .join('\n\n');
}


// customerDetails: only passed by RFQ Finalize. Then the
// logged-in user is shown as "Submitted By" and the RFQ's
// customer details follow. Other callers are unchanged.
async function sendOrderNotification(user, orderData, actionType = 'added', configurationName = null, customerDetails = undefined) {
  try {
    // Check if orderData is an array (configuration order) or single order
    if (Array.isArray(orderData)) {
      // Configuration order with multiple items
      const cartItems = orderData;
      // All RFQs of one Finalize share the same project (or none).
      const projectItem = cartItems.find((item) => item.projectName);
      const projectLine = projectItem
        ? `${projectItem.projectNumber ? `P-${projectItem.projectNumber} – ` : ''}${projectItem.projectName}`
        : null;
      const finalConfigName = configurationName || (projectLine ? `Project ${projectLine}` : 'Configuration Order');

      const itemsList = cartItems.map((item, index) => {
        const configList = formatConfigurationData(item.configurationData);

        return `
          Item ${index + 1}:
          - RFQ Number: ${item.rfqNumber ? `RFQ-${item.rfqNumber}` : 'N/A'}
          - Product: ${item.productName || item.productType || 'N/A'}
          - Product ID: ${item.productType || 'N/A'}
          - Quantity: ${item.numRequested || 'N/A'}
          - Submitted: ${formatTimestamp(item.submittedAt || item.updatedAt)}
          - Configuration:
${configList || '            No configuration details'}
        `;
      }).join('\n');

      // Get order ID from the first item if available
      const firstOrderID = cartItems.length > 0 && cartItems[0].orderID ? cartItems[0].orderID : null;
      const orderIdText = firstOrderID ? ` - Order ID: ${firstOrderID}` : '';

      // Customize email content based on action type
      let emailHeader, emailSubject;
      if (actionType.toLowerCase() === 'complete') {
        emailHeader = `ORDER COMPLETE - Configuration Order${orderIdText}`;
        emailSubject = `Order Complete: ${finalConfigName} - ${user.firstName} ${user.lastName}`;
      } else {
        emailHeader = `${actionType.toUpperCase()} CONFIGURATION ORDER${orderIdText}`;
        emailSubject = `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Configuration Order: ${finalConfigName} - ${user.firstName} ${user.lastName}`;
      }

      const emailContent = `
        ${emailHeader}
        
        ${actionType.toLowerCase() === 'complete' ? 'Your configuration order has been successfully complete and is ready for delivery/pickup!' : ''}
        
        ${customerDetails === undefined ? 'Customer Information' : 'Submitted By'}:
        - Name: ${user.firstName} ${user.lastName}
        - Email: ${user.email}
        - Company: ${user.companyName || 'N/A'}
        ${customerDetails === undefined ? '' : `
${formatCustomerDetails(customerDetails)}
`}
        Configuration Name: ${finalConfigName}
        Project: ${projectLine || 'Standalone'}
        Total Items: ${cartItems.length}
        ${actionType.toLowerCase() === 'complete' ? 'Status: COMPLETE' : ''}
        
        ORDER DETAILS:
          ${itemsList}
      `;

      const mailOptions = {
        from: emailFrom,
        to: emailTo,
        //cc: user.email,
        subject: emailSubject,
        text: emailContent,
      };

      // Generate and attach PDF if available
      if (PDFDocument) {
        try {
          const pdfBuffer = await generatePdfBuffer(emailContent);
          mailOptions.attachments = [{ filename: `configuration_order_${Date.now()}.pdf`, content: pdfBuffer }];
        } catch (err) {
          console.warn('Could not generate PDF for configuration order:', err);
        }
      }

      await sendEmail(mailOptions);
      console.log(`Configuration order email sent for: ${finalConfigName}`);

    } else {
      // Single order
      const config = orderData.productConfigurationInfo || {};
      const configList = Object.entries(config).map(([key, value]) => `  ${key}: ${value}`).join('\n');

      // Get timing information for single order
      const createdTime = formatTimestamp(orderData.orderCreated);
      const completeTime = formatTimestamp(orderData.completeDate);
      const duration = orderData.processingDuration ? orderData.processingDuration.formatted : calculateDuration(orderData.orderCreated, orderData.completeDate);

      // Customize email content based on action type
      let emailHeader, emailSubject;
      if (actionType.toLowerCase() === 'complete') {
        emailHeader = `ORDER COMPLETE - ${orderData.productType}`;
        emailSubject = `Order Complete: ${orderData.productType} - ${user.firstName} ${user.lastName}`;
      } else {
        emailHeader = `${actionType.toUpperCase()} ORDER`;
        emailSubject = `Order ${actionType}: ${orderData.productType} - ${user.firstName} ${user.lastName}`;
      }

      const emailContent = `
        ${emailHeader}
        
        ${actionType.toLowerCase() === 'complete' ? 'Your order has been successfully complete and is ready for delivery/pickup!' : ''}
        
        Customer Information:
        - Name: ${user.firstName} ${user.lastName}
        - Email: ${user.email}
        - Company: ${user.companyName}
        
        Product Type: ${orderData.productType}
        Quantity Requested: ${orderData.numRequested}
        Order ID: ${orderData.orderID || 'Pending'}
        Created: ${createdTime}
        Completed: ${completeTime}
        Processing Time: ${duration}
        ${actionType.toLowerCase() === 'complete' ? 'Status: COMPLETE' : ''}
        
        Configuration Details:
          ${configList || '  No configuration details'}
    `;

      const mailOptions = {
        from: emailFrom,
        to: emailTo,
        cc: user.email,
        subject: emailSubject,
        text: emailContent,
      };

      // Generate and attach PDF if available
      if (PDFDocument) {
        try {
          const pdfBuffer = await generatePdfBuffer(emailContent);
          mailOptions.attachments = [{ filename: `order_${orderData.orderID || Date.now()}.pdf`, content: pdfBuffer }];
        } catch (err) {
          console.warn('Could not generate PDF for single order:', err);
        }
      }

      await sendEmail(mailOptions);
      console.log(`Email notification sent for order ${actionType}`);
    }
  } 
  catch (error) { 
    console.error('Failed to send email notification:', error); 
  }
}

// =========================================================
// AWAITING RESPONSE EMAIL (to the RFQ creator)
//
// Sent every time an admin sets an RFQ to Awaiting Response.
// Uses the client's template. Replies go to the team inbox.
//
// Returns true when the SMTP server accepted the email, false
// otherwise. Never throws, so the status change is not
// blocked by an email problem.
// =========================================================

async function sendAwaitingResponseEmail(user, configuration) {
  try {
    if (!user || !user.email) {
      console.warn(`Awaiting Response email skipped: no email for user ${configuration.userID}`);
      return false;
    }

    const rfqText = configuration.rfqNumber ? `RFQ-${configuration.rfqNumber}` : 'N/A';

    const projectLine = configuration.projectName
      ? `Project: ${configuration.projectNumber ? `P-${configuration.projectNumber} – ` : ''}${configuration.projectName}\n`
      : '';

    const text = `Hello ${user.firstName || 'there'},

Thank you for submitting your request for a quote. We appreciate your interest in our products and services.

RFQ Number: ${rfqText}
${projectLine}
We need a few additional details before we can complete your quote. A brief conversation will help us confirm your requirements and prepare an accurate quote promptly.

Please reply with a few convenient times for a conference call, including your time zone, or call our office directly at 231.924.6160.

Thank you,
Mighty Lube
`;

    const result = await sendEmail({
      to: user.email,
      replyTo: emailTo,
      subject: `Additional details needed – ${rfqText}`,
      text,
    });

    if (!result || (result.rejected && result.rejected.length > 0)) {
      console.error('Awaiting Response email rejected:', result && result.rejected);
      return false;
    }

    console.log(`Awaiting Response email sent for ${rfqText} to user ${configuration.userID}`);
    return true;
  } catch (error) {
    console.error('Failed to send Awaiting Response email:', error);
    return false;
  }
}

module.exports = { sendOrderNotification, sendAwaitingResponseEmail };
