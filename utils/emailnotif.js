const nodemailer = require('nodemailer');
const User = require('../models/user');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: "mightylubeemailtest@gmail.com",
    pass: "lucasdevangavingavinnoah",
  },
});

async function sendOrderNotification(user, orderData, actionType = 'added') {
  try {
    // Check if orderData is an array (configuration order) or single order
    if (Array.isArray(orderData)) {
      // Configuration order with multiple items
      const configurationName = actionType; // Reuse actionType parameter for configuration name
      const cartItems = orderData;
      
      const itemsList = cartItems.map((item, index) => `
      Item ${index + 1}:
      - Product Type: ${item.productType || 'N/A'}
      - Quantity: ${item.numRequested || 'N/A'}
      - Order ID: ${item.orderID || 'Pending'}
      - Configuration: ${JSON.stringify(item.productConfigurationInfo || {}, null, 4)}
    `).join('\n');

      const emailContent = `
      NEW CONFIGURATION ORDER CREATED
      
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
        from: "mightylubeemailtest@gmail.com",
        to: "mightylubeemailtest@gmail.com",
        subject: `New Configuration Order: ${configurationName} - ${user.firstName} ${user.lastName}`,
        text: emailContent,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Configuration order email sent for: ${configurationName}`);
    } else {
      // Single order
      const emailContent = `
      Order ${actionType.toUpperCase()}
      
      User: ${user.firstName} ${user.lastName}
      Email: ${user.email}
      Company: ${user.companyName}
      
      Product Type: ${orderData.productType}
      Quantity Requested: ${orderData.numRequested}
      Order ID: ${orderData.orderID || 'Pending'}
      
      Configuration Details:
      ${JSON.stringify(orderData.productConfigurationInfo, null, 2)}
    `;

      const mailOptions = {
        from: "mightylubeemailtest@gmail.com",
        to: "mightylubeemailtest@gmail.com",
        subject: `Order ${actionType}: ${orderData.productType} - ${user.firstName} ${user.lastName}`,
        text: emailContent,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email notification sent for order ${actionType}`);
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

module.exports = { sendOrderNotification };