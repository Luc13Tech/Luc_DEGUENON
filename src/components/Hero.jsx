import React from 'react';
import { Github, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Hero({ profile }) {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-semibold">
          {profile?.title || "Expert Polyvalent en Solutions Digitales"}[cite: 2]
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Salut, moi c'est <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">{profile?.fullName || "Luc DEGUENON"}</span>[cite: 2]
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          {profile?.bio || "Développeur Logiciel, Analyste de Données, Webmarketeur et Conseiller Client & Commercial."}[cite: 2]
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a href={profile?.githubUrl || "https://github.com/Luc13Tech"} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl border border-slate-700 transition font-medium">
            <Github className="w-5 h-5" /> GitHub Profil <ExternalLink className="w-4 h-4" />
          </a>
          <a href="#contact" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition shadow-lg shadow-indigo-600/20">
            Me contacter
          </a>
        </div>
        <div className="flex flex-wrap gap-6 pt-4 text-sm text-slate-400">
          <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-indigo-400" /> {profile?.email || "lucdeguenon11@gmail.com"}</span>[cite: 2]
          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /> Sénégal: {profile?.phoneSenegal || "+221 78 48 55 699"}</span>[cite: 2]
          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400" /> Bénin: {profile?.phoneBenin || "+229 01 59 60 95 81"}</span>[cite: 2]
        </div>
      </div>
      <div className="relative">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-indigo-500/30 shadow-2xl shadow-indigo-500/10">
          <img src={profile?.avatarUrl || "https://via.placeholder.com/300"} alt="Luc DEGUENON" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
