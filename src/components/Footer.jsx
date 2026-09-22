import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm bg-slate-950">
      <p>© {new Date().getFullYear()} Luc DEGUENON - Développeur Web & Analyste de Données. Tous droits réservés.</p>
    </footer>
  );
}
