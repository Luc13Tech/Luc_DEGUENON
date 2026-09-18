import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  Code2,
  Images,
  Settings,
  ShieldCheck,
  X,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import "./AdminSidebar.css";

export default function AdminSidebar({
  isOpen = false,
  onClose,
  onLogout,
  user,
}) {
  const { t } = useTranslation();

  const links = [
    {
      to: "/admin",
      label: t("admin.dashboard"),
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: "/admin/projects",
      label: t("admin.projects"),
      icon: FolderKanban,
    },
    {
      to: "/admin/services",
      label: t("admin.services"),
      icon: BriefcaseBusiness,
    },
    {
      to: "/admin/skills",
      label: t("admin.skills"),
      icon: Code2,
    },
    {
      to: "/admin/media",
      label: t("admin.media"),
      icon: Images,
    },
    {
      to: "/admin/settings",
      label: t("admin.settings"),
      icon: Settings,
    },
    {
      to: "/admin/audit",
      label: t("admin.security"),
      icon: ShieldCheck,
    },
  ];

  return (
    <aside
      className={`admin-sidebar${
        isOpen ? " admin-sidebar--open" : ""
      }`}
      aria-label="Navigation administration"
    >
      <div className="admin-sidebar__header">
        <div>
          <span className="admin-sidebar__eyebrow">
            ADMINISTRATION
          </span>

          <span className="admin-sidebar__title">
            Luc DEGUENON
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            className="admin-sidebar__close"
            onClick={onClose}
            aria-label="Fermer le menu"
          >
            <X
              size={20}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      <nav className="admin-sidebar__nav">
        {links.map(
          ({
            to,
            label,
            icon: Icon,
            end,
          }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `admin-sidebar__link${
                  isActive
                    ? " admin-sidebar__link--active"
                    : ""
                }`
              }
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              <span>{label}</span>
            </NavLink>
          )
        )}
      </nav>

      <div className="admin-sidebar__footer">
        {user && (
          <div className="admin-sidebar__user">
            <strong>
              {user.name ||
                user.email ||
                "Administrateur"}
            </strong>

            <small>
              {user.role || "admin"}
            </small>
          </div>
        )}

        <NavLink
          to="/"
          className="admin-sidebar__link"
          onClick={onClose}
        >
          <ExternalLink
            size={18}
            aria-hidden="true"
          />

          <span>
            Voir le portfolio
          </span>
        </NavLink>

        {onLogout && (
          <button
            type="button"
            className="admin-sidebar__link"
            onClick={onLogout}
          >
            <LogOut
              size={18}
              aria-hidden="true"
            />

            <span>
              {t("admin.logout")}
            </span>
          </button>
        )}

        <span>
          © {new Date().getFullYear()} Luc DEGUENON
        </span>
      </div>
    </aside>
  );
}
