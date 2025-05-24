import express from 'express';
import { uploadImageFromUrl, getImageById, deleteImageById, } from '../controller/imageController.js';

const router = express.Router();

router.post('/images/upload', uploadImageFromUrl);
router.get('/images/:id', getImageById);
router.delete('/images/:id', deleteImageById);

export default router;
