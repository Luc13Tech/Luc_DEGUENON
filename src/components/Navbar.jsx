import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Code2, User, LogOut, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold text-xl text-white">
          <Code2 className="text-indigo-500 w-8 h-8" />
          <span>Luc DEGUENON</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#services" className="hover:text-indigo-400 transition">Services</a>
          <a href="#projects" className="hover:text-indigo-400 transition">Portfolio</a>
          <a href="#contact" className="hover:text-indigo-400 transition">Contact</a>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/admin" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition">
                <Shield className="w-4 h-4" /> Admin
              </Link>
              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400 transition">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="p-2 text-slate-400 hover:text-indigo-400 transition">
              <User className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
