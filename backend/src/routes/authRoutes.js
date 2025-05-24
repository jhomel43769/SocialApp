import express from 'express';
import {register, login, getProfile} from './../controller/authController.js'
import  sendEmail  from '../services/mailer.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware, getProfile);

router.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {
      await sendEmail(to, subject, text);
      res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  });

export default router;