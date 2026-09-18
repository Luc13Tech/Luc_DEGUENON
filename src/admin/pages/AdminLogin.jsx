import { useState } from "react";
import {
  Lock,
  Mail,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Container from "../../components/Container";
import Button from "../../components/Button";
import SEO from "../../components/SEO";

import { adminLogin } from "../services/adminApi";
import "./AdminLogin.css";

export default function AdminLogin({
  onLogin,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const email =
      form.email.trim();

    const password =
      form.password;

    if (!email || !password) {
      setError(
        "Veuillez renseigner votre email et votre mot de passe."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {
      const data =
        await adminLogin({
          email,
          password,
        });

      if (onLogin) {
        await onLogin(data);
      }

      const requestedPath =
        location.state?.from?.pathname;

      const requestedSearch =
        location.state?.from?.search || "";

      const destination =
        requestedPath &&
        requestedPath.startsWith("/admin") &&
        requestedPath !== "/admin/login"
          ? `${requestedPath}${requestedSearch}`
          : "/admin";

      navigate(destination, {
        replace: true,
      });
    } catch (err) {
      const apiMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      if (
        err?.response?.status === 401 ||
        err?.response?.status === 403
      ) {
        setError(
          "Email ou mot de passe incorrect."
        );
      } else if (
        typeof apiMessage === "string" &&
        apiMessage.trim()
      ) {
        setError(
          apiMessage.trim()
        );
      } else if (
        err?.request
      ) {
        setError(
          "Impossible de contacter le serveur. Vérifiez votre connexion puis réessayez."
        );
      } else {
        setError(
          "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Administration"
        description="Connexion sécurisée à l'espace administrateur du portfolio Luc DEGUENON."
      />

      <main
        className="admin-login"
        aria-labelledby="admin-login-title"
      >
        <Container>
          <motion.div
            className="admin-login__card"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="admin-login__header">
              <div
                className="admin-login__icon"
                aria-hidden="true"
              >
                <ShieldCheck
                  size={30}
                  strokeWidth={1.8}
                />
              </div>

              <span className="admin-login__eyebrow">
                ESPACE SÉCURISÉ
              </span>

              <h1 id="admin-login-title">
                Administration
              </h1>

              <p>
                Connectez-vous pour gérer
                le contenu du portfolio.
              </p>
            </div>

            <form
              className="admin-login__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <label
                htmlFor="admin-email"
              >
                <span>
                  Email
                </span>

                <div className="admin-input">
                  <Mail
                    size={18}
                    aria-hidden="true"
                  />

                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@exemple.com"
                    autoComplete="username"
                    inputMode="email"
                    autoCapitalize="none"
                    spellCheck="false"
                    disabled={loading}
                    required
                    aria-invalid={
                      Boolean(error)
                    }
                    aria-describedby={
                      error
                        ? "admin-login-error"
                        : undefined
                    }
                  />
                </div>
              </label>

              <label
                htmlFor="admin-password"
              >
                <span>
                  Mot de passe
                </span>

                <div className="admin-input">
                  <Lock
                    size={18}
                    aria-hidden="true"
                  />

                  <input
                    id="admin-password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    autoComplete="current-password"
                    disabled={loading}
                    required
                    aria-invalid={
                      Boolean(error)
                    }
                    aria-describedby={
                      error
                        ? "admin-login-error"
                        : undefined
                    }
                  />
                </div>
              </label>

              {error && (
                <div
                  id="admin-login-error"
                  className="admin-login__error"
                  role="alert"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                icon={
                  <LogIn
                    size={18}
                    aria-hidden="true"
                  />
                }
              >
                {loading
                  ? "Connexion..."
                  : "Se connecter"}
              </Button>
            </form>

            <p className="admin-login__security">
              <span aria-hidden="true">
                🔒
              </span>{" "}
              Connexion protégée par
              authentification sécurisée.
            </p>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
