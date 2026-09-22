import React, { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Footer from '../components/Footer';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resProfile, resServices, resProjects] = await Promise.all([
        API.get('/profile'),
        API.get('/services'),
        API.get('/projects'),
      ]);
      setProfile(resProfile.data);
      setServices(resServices.data);
      setProjects(resProjects.data);
    } catch (err) {
      console.error("Erreur de chargement des données", err);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero profile={profile} />
      <Services services={services} />
      <Projects projects={projects} />
      <Footer />
    </div>
  );
}
