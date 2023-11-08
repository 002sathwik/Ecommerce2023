import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

// Create an email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_URL,
    pass: process.env.EMAIL_PASS,
  },
});

const emailController = {
  sendEmail: async (req, res) => {
    try {
      const { to, subject, message } = req.body;

      // Configure email content
      const mailOptions = {
        from: process.env.EMAIL_URL,
        to,
        subject,
        text: message,
      };

      // Send email
      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email send failed with error:', error);
      res.status(500).json({ error: 'Email send failed' });
    }
  },
};

export default emailController;
