import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import { Plus, Trash2, Save, Upload } from 'lucide-react';

export default function AdminDashboard() {
  const [profile, setProfile] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  // Formulaires Nouveaux Éléments
  const [newService, setNewService] = useState({ poleNumber: 1, poleName: '', title: '', description: '', price: '', delay: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '', siteUrl: '' });
  const [projectLogo, setProjectLogo] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [resProfile, resServices, resProjects] = await Promise.all([
      API.get('/profile'),
      API.get('/services'),
      API.get('/projects'),
    ]);
    setProfile(resProfile.data);
    setServices(resServices.data);
    setProjects(resProjects.data);
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(profile).forEach(key => formData.append(key, profile[key]));
    if (avatarFile) formData.append('avatar', avatarFile);

    await API.put('/profile', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert("Profil mis à jour !");
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    await API.post('/services', newService);
    setNewService({ poleNumber: 1, poleName: '', title: '', description: '', price: '', delay: '' });
    loadData();
  };

  const handleDeleteService = async (id) => {
    if (confirm("Supprimer cette prestation ?")) {
      await API.delete(`/services/${id}`);
      loadData();
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('description', newProject.description);
    formData.append('siteUrl', newProject.siteUrl);
    if (projectLogo) formData.append('logo', projectLogo);

    await API.post('/projects', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setNewProject({ title: '', description: '', siteUrl: '' });
    setProjectLogo(null);
    loadData();
  };

  const handleDeleteProject = async (id) => {
    if (confirm("Supprimer ce projet ?")) {
      await API.delete(`/projects/${id}`);
      loadData();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-32 px-6 space-y-12">
        <h1 className="text-3xl font-bold">Espace Administrateur (Gestion Totale)</h1>

        {/* SECTION 1: PROFIL & PHOTO */}
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2"><Save className="w-5 h-5 text-indigo-400" /> Profil & Photo de Profil</h2>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" value={profile.fullName || ''} onChange={e => setProfile({...profile, fullName: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Nom complet" />
              <input type="text" value={profile.title || ''} onChange={e => setProfile({...profile, title: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Titre" />
              <input type="text" value={profile.githubUrl || ''} onChange={e => setProfile({...profile, githubUrl: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Lien GitHub" />
              <input type="email" value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Email" />
            </div>
            <textarea value={profile.bio || ''} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Bio" />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-3 rounded-xl cursor-pointer">
                <Upload className="w-5 h-5" /> Modifier la photo de profil
                <input type="file" onChange={e => setAvatarFile(e.target.files[0])} className="hidden" />
              </label>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium">Enregistrer le profil</button>
            </div>
          </form>
        </section>

        {/* SECTION 2: GESTION PRESTATIONS */}
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-bold">Ajouter une Prestation</h2>
          <form onSubmit={handleCreateService} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="number" value={newService.poleNumber} onChange={e => setNewService({...newService, poleNumber: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="N° Pôle (1 à 6)" required />
            <input type="text" value={newService.poleName} onChange={e => setNewService({...newService, poleName: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Nom du Pôle" required />
            <input type="text" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Titre de la Prestation" required />
            <input type="text" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Tarif (ex: 150 000 FCFA)" required />
            <input type="text" value={newService.delay} onChange={e => setNewService({...newService, delay: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Délai (ex: 1 semaine)" required />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl flex items-center justify-center gap-2"><Plus /> Ajouter</button>
            <textarea value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="md:col-span-3 p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Description détaillée" required />
          </form>

          <div className="space-y-3 pt-4">
            {services.map(s => (
              <div key={s._id} className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <span className="font-bold text-indigo-400">[Pôle {s.poleNumber}]</span> {s.title} ({s.price})
                </div>
                <button onClick={() => handleDeleteService(s._id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: GESTION PROJETS */}
        <section className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <h2 className="text-xl font-bold">Ajouter un Projet Portfolio</h2>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Nom du projet" required />
              <input type="url" value={newProject.siteUrl} onChange={e => setNewProject({...newProject, siteUrl: e.target.value})} className="p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="URL du site (https://...)" required />
            </div>
            <textarea value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl" placeholder="Description du projet" required />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 p-3 rounded-xl cursor-pointer">
                <Upload className="w-5 h-5" /> Logo du site
                <input type="file" onChange={e => setProjectLogo(e.target.files[0])} className="hidden" />
              </label>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium">Ajouter le Projet</button>
            </div>
          </form>

          <div className="space-y-3 pt-4">
            {projects.map(p => (
              <div key={p._id} className="flex justify-between items-center p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-4">
                  {p.logoUrl && <img src={p.logoUrl} alt={p.title} className="w-10 h-10 object-contain" />}
                  <span className="font-bold">{p.title}</span> - {p.siteUrl}
                </div>
                <button onClick={() => handleDeleteProject(p._id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-5 h-5" /></button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
