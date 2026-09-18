import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Save,
  RefreshCw,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  getAdminSettings,
  updateSettings,
} from "../services/adminApi";

import "./AdminSettings.css";

const emptyForm = {
  siteName: "",
  siteDescription: "",
  email: "",
  phone: "",
  location: "",
  githubUrl: "",
  linkedinUrl: "",
};

const getMessage = (error, fallback) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error;

  return typeof message === "string" &&
    message.trim()
    ? message.trim()
    : fallback;
};

export default function AdminSettings() {
  const [settings, setSettings] =
    useState({
      ...emptyForm,
    });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadSettings =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getAdminSettings();

        const source =
          data?.settings &&
          !Array.isArray(
            data.settings
          )
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
          getMessage(
            err,
            "Impossible de charger les paramètres."
          )
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setSettings(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    const siteName =
      settings.siteName.trim();

    const siteDescription =
      settings.siteDescription.trim();

    const email =
      settings.email.trim();

    const phone =
      settings.phone.trim();

    const location =
      settings.location.trim();

    const githubUrl =
      settings.githubUrl.trim();

    const linkedinUrl =
      settings.linkedinUrl.trim();

    if (!siteName) {
      setError(
        "Le nom du site est obligatoire."
      );
      return;
    }

    if (!siteDescription) {
      setError(
        "La description du site est obligatoire."
      );
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      setError(
        "Veuillez saisir une adresse email valide."
      );
      return;
    }

    const validateUrl = (
      value,
      label
    ) => {
      if (!value) {
        return null;
      }

      try {
        const url =
          new URL(value);

        if (
          url.protocol !==
            "http:" &&
          url.protocol !==
            "https:"
        ) {
          return `L'adresse ${label} doit commencer par http:// ou https://.`;
        }

        return null;
      } catch {
        return `Veuillez saisir une adresse ${label} valide.`;
      }
    };

    const githubError =
      validateUrl(
        githubUrl,
        "GitHub"
      );

    if (githubError) {
      setError(githubError);
      return;
    }

    const linkedinError =
      validateUrl(
        linkedinUrl,
        "LinkedIn"
      );

    if (linkedinError) {
      setError(linkedinError);
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      siteName,
      siteDescription,
      email,
      phone,
      location,
      githubUrl,
      linkedinUrl,
    };

    try {
      await updateSettings(
        payload
      );

      setSettings(payload);

      setSuccess(
        "Les paramètres ont été enregistrés avec succès."
      );
    } catch (err) {
      setError(
        getMessage(
          err,
          "Impossible d'enregistrer les paramètres."
        )
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <SEO
        title="Paramètres"
        description="Gestion des paramètres du portfolio Luc DEGUENON."
      />

      <main
        className="admin-page"
        aria-labelledby="admin-settings-title"
      >
        <Container>
          <header className="admin-page__header">
            <div>
              <span>
                ADMINISTRATION
              </span>

              <h1 id="admin-settings-title">
                Paramètres
              </h1>

              <p>
                Configurez les informations
                générales affichées sur
                votre portfolio.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={
                loadSettings
              }
              disabled={
                loading ||
                saving
              }
              aria-label="Actualiser les paramètres"
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "admin-settings-spin"
                    : ""
                }
                aria-hidden="true"
              />

              <span>
                {loading
                  ? "Chargement..."
                  : "Actualiser"}
              </span>
            </button>
          </header>

          {error && (
            <div
              className="admin-message admin-message--error"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="admin-message admin-message--success"
              role="status"
              aria-live="polite"
            >
              {success}
            </div>
          )}

          <section className="admin-form-card">
            {loading ? (
              <div
                className="admin-settings-state"
                role="status"
                aria-live="polite"
              >
                <RefreshCw
                  size={26}
                  className="admin-settings-spin"
                  aria-hidden="true"
                />

                <p>
                  Chargement des
                  paramètres...
                </p>
              </div>
            ) : (
              <form
                className="admin-form"
                onSubmit={
                  handleSubmit
                }
                noValidate
              >
                <div className="admin-form__grid">
                  <label>
                    <span>
                      Nom du site
                    </span>

                    <input
                      type="text"
                      name="siteName"
                      value={
                        settings.siteName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Luc DEGUENON"
                      autoComplete="organization"
                      required
                      disabled={saving}
                    />
                  </label>

                  <label>
                    <span>
                      Email
                    </span>

                    <input
                      type="email"
                      name="email"
                      value={
                        settings.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="contact@exemple.com"
                      autoComplete="email"
                      inputMode="email"
                      disabled={saving}
                    />
                  </label>

                  <label>
                    <span>
                      Téléphone
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        settings.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="+221 ..."
                      autoComplete="tel"
                      disabled={saving}
                    />
                  </label>

                  <label>
                    <span>
                      Localisation
                    </span>

                    <input
                      type="text"
                      name="location"
                      value={
                        settings.location
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Dakar, Sénégal"
                      autoComplete="address-level2"
                      disabled={saving}
                    />
                  </label>

                  <label>
                    <span>
                      GitHub
                    </span>

                    <input
                      type="url"
                      name="githubUrl"
                      value={
                        settings.githubUrl
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://github.com/..."
                      inputMode="url"
                      autoCapitalize="none"
                      spellCheck="false"
                      disabled={saving}
                    />
                  </label>

                  <label>
                    <span>
                      LinkedIn
                    </span>

                    <input
                      type="url"
                      name="linkedinUrl"
                      value={
                        settings.linkedinUrl
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://linkedin.com/..."
                      inputMode="url"
                      autoCapitalize="none"
                      spellCheck="false"
                      disabled={saving}
                    />
                  </label>
                </div>

                <label>
                  <span>
                    Description du site
                  </span>

                  <textarea
                    name="siteDescription"
                    value={
                      settings.siteDescription
                    }
                    onChange={
                      handleChange
                    }
                    rows={6}
                    placeholder="Description générale du portfolio..."
                    required
                    disabled={saving}
                  />
                </label>

                <button
                  type="submit"
                  className="admin-submit"
                  disabled={saving}
                >
                  <Save
                    size={18}
                    aria-hidden="true"
                  />

                  <span>
                    {saving
                      ? "Enregistrement..."
                      : "Enregistrer les paramètres"}
                  </span>
                </button>
              </form>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}
