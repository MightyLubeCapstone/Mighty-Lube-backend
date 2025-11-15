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
          doc.image(logoPath, 50, 15, { width: 50, height: 50 });
          // Adjust text position to make room for logo
          doc.fillColor('white')
             .font('Helvetica-Bold')
             .fontSize(24)
             .text('MIGHTY LUBE', 110, 25, { align: 'left' });
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
         .text('Order Confirmation & Receipt', 110, 50);
      
      // Decorative line under banner
      doc.rect(0, bannerHeight, pageWidth, 2)
         .fill('#34495e');
      
      // Reset to black for content
      doc.fillColor('black')
         .font('Helvetica')
         .fontSize(12);
      
      // Start content below banner with some padding
      let yPosition = bannerHeight + 20;
      
      const lines = String(text).split('\n');
      lines.forEach((line) => {
        // Skip empty lines at the start and add proper spacing
        if (line.trim() || yPosition > bannerHeight + 20) {
          doc.text(line.replace(/\t/g, '    '), 50, yPosition);
          yPosition += 15; // Line spacing
        }
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

      // Get order ID from the first item if available
      const firstOrderID = cartItems.length > 0 && cartItems[0].orderID ? cartItems[0].orderID : null;
      const orderIdText = firstOrderID ? ` - Order ID: ${firstOrderID}` : '';
      
      const emailContent = `
      CONFIGURATION ORDER${orderIdText}
      
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
        cc: user.email,
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
        cc: user.email,
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