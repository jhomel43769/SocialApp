import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import authRoutes from './src/routes/authRoutes.js';
import imageRoutes from './src/routes/imageRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/auth', authRoutes,);

app.use('/api/image', imageRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});