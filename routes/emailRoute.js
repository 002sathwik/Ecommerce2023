import express from 'express';
const router = express.Router();
import { requireSignIN } from '../middlewares/authMiddleware.js'; 
import emailController from '../controllers/emailController.js';

// Define a route to send an email
router.post('/send', requireSignIN, emailController.sendEmail);

export default router;
