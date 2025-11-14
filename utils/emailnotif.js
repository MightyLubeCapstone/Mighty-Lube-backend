const nodemailer = require('nodemailer');
const User = require('../models/user');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "mightylube.test@gmail.com",
    pass: "xrav hwrm zhok fdlv",
  },
  tls: {
    rejectUnauthorized: false,
  }
});

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

      doc.fontSize(12);
      const lines = String(text).split('\n');
      lines.forEach((line) => {
        doc.text(line.replace(/\t/g, '    '));
      });
      doc.end();
    } catch (e) {
      reject(e);
    }
  });
}
async function sendOrderNotification(user, orderData, actionType = 'added') {
  try {
    // Check if orderData is an array (configuration order) or single order
    if (Array.isArray(orderData)) {
      // Configuration order with multiple items
      const configurationName = actionType; // Reuse actionType parameter for configuration name
      const cartItems = orderData;
      
      const itemsList = cartItems.map((item, index) => {
        const config = item.productConfigurationInfo || {};
        const configList = Object.entries(config).map(([key, value]) => `    ${key}: ${value}`).join('\n');
        
        return `
      Item ${index + 1}:
      - Product Type: ${item.productType || 'N/A'}
      - Quantity: ${item.numRequested || 'N/A'}
      - Order ID: ${item.orderID || 'Pending'}
      - Configuration:
${configList || '    No configuration details'}
    `;
      }).join('\n');

      const emailContent = `
      CONFIGURATION ORDER
      
      Customer Information:
      - Name: ${user.firstName} ${user.lastName}
      - Email: ${user.email}
      - Company: ${user.companyName || 'N/A'}
      
      Configuration Name: ${configurationName}
      Total Items: ${cartItems.length}
      
      ORDER DETAILS:
      ${itemsList}
    `;

      const mailOptions = {
        from: "mightylube.test@gmail.com",
        to: "mightylube.test@gmail.com",
        subject: `New Configuration Order: ${configurationName} - ${user.firstName} ${user.lastName}`,
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

      await transporter.sendMail(mailOptions);
      console.log(`Configuration order email sent for: ${configurationName}`);
    } else {
      // Single order
      const config = orderData.productConfigurationInfo || {};
      const configList = Object.entries(config).map(([key, value]) => `  ${key}: ${value}`).join('\n');
      
      const emailContent = `
      Order ${actionType.toUpperCase()}
      
      User: ${user.firstName} ${user.lastName}
      Email: ${user.email}
      Company: ${user.companyName}
      
      Product Type: ${orderData.productType}
      Quantity Requested: ${orderData.numRequested}
      Order ID: ${orderData.orderID || 'Pending'}
      
      Configuration Details:
${configList || '  No configuration details'}
    `;

      const mailOptions = {
        from: "mightylube.test@gmail.com",
        to: "mightylube.test@gmail.com",
        subject: `Order ${actionType}: ${orderData.productType} - ${user.firstName} ${user.lastName}`,
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

      await transporter.sendMail(mailOptions);
      console.log(`Email notification sent for order ${actionType}`);
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

module.exports = { sendOrderNotification };