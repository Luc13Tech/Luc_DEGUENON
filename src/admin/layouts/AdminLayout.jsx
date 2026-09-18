import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import { adminLogout } from "../services/adminApi";
import { AdminSidebar } from "../components";

import "./AdminLayout.css";

export default function AdminLayout({
  user,
  onLogout,
}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.warn(
        "La déconnexion serveur a échoué :",
        error
      );
    } finally {
      if (onLogout) {
        await onLogout();
      }

      setMenuOpen(false);

      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="admin-layout">
      <button
        type="button"
        className={`admin-layout__overlay ${
          menuOpen
            ? "admin-layout__overlay--visible"
            : ""
        }`}
        onClick={closeMenu}
        aria-label="Fermer le menu"
      />

      <AdminSidebar
        isOpen={menuOpen}
        onClose={closeMenu}
      />

      <div className="admin-layout__content">
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

        <div className="admin-layout__page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
