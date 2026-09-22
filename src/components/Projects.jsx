import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Projets Pilotés</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Aperçu des plateformes web et projets d'envergure réalisés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project._id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 hover:border-indigo-500/50 transition group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-16 flex items-center">
                {project.logoUrl ? (
                  <img src={project.logoUrl} alt={project.title} className="max-h-full max-w-[160px] object-contain" />
                ) : (
                  <span className="text-2xl font-black text-indigo-500">{project.title}</span>
                )}
              </div>
              <h3 className="text-xl font-bold group-hover:text-indigo-400 transition">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
            </div>
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-indigo-600 text-white rounded-xl border border-slate-700 transition text-sm font-medium"
            >
              Visiter le site <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
