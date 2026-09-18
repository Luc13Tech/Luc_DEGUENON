import {
  ExternalLink,
  LogOut,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import "./AdminHeader.css";

export default function AdminHeader({
  user,
  onLogout,
  title = "Administration",
}) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      }
    } catch (error) {
      console.warn(
        "Erreur lors de la déconnexion :",
        error
      );
    } finally {
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header__title">
        <span>
          ESPACE ADMINISTRATEUR
        </span>

        <h1>{title}</h1>
      </div>

      <div className="admin-header__actions">
        {user && (
          <span
            className="admin-header__user"
            title={
              user.email ||
              undefined
            }
          >
            {user.name ||
              user.email ||
              "Administrateur"}
          </span>
        )}

        <Link
          to="/"
          className="admin-header__button"
          aria-label="Voir le portfolio public"
        >
          <ExternalLink
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span>
            Portfolio
          </span>
        </Link>

        <button
          type="button"
          className="admin-header__logout"
          onClick={handleLogout}
          aria-label="Se déconnecter"
        >
          <LogOut
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <span>
            Déconnexion
          </span>
        </button>
      </div>
    </header>
  );
}
