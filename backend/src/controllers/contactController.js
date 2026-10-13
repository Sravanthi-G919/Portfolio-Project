
const pool = require("../config/db");
const nodemailer = require("nodemailer");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required"
      });
    }

    // Save the message in PostgreSQL
    const result = await pool.query(
      `INSERT INTO messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, message]
    );

    console.log("Contact message saved in database.");

    // Check Gmail configuration
    if (!process.env.EMAIL_USER ||
        !process.env.EMAIL_APP_PASSWORD) {
      console.error("Gmail configuration is missing.");

      return res.status(500).json({
        message: "Email configuration is missing"
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
      }
    });

    console.log("Attempting to send email...");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    console.log("Email accepted by mail server:", info.messageId);

    return res.status(201).json({
      message: "Message sent successfully",
      data: result.rows[0]
    });

  } catch (error) {
    console.error("Contact/email error:", error.message);

    return res.status(500).json({
      message: "Message saved, but email could not be sent"
    });
  }
};

module.exports = { createMessage };