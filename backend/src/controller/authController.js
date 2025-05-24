import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import  sendEmail  from '../services/mailer.js'; 

export const register = async (req, res) => {
  try {
    const { name, lastname, username, email, password, phone, birth } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already in use" });
    }

    // Crear un nuevo usuario
    const user = new User({
      name,
      lastname,
      username,
      email: email.toLowerCase(),
      password,
      phone,
      birth
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Enviar correo de bienvenida
    await sendEmail(
      email, // Destinatario
      'Bienvenido a nuestra plataforma', // Asunto
      `Hola ${name}, gracias por registrarte en nuestra plataforma.` // Cuerpo del correo
    );

    // Excluir la contraseña de la respuesta
    const userResponse = user.toObject();
    delete userResponse.password;

    // Respuesta exitosa
    res.status(201).json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};