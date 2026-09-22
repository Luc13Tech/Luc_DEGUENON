import React, { useState } from 'react';
import { CheckCircle2, Clock, Tag } from 'lucide-react';

export default function Services({ services }) {
  const [selectedPole, setSelectedPole] = useState(0);

  const poles = [
    "Tous",
    "Développement Logiciel",
    "Data & BI",
    "Développement Web",
    "Web Marketing",
    "Relation Client",
    "Support & IT"
  ];

  const filteredServices = selectedPole === 0 
    ? services 
    : services.filter(s => s.poleNumber === selectedPole);

  return (
    <section id="services" className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">Catalogue de Prestations</h2>[cite: 2]
          <p className="text-slate-400 max-w-2xl mx-auto">
            Solutions sur-mesure organisées par pôle d'expertise pour accélérer votre croissance digitale.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {poles.map((pole, index) => (
            <button
              key={index}
              onClick={() => setSelectedPole(index)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                selectedPole === index
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              {pole}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service._id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 flex flex-col justify-between hover:border-slate-700 transition">
              <div className="space-y-3">
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  Pôle {service.poleNumber} : {service.poleName}
                </span>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Tag className="w-4 h-4" /> {service.price}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-4 h-4" /> {service.delay}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
