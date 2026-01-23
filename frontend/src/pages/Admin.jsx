import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Upload, Building2, Image as ImageIcon, LayoutGrid, Edit2, X } from 'lucide-react';

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState('projects'); 
  
  // Data States
  const [residentialProjects, setResidentialProjects] = useState([]);
  const [commercialProjects, setCommercialProjects] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]); 

  // Project Form State
  const [projectData, setProjectData] = useState({
    category: 'Residential',
    title: '', location: '', type: '', price: '', imageFile: null
  });
  const [editingProjectId, setEditingProjectId] = useState(null); // Track project edit state

  // Gallery Form State
  const [galleryData, setGalleryData] = useState({ title: '', imageFile: null });
  const [editingGalleryId, setEditingGalleryId] = useState(null); 

  const [loading, setLoading] = useState(false);

  // --- SAFEGUARD ---
  if (!API_URL) {
    return (
      <div className="pt-32 text-center text-red-600 font-bold">
        Error: VITE_API_URL is missing. <br/> 
        Please check your frontend/.env file and restart the server.
      </div>
    );
  }

  // --- FETCH DATA ---
  const fetchData = async () => {
    try {
      const resRes = await fetch(`${API_URL}/api/residential`);
      const resComm = await fetch(`${API_URL}/api/commercial`);
      const resGal = await fetch(`${API_URL}/api/gallery`); 
      
      if (resRes.ok) setResidentialProjects(await resRes.json());
      if (resComm.ok) setCommercialProjects(await resComm.json());
      if (resGal.ok) setGalleryImages(await resGal.json());
    } catch (err) { console.error("Fetch error:", err); }
  };

  useEffect(() => { fetchData(); }, [API_URL]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // --- PROJECT LOGIC ---

  // 1. Populate form for Editing
  const startEditProject = (project, category) => {
    setProjectData({
      category: category,
      title: project.title,
      location: project.location,
      type: project.type,
      price: project.price,
      imageFile: null // Reset file input (image is optional on update)
    });
    setEditingProjectId(project._id);
    
    // Smooth scroll to top form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. Cancel Editing
  const cancelEditProject = () => {
    setProjectData({ category: 'Residential', title: '', location: '', type: '', price: '', imageFile: null });
    setEditingProjectId(null);
    if(document.getElementById('projFile')) document.getElementById('projFile').value = "";
  };

  // 3. Submit Project (Add or Update)
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    // If adding new, image is required. If editing, it's optional.
    if (!editingProjectId && !projectData.imageFile) return alert("Image required");
    
    setLoading(true);

    try {
      let base64 = null;
      if (projectData.imageFile) {
        base64 = await convertToBase64(projectData.imageFile);
      }

      // Prepare Payload
      const payload = { 
        title: projectData.title,
        location: projectData.location,
        type: projectData.type,
        price: projectData.price
      };
      // Only attach image if a new one was selected
      if (base64) payload.image = base64;

      // Determine URL & Method
      const isRes = projectData.category === 'Residential';
      const baseUrl = isRes ? `${API_URL}/api/residential` : `${API_URL}/api/commercial`;
      
      let url, method;

      if (editingProjectId) {
        url = `${baseUrl}/${editingProjectId}`;
        method = 'PUT';
      } else {
        url = `${baseUrl}/add`;
        method = 'POST';
      }

      const res = await fetch(url, {
        method: method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(editingProjectId ? "Project Updated Successfully!" : "Project Added Successfully!");
        cancelEditProject(); // Reset Form
        fetchData(); // Refresh List
      } else {
        alert("Failed to save project.");
      }
    } catch (err) { console.error(err); alert("Error saving project"); }
    setLoading(false);
  };

  // --- GALLERY SUBMIT ---
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingGalleryId) {
        // Update
        const res = await fetch(`${API_URL}/api/gallery/${editingGalleryId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: galleryData.title })
        });
        if (res.ok) alert("Image details updated!");
      } else {
        // Upload
        if (!galleryData.imageFile) { alert("Image required for new upload"); setLoading(false); return; }
        const base64 = await convertToBase64(galleryData.imageFile);
        const res = await fetch(`${API_URL}/api/gallery/upload`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: galleryData.title, image: base64 })
        });
        if (res.ok) alert("Gallery Image Uploaded!");
      }

      // Reset
      setGalleryData({ title: '', imageFile: null });
      setEditingGalleryId(null);
      if(document.getElementById('galFile')) document.getElementById('galFile').value = "";
      fetchData();

    } catch (err) { alert("Error saving gallery image"); }
    setLoading(false);
  };

  // --- DELETE HANDLERS ---
  const handleDeleteProject = async (id, category) => {
    if(!confirm("Delete this project?")) return;
    const endpoint = category === 'Residential' 
      ? `${API_URL}/api/residential/${id}` 
      : `${API_URL}/api/commercial/${id}`;
    
    await fetch(endpoint, { method: 'DELETE' });
    // If deleted project was being edited, reset form
    if (editingProjectId === id) cancelEditProject();
    fetchData();
  };

  const handleDeleteGallery = async (id) => {
    if(!confirm("Delete this gallery image?")) return;
    await fetch(`${API_URL}/api/gallery/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const startEditGallery = (item) => {
    setGalleryData({ title: item.title, imageFile: null });
    setEditingGalleryId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-2">
          <LayoutGrid className="text-yellow-600" /> Admin Dashboard
        </h1>

        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button onClick={() => setActiveTab('projects')} className={`pb-2 px-4 font-medium transition ${activeTab === 'projects' ? 'border-b-2 border-yellow-600 text-yellow-700' : 'text-gray-500'}`}>
            Manage Projects
          </button>
          <button onClick={() => setActiveTab('gallery')} className={`pb-2 px-4 font-medium transition ${activeTab === 'gallery' ? 'border-b-2 border-yellow-600 text-yellow-700' : 'text-gray-500'}`}>
            Achievement Gallery
          </button>
        </div>

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PROJECT FORM */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit lg:col-span-1 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {editingProjectId ? <Edit2 size={20}/> : <Plus size={20}/>} 
                  {editingProjectId ? 'Edit Project' : 'Add New Project'}
                </h2>
                {editingProjectId && (
                  <button onClick={cancelEditProject} className="text-xs flex items-center gap-1 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition">
                    <X size={14}/> Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select className="w-full p-3 border rounded focus:border-yellow-600 outline-none bg-white"
                    value={projectData.category} onChange={e => setProjectData({...projectData, category: e.target.value})}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <input type="text" placeholder="Project Title" className="w-full p-3 border rounded" required
                  value={projectData.title} onChange={e => setProjectData({...projectData, title: e.target.value})} />
                <input type="text" placeholder="Location" className="w-full p-3 border rounded" required
                  value={projectData.location} onChange={e => setProjectData({...projectData, location: e.target.value})} />
                <input type="text" placeholder="Price" className="w-full p-3 border rounded" required
                  value={projectData.price} onChange={e => setProjectData({...projectData, price: e.target.value})} />
                <input type="text" placeholder="Type (e.g. Office Space)" className="w-full p-3 border rounded" required
                  value={projectData.type} onChange={e => setProjectData({...projectData, type: e.target.value})} />
                
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                    Image {editingProjectId && <span className="font-normal normal-case">(Optional on update)</span>}
                  </label>
                  <input type="file" id="projFile" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                    onChange={e => setProjectData({...projectData, imageFile: e.target.files[0]})} />
                </div>

                <button disabled={loading} className="w-full bg-gray-900 text-white py-3 rounded font-bold hover:bg-black transition">
                  {loading ? "Saving..." : (editingProjectId ? "Update Project" : "Add Project")}
                </button>
              </form>
            </div>

            {/* PROJECTS LIST */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Building2 size={18} className="text-blue-600"/> Projects List</h3>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  
                  {/* Residential List */}
                  {residentialProjects.map(p => (
                    <div key={p._id} className={`flex justify-between items-center p-3 rounded border transition ${editingProjectId === p._id ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50/50 border-blue-100'}`}>
                      <div className="flex gap-3 items-center min-w-0">
                        {p.imageData && <img src={p.imageData} className="w-12 h-12 rounded object-cover shrink-0" />}
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate">{p.title} <span className="text-xs font-normal text-blue-600 bg-blue-100 px-2 py-0.5 rounded ml-2">Residential</span></p>
                          <p className="text-xs text-gray-500 truncate">{p.location} • {p.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEditProject(p, 'Residential')} className="text-blue-600 hover:bg-blue-50 p-2 rounded" title="Edit">
                          <Edit2 size={16}/>
                        </button>
                        <button onClick={() => handleDeleteProject(p._id, 'Residential')} className="text-red-500 hover:bg-red-50 p-2 rounded" title="Delete">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Commercial List */}
                  {commercialProjects.map(p => (
                    <div key={p._id} className={`flex justify-between items-center p-3 rounded border transition ${editingProjectId === p._id ? 'bg-yellow-50 border-yellow-200' : 'bg-purple-50/50 border-purple-100'}`}>
                      <div className="flex gap-3 items-center min-w-0">
                        {p.imageData && <img src={p.imageData} className="w-12 h-12 rounded object-cover shrink-0" />}
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate">{p.title} <span className="text-xs font-normal text-purple-600 bg-purple-100 px-2 py-0.5 rounded ml-2">Commercial</span></p>
                          <p className="text-xs text-gray-500 truncate">{p.location} • {p.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEditProject(p, 'Commercial')} className="text-blue-600 hover:bg-blue-50 p-2 rounded" title="Edit">
                          <Edit2 size={16}/>
                        </button>
                        <button onClick={() => handleDeleteProject(p._id, 'Commercial')} className="text-red-500 hover:bg-red-50 p-2 rounded" title="Delete">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  ))}

                  {residentialProjects.length === 0 && commercialProjects.length === 0 && <p className="text-gray-400 text-center">No projects found.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* GALLERY FORM */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-fit lg:col-span-1 sticky top-24">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ImageIcon size={20}/> {editingGalleryId ? 'Edit Image' : 'Upload Image'}
              </h2>
              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <input type="text" placeholder="Image Title" className="w-full p-3 border rounded" required
                  value={galleryData.title} onChange={e => setGalleryData({...galleryData, title: e.target.value})} />
                
                {!editingGalleryId && (
                  <input type="file" id="galFile" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={e => setGalleryData({...galleryData, imageFile: e.target.files[0]})} />
                )}

                <div className="flex gap-2">
                  <button disabled={loading} className="flex-1 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition">
                    {loading ? "Processing..." : (editingGalleryId ? "Update Title" : "Upload")}
                  </button>
                  {editingGalleryId && (
                    <button type="button" onClick={() => { setEditingGalleryId(null); setGalleryData({ title: '', imageFile: null }) }} className="px-4 border rounded hover:bg-gray-50">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* GALLERY LIST */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Existing Gallery Images ({galleryImages.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2">
                  {galleryImages.map(img => (
                    <div key={img._id} className="border border-gray-200 rounded-lg p-3 flex gap-3 items-start bg-gray-50 hover:shadow-md transition">
                      <div className="w-16 h-16 shrink-0 rounded overflow-hidden bg-gray-200">
                        <img src={img.imageData} alt={img.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-sm text-gray-800 truncate" title={img.title}>{img.title}</p>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => startEditGallery(img)} className="text-xs flex items-center gap-1 text-blue-600 hover:underline">
                            <Edit2 size={12}/> Edit
                          </button>
                          <button onClick={() => handleDeleteGallery(img._id)} className="text-xs flex items-center gap-1 text-red-600 hover:underline">
                            <Trash2 size={12}/> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {galleryImages.length === 0 && <p className="text-gray-400 col-span-2 text-center">No images in gallery.</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;