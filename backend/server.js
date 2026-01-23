require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const uri = process.env.MONGO_URI;
const clientOptions = { 
  serverApi: { version: '1', strict: true, deprecationErrors: true },
  family: 4 
};

mongoose.connect(uri, clientOptions)
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- SCHEMAS ---
const ImageSchema = new mongoose.Schema({
  title: String,
  imageData: String,
  createdAt: { type: Date, default: Date.now }
});
const GalleryImage = mongoose.model('GalleryImage', ImageSchema);

const ResidentialSchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  price: String,
  imageData: String,
  createdAt: { type: Date, default: Date.now }
});
const ResidentialProject = mongoose.model('ResidentialProject', ResidentialSchema);

const CommercialSchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  price: String,
  imageData: String,
  createdAt: { type: Date, default: Date.now }
});
const CommercialProject = mongoose.model('CommercialProject', CommercialSchema);


// --- ROUTES ---

// -- Gallery Routes --
app.get('/api/gallery', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) { res.status(500).json({ error: "Fetch Failed" }); }
});

app.post('/api/gallery/upload', async (req, res) => {
  try {
    const { title, image } = req.body;
    const newImage = new GalleryImage({ title, imageData: image });
    await newImage.save();
    res.status(201).json({ message: "Image Saved" });
  } catch (error) { res.status(500).json({ error: "Upload Failed" }); }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ error: "Delete Failed" }); }
});

app.put('/api/gallery/:id', async (req, res) => {
  try {
    const { title } = req.body;
    await GalleryImage.findByIdAndUpdate(req.params.id, { title });
    res.json({ message: "Updated" });
  } catch (error) { res.status(500).json({ error: "Update Failed" }); }
});


// -- Residential Routes --
app.get('/api/residential', async (req, res) => {
  try {
    const projects = await ResidentialProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) { res.status(500).json({ error: "Fetch Failed" }); }
});

app.post('/api/residential/add', async (req, res) => {
  try {
    const newProject = new ResidentialProject({ ...req.body, imageData: req.body.image });
    await newProject.save();
    res.status(201).json({ message: "Residential Project Added" });
  } catch (error) { res.status(500).json({ error: "Add Failed" }); }
});

// ✅ ADDED: Update Residential Project
app.put('/api/residential/:id', async (req, res) => {
  try {
    const { title, location, type, price, image } = req.body;
    
    // Create update object
    const updateData = { title, location, type, price };
    
    // Only update image if a new one is provided
    if (image) {
      updateData.imageData = image;
    }

    await ResidentialProject.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Residential Project Updated" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: "Update Failed" }); 
  }
});

app.delete('/api/residential/:id', async (req, res) => {
  try {
    await ResidentialProject.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ error: "Delete Failed" }); }
});


// -- Commercial Routes --
app.get('/api/commercial', async (req, res) => {
  try {
    const projects = await CommercialProject.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) { res.status(500).json({ error: "Fetch Failed" }); }
});

app.post('/api/commercial/add', async (req, res) => {
  try {
    const newProject = new CommercialProject({ ...req.body, imageData: req.body.image });
    await newProject.save();
    res.status(201).json({ message: "Commercial Project Added" });
  } catch (error) { res.status(500).json({ error: "Add Failed" }); }
});

// ✅ ADDED: Update Commercial Project
app.put('/api/commercial/:id', async (req, res) => {
  try {
    const { title, location, type, price, image } = req.body;
    
    const updateData = { title, location, type, price };
    if (image) {
      updateData.imageData = image;
    }

    await CommercialProject.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: "Commercial Project Updated" });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: "Update Failed" }); 
  }
});

app.delete('/api/commercial/:id', async (req, res) => {
  try {
    await CommercialProject.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ error: "Delete Failed" }); }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});