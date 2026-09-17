import { useNavigate } from "react-router-dom";
import { ExternalLink, LogOut } from "lucide-react";

export default function AdminHeader({
  user,
  onLogout,
  title = "Administration",
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="admin-header">
      <div className="admin-header__title">
        <span>ESPACE ADMINISTRATEUR</span>
        <h1>{title}</h1>
      </div>

      <div className="admin-header__actions">
        {user?.name && (
          <span className="admin-header__user">
            {user.name}
          </span>
        )}

        <a
          href="/"
          className="admin-header__button"
          target="_self"
        >
          <ExternalLink size={17} />
          Portfolio
        </a>

        <button
          type="button"
          className="admin-header__logout"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
