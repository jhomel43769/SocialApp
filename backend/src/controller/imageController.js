import Image from "../models/image.js";

export const uploadImageFromUrl = async (req, res) => {
    try {
        const { description, imageUrl } = req.body;

        if (!description || !imageUrl) {
            return res.status(400).json({ error: 'Description and image URL are required' });
        }

        const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(imageUrl);
        if (!isValidUrl) {
            return res.status(400).json({ error: 'Invalid URL format' });
        }

        const image = new Image({ description, url: imageUrl });
        await image.save();

        res.status(201).json({ message: 'Image uploaded successfully', image });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getImageById = async (req, res) => {
    try {
      const { id } = req.params; 
      const image = await Image.findById(id);
  
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.status(200).json({ url: image.url }); 
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export const deleteImageById = async (req, res) => {
    try {
      const { id } = req.params;  
      const image = await Image.findByIdAndDelete(id);  
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };