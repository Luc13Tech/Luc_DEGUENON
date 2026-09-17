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
} from "lucide-react";

const menuItems = [
  {
    to: "/admin",
    label: "Tableau de bord",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/admin/projects",
    label: "Projets",
    icon: FolderKanban,
  },
  {
    to: "/admin/services",
    label: "Services",
    icon: BriefcaseBusiness,
  },
  {
    to: "/admin/skills",
    label: "Compétences",
    icon: Code2,
  },
  {
    to: "/admin/media",
    label: "Médias",
    icon: Images,
  },
  {
    to: "/admin/settings",
    label: "Paramètres",
    icon: Settings,
  },
  {
    to: "/admin/audit",
    label: "Sécurité & Audit",
    icon: ShieldCheck,
  },
];

export default function AdminSidebar({ open = false, onClose }) {
  return (
    <aside className={`admin-sidebar ${open ? "admin-sidebar--open" : ""}`}>
      <div className="admin-sidebar__header">
        <div>
          <span className="admin-sidebar__eyebrow">ADMINISTRATION</span>
          <strong className="admin-sidebar__title">Luc DEGUENON</strong>
        </div>

        <button
          type="button"
          className="admin-sidebar__close"
          onClick={onClose}
          aria-label="Fermer le menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Navigation administration">
        {menuItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `admin-sidebar__link ${
                isActive ? "admin-sidebar__link--active" : ""
              }`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <span>Portfolio Administration</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </aside>
  );
}
