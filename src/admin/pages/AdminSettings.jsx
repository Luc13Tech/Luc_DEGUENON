import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  getAdminSettings,
  updateSettings,
} from "../services/adminApi";

const emptyForm = {
  siteName: "",
  siteDescription: "",
  email: "",
  phone: "",
  location: "",
  githubUrl: "",
  linkedinUrl: "",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSettings = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminSettings();

      const source =
        data?.settings &&
        !Array.isArray(data.settings)
          ? data.settings
          : Array.isArray(data)
            ? data[0] || {}
            : data || {};

      setSettings({
        siteName:
          source.siteName ||
          source.name ||
          "",
        siteDescription:
          source.siteDescription ||
          source.description ||
          "",
        email:
          source.email || "",
        phone:
          source.phone || "",
        location:
          source.location || "",
        githubUrl:
          source.githubUrl ||
          source.github ||
          "",
        linkedinUrl:
          source.linkedinUrl ||
          source.linkedin ||
          "",
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les paramètres."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateSettings(settings);

      setSuccess(
        "Les paramètres ont été enregistrés avec succès."
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'enregistrer les paramètres."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO title="Paramètres" />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>

              <h1>Paramètres</h1>

              <p>
                Configurez les informations générales
                affichées sur le portfolio.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadSettings}
              disabled={loading}
            >
              <RefreshCw size={18} />
              Actualiser
            </button>
          </header>

          {error && (
            <div
              className="admin-message admin-message--error"
              role="alert"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="admin-message admin-message--success"
              role="status"
            >
              {success}
            </div>
          )}

          <section className="admin-form-card">
            {loading ? (
              <p>
                Chargement des paramètres...
              </p>
            ) : (
              <form
                className="admin-form"
                onSubmit={handleSubmit}
              >
                <div className="admin-form__grid">
                  <label>
                    Nom du site

                    <input
                      type="text"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleChange}
                      placeholder="Luc DEGUENON"
                    />
                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      placeholder="contact@..."
                    />
                  </label>

                  <label>
                    Téléphone

                    <input
                      type="tel"
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                      placeholder="+221 ..."
                    />
                  </label>

                  <label>
                    Localisation

                    <input
                      type="text"
                      name="location"
                      value={settings.location}
                      onChange={handleChange}
                      placeholder="Dakar, Sénégal"
                    />
                  </label>

                  <label>
                    GitHub

                    <input
                      type="url"
                      name="githubUrl"
                      value={settings.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                    />
                  </label>

                  <label>
                    LinkedIn

                    <input
                      type="url"
                      name="linkedinUrl"
                      value={settings.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/..."
                    />
                  </label>
                </div>

                <label>
                  Description du site

                  <textarea
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Description générale du portfolio..."
                  />
                </label>

                <button
                  type="submit"
                  className="admin-submit"
                  disabled={saving}
                >
                  <Save size={18} />

                  {saving
                    ? "Enregistrement..."
                    : "Enregistrer les paramètres"}
                </button>
              </form>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}
