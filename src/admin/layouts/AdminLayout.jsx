import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Wrench,
  Code2,
  Image,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

import { adminLogout } from "../services/adminApi";

const navigation = [
  {
    label: "Tableau de bord",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Projets",
    path: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: Wrench,
  },
  {
    label: "Compétences",
    path: "/admin/skills",
    icon: Code2,
  },
  {
    label: "Médias",
    path: "/admin/media",
    icon: Image,
  },
  {
    label: "Paramètres",
    path: "/admin/settings",
    icon: Settings,
  },
  {
    label: "Sécurité",
    path: "/admin/audit",
    icon: ShieldCheck,
  },
];

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

      <aside
        className={`admin-sidebar ${
          menuOpen
            ? "admin-sidebar--open"
            : ""
        }`}
      >
        <div className="admin-sidebar__header">
          <NavLink
            to="/admin"
            className="admin-sidebar__brand"
            onClick={closeMenu}
          >
            <span className="admin-sidebar__logo">
              LD
            </span>

            <span>
              <strong>
                Luc DEGUENON
              </strong>

              <small>
                Administration
              </small>
            </span>
          </NavLink>

          <button
            type="button"
            className="admin-sidebar__close"
            onClick={closeMenu}
            aria-label="Fermer le menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav
          className="admin-sidebar__nav"
          aria-label="Navigation administration"
        >
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `admin-sidebar__link ${
                    isActive
                      ? "admin-sidebar__link--active"
                      : ""
                  }`
                }
              >
                <Icon size={19} />

                <span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          {user && (
            <div className="admin-sidebar__user">
              <div className="admin-sidebar__avatar">
                {(user.name ||
                  user.email ||
                  "A")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {user.name ||
                    "Administrateur"}
                </strong>

                <small>
                  {user.role ||
                    "admin"}
                </small>
              </div>
            </div>
          )}

          <NavLink
            to="/"
            className="admin-sidebar__public-link"
            onClick={closeMenu}
          >
            <ExternalLink size={17} />
            Voir le portfolio
          </NavLink>

          <button
            type="button"
            className="admin-sidebar__logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

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
            <Menu size={24} />
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
