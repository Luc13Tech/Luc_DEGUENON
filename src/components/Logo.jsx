import { Link } from "react-router-dom";
import "./Logo.css";

export default function Logo({
  to = "/",
  showName = true,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`logo ${className}`.trim()}
      aria-label="Luc DEGUENON - Accueil"
    >
      <span className="logo__mark" aria-hidden="true">
        LD
      </span>

      {showName && (
        <span className="logo__name">
          Luc DEGUENON
        </span>
      )}
    </Link>
  );
}
