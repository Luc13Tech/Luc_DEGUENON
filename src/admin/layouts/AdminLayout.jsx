import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import { AdminSidebar } from "../components";

import "./AdminLayout.css";

export default function AdminLayout({
  user,
  onLogout,
}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      }
    } catch (error) {
      console.warn(
        "La déconnexion a rencontré une erreur :",
        error
      );
    } finally {
      setMenuOpen(false);

      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <div className="admin-layout">
      {/* Overlay mobile */}
      <button
        type="button"
        className={`admin-layout__overlay ${
          menuOpen
            ? "admin-layout__overlay--visible"
            : ""
        }`}
        onClick={closeMenu}
        aria-label="Fermer le menu"
        tabIndex={menuOpen ? 0 : -1}
      />

      {/* Sidebar */}
      <AdminSidebar
        isOpen={menuOpen}
        onClose={closeMenu}
        onLogout={handleLogout}
        user={user}
      />

      {/* Contenu principal */}
      <div className="admin-layout__content">
        {/* Header mobile */}
        <header className="admin-mobile-header">
          <button
            type="button"
            className="admin-mobile-header__menu"
            onClick={() =>
              setMenuOpen(true)
            }
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <Menu
              size={24}
              aria-hidden="true"
            />
          </button>

          <span>
            Administration
          </span>
        </header>

        {/* Pages administrateur */}
        <div className="admin-layout__page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
