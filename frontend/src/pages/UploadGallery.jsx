import React, { useState } from 'react';

const UploadGallery = () => {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Use the environment variable for the API URL
  const API_URL = import.meta.env.VITE_API_URL;

  // Helper: File -> Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile || !title) return alert("Select image and title");

    setUploading(true);
    try {
      const base64Image = await convertToBase64(imageFile);

      // SEND TO MONGODB BACKEND using dynamic API_URL
      const response = await fetch(`${API_URL}/api/gallery/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image: base64Image }),
      });

      if (response.ok) {
        alert("Image uploaded to MongoDB!");
        setTitle('');
        setImageFile(null);
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error: Ensure backend server is running.");
    }
    setUploading(false);
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload to MongoDB Gallery</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded" placeholder="Image Title" required />
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full p-3 border rounded" required />
          <button type="submit" disabled={uploading} className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadGallery;