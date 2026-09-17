import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-mark">LD</span>
              <span>Luc DEGUENON</span>
            </Link>

            <p className="footer__description">
              Développement web, mobile et solutions numériques
              modernes.
            </p>
          </div>

          <div className="footer__links">
            <h3>Navigation</h3>

            <Link to="/">Accueil</Link>
            <Link to="/about">À propos</Link>
            <Link to="/projects">Projets</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer__social">
            <h3>Réseaux</h3>

            <div className="footer__social-list">
              <a
                href="https://github.com/Luc13Tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:contact@lucdeguenon.com"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {currentYear} Luc DEGUENON. Tous droits réservés.
          </p>

          <button
            type="button"
            className="footer__top-button"
            onClick={scrollToTop}
            aria-label="Retourner en haut"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
