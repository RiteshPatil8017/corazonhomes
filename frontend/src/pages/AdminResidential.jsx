import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Upload, MapPin, Home, IndianRupee } from 'lucide-react';

const AdminResidential = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', location: '', type: '', price: '', imageFile: null
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/residential`);
      const data = await res.json();
      setProjects(data);
    } catch (err) { console.error("Error fetching projects"); }
  };

  useEffect(() => { fetchProjects(); }, [API_URL]);

  // Convert image to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageFile) return alert("Please upload an image");
    
    setLoading(true);
    try {
      const base64Image = await convertToBase64(formData.imageFile);
      const payload = { 
        title: formData.title,
        location: formData.location,
        type: formData.type,
        price: formData.price,
        image: base64Image 
      };

      const res = await fetch(`${API_URL}/api/residential/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Project Added Successfully!");
        setFormData({ title: '', location: '', type: '', price: '', imageFile: null });
        // Reset file input visually
        document.getElementById('fileInput').value = "";
        fetchProjects(); 
      } else {
        alert("Failed to save project.");
      }
    } catch (err) { 
      console.error(err);
      alert("Error submitting form"); 
    }
    setLoading(false);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(!confirm("Are you sure you want to delete this project?")) return;
    try {
      await fetch(`${API_URL}/api/residential/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="pt-28 pb-12 min-h-screen bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ADD FORM */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
          <div className="mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
              <Plus className="text-yellow-600" /> Add New Project
            </h2>
            <p className="text-sm text-gray-500 mt-1">Enter project details to display on the Residential page.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Project Title</label>
              <input type="text" placeholder="e.g. The Grand Horizon" className="w-full p-3 border border-gray-200 rounded focus:border-yellow-600 outline-none transition" 
                value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input type="text" placeholder="e.g. Wakad, Pune" className="w-full pl-9 p-3 border border-gray-200 rounded focus:border-yellow-600 outline-none transition" 
                    value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Price</label>
                <div className="relative">
                  <IndianRupee size={16} className="absolute left-3 top-3.5 text-gray-400" />
                  <input type="text" placeholder="e.g. 85 Lacs" className="w-full pl-9 p-3 border border-gray-200 rounded focus:border-yellow-600 outline-none transition" 
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Unit Type</label>
              <div className="relative">
                <Home size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input type="text" placeholder="e.g. 2 & 3 BHK Premium Homes" className="w-full pl-9 p-3 border border-gray-200 rounded focus:border-yellow-600 outline-none transition" 
                  value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Project Image</label>
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-50 transition group relative">
                <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="fileInput" 
                  onChange={e => setFormData({...formData, imageFile: e.target.files[0]})} />
                <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-700">
                  <Upload size={32} className="text-gray-300 group-hover:text-yellow-600 transition" />
                  {formData.imageFile ? (
                    <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">{formData.imageFile.name}</span>
                  ) : (
                    <span className="text-sm">Click to upload image (Max 50MB)</span>
                  )}
                </div>
              </div>
            </div>

            <button disabled={loading} className={`w-full bg-gray-900 text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-black transition shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {loading ? "Uploading..." : "Add Project"}
            </button>
          </form>
        </div>

        {/* LIST OF PROJECTS */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Existing Projects</h2>
            <span className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full text-gray-600">{projects.length} Total</span>
          </div>
          
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p._id} className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex gap-4 items-center">
                <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <img src={p.imageData} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                
                <div className="flex-grow min-w-0">
                  <h3 className="font-bold text-gray-900 truncate text-lg">{p.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1 mb-2">
                    <MapPin size={12} className="mr-1" /> {p.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{p.type}</span>
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-bold border border-yellow-100">₹ {p.price}</span>
                  </div>
                </div>

                <button onClick={() => handleDelete(p._id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition" title="Delete Project">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            
            {projects.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-400">No projects found. Add one to get started!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminResidential;