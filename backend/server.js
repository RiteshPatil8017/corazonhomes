require('dotenv').config(); // Load the .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// --- UPDATED CONNECTION LOGIC (FIX FOR WINDOWS ERROR) ---
const uri = process.env.MONGO_URI;

const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  family: 4 // Forces IPv4 to prevent connection timeouts on some networks
};

mongoose.connect(uri, clientOptions)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
  });
// -----------------------------

const ImageSchema = new mongoose.Schema({
  title: String,
  imageData: String,
  createdAt: { type: Date, default: Date.now }
});

const GalleryImage = mongoose.model('GalleryImage', ImageSchema);

app.post('/api/gallery/upload', async (req, res) => {
  try {
    const { title, image } = req.body;
    const newImage = new GalleryImage({ title, imageData: image });
    await newImage.save();
    res.status(201).json({ message: "Image Saved to MongoDB" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload Failed" });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Fetch Failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});