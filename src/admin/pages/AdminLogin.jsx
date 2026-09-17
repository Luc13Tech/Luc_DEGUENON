import { useState } from "react";
import { Lock, Mail, LogIn, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../../components/Container";
import Button from "../../components/Button";
import SEO from "../../components/SEO";
import { adminLogin } from "../services/adminApi";

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await adminLogin(form);

      if (onLogin) {
        await onLogin(data);
      }

      const destination =
        location.state?.from?.pathname || "/admin";

      navigate(destination, {
        replace: true,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Identifiants incorrects ou accès refusé."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Administration"
        description="Connexion sécurisée à l'espace administrateur."
      />

      <main className="admin-login">
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
            transition={{ duration: 0.6 }}
          >
            <div className="admin-login__header">
              <div className="admin-login__icon">
                <ShieldCheck size={30} />
              </div>

              <span className="admin-login__eyebrow">
                ESPACE SÉCURISÉ
              </span>

              <h1>Administration</h1>

              <p>
                Connectez-vous pour gérer le contenu du
                portfolio.
              </p>
            </div>

            <form
              className="admin-login__form"
              onSubmit={handleSubmit}
            >
              <label>
                <span>Email</span>

                <div className="admin-input">
                  <Mail size={18} />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@exemple.com"
                    autoComplete="username"
                    required
                  />
                </div>
              </label>

              <label>
                <span>Mot de passe</span>

                <div className="admin-input">
                  <Lock size={18} />

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </label>

              {error && (
                <div
                  className="admin-login__error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                icon={<LogIn size={18} />}
              >
                {loading
                  ? "Connexion..."
                  : "Se connecter"}
              </Button>
            </form>

            <p className="admin-login__security">
              🔒 Connexion protégée par authentification
              sécurisée.
            </p>
          </motion.div>
        </Container>
      </main>
    </>
  );
}
