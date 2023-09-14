const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// Function to send emails using Nodemailer and Elastic Email SMTP
const sendEmailViaSMTP = async ({ to, subject, text, html }) => {
  // Create a Nodemailer transporter using Elastic Email SMTP settings
  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.elasticemail.com",
      port: 2525, // Use port 2525 for SMTP
      auth: {
        user: "adeeb1234098@gmail.com", // Your Elastic Email username
        pass: "4CE1EE83C34D6E162EEFB7A21FEC4F9E82CA",  // Your Elastic Email API key as the password
      },
    })
  );

  // Email data
  const mailOptions = {
    from: "adeebansari120@gmail.com", // Replace with your verified Elastic Email sender email address
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return info.response; // You can return the response object here if needed
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV !== "development") {
    return Promise.resolve(); // Don't send emails in production
  } else {
    return sendEmailViaSMTP(args);
  }
};
