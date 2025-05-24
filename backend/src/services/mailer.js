import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Función para enviar correos
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to, 
      subject, 
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
};

export default sendEmail;
