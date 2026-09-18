import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from "../services/adminApi";

import "./AdminServices.css";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  features: "",
};

const getServiceId = (service) =>
  service?._id ||
  service?.id ||
  null;

const getServiceTitle = (service) =>
  service?.title ||
  service?.name ||
  "Service";

const getServicePrice = (service) =>
  service?.price ||
  service?.pricing ||
  service?.amount ||
  "Tarif sur demande";

const getServiceFeatures = (service) => {
  if (Array.isArray(service?.features)) {
    return service.features;
  }

  if (
    typeof service?.features === "string"
  ) {
    return service.features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export default function AdminServices() {
  const [services, setServices] =
    useState([]);

  const [form, setForm] =
    useState({
      ...emptyForm,
    });

  const [editingId, setEditingId] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const loadServices = useCallback(
    async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getAdminServices();

        const receivedServices =
          Array.isArray(data)
            ? data
            : data?.services ||
              data?.items ||
              [];

        setServices(
          Array.isArray(
            receivedServices
          )
            ? receivedServices
            : []
        );
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.response?.data?.error;

        setError(
          typeof message === "string" &&
            message.trim()
            ? message.trim()
            : "Impossible de charger les services."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleChange = (
    event
  ) => {
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

    if (success) {
      setSuccess("");
    }
  };

  const resetForm = () => {
    setForm({
      ...emptyForm,
    });

    setEditingId(null);
    setError("");
  };

  const handleEdit = (
    service
  ) => {
    const id =
      getServiceId(service);

    if (!id) {
      setError(
        "Impossible d'identifier ce service."
      );

      return;
    }

    const features =
      getServiceFeatures(
        service
      );

    setEditingId(id);

    setForm({
      title:
        service?.title ||
        service?.name ||
        "",

      description:
        service?.description ||
        "",

      price:
        service?.price ||
        service?.pricing ||
        service?.amount ||
        "",

      features:
        features.join(", "),
    });

    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    const title =
      form.title.trim();

    const description =
      form.description.trim();

    if (!title) {
      setError(
        "Le nom du service est obligatoire."
      );

      return;
    }

    if (!description) {
      setError(
        "La description du service est obligatoire."
      );

      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      title,
      description,

      price:
        form.price.trim(),

      features:
        form.features
          .split(",")
          .map(
            (item) =>
              item.trim()
          )
          .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateService(
          editingId,
          payload
        );

        setSuccess(
          "Le service a été modifié avec succès."
        );
      } else {
        await createService(
          payload
        );

        setSuccess(
          "Le service a été ajouté avec succès."
        );
      }

      setForm({
        ...emptyForm,
      });

      setEditingId(null);

      await loadServices();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : editingId
            ? "Impossible de modifier le service."
            : "Impossible d'ajouter le service."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    service
  ) => {
    const id =
      getServiceId(service);

    if (!id || deletingId) {
      return;
    }

    const title =
      getServiceTitle(service);

    const confirmed =
      window.confirm(
        `Voulez-vous vraiment supprimer « ${title} » ?`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      await deleteService(id);

      setServices(
        (current) =>
          current.filter(
            (item) =>
              getServiceId(item) !==
              id
          )
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess(
        "Le service a été supprimé avec succès."
      );
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : "Impossible de supprimer le service."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <SEO
        title="Gestion des services"
        description="Gestion des services et prestations du portfolio Luc DEGUENON."
      />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>
                ADMINISTRATION
              </span>

              <h1>Services</h1>

              <p>
                Gérez les prestations,
                descriptions, tarifs et
                éléments inclus dans vos offres.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={
                loadServices
              }
              disabled={loading}
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "admin-services-spin"
                    : ""
                }
                aria-hidden="true"
              />

              <span>
                {loading
                  ? "Actualisation..."
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
            <div className="admin-form-card__header">
              <div>
                <h2>
                  {editingId
                    ? "Modifier le service"
                    : "Ajouter un service"}
                </h2>

                <p>
                  Les informations seront
                  disponibles dans la gestion
                  du portfolio.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  className="admin-cancel"
                  onClick={
                    resetForm
                  }
                  disabled={saving}
                >
                  Annuler
                </button>
              )}
            </div>

            <form
              className="admin-form"
              onSubmit={
                handleSubmit
              }
              noValidate
            >
              <label>
                <span>
                  Nom du service
                </span>

                <input
                  type="text"
                  name="title"
                  value={
                    form.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Développement web"
                  autoComplete="off"
                  required
                />
              </label>

              <label>
                <span>
                  Description
                </span>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={
                    handleChange
                  }
                  rows={6}
                  placeholder="Décrivez précisément le service..."
                  required
                />
              </label>

              <label>
                <span>
                  Tarif
                </span>

                <input
                  type="text"
                  name="price"
                  value={
                    form.price
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Ex : Sur devis ou 850 000 FCFA"
                />
              </label>

              <label>
                <span>
                  Prestations incluses
                </span>

                <input
                  type="text"
                  name="features"
                  value={
                    form.features
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Conception, développement, mise en ligne"
                />

                <small className="admin-field-help">
                  Séparez les prestations
                  par des virgules.
                </small>
              </label>

              <button
                type="submit"
                className="admin-submit"
                disabled={saving}
              >
                {editingId ? (
                  <Pencil
                    size={18}
                    aria-hidden="true"
                  />
                ) : (
                  <Plus
                    size={18}
                    aria-hidden="true"
                  />
                )}

                <span>
                  {saving
                    ? "Enregistrement..."
                    : editingId
                      ? "Modifier le service"
                      : "Ajouter le service"}
                </span>
              </button>
            </form>
          </section>

          <section className="admin-list">
            <div className="admin-list__header">
              <h2>
                Services existants
              </h2>

              <span>
                {services.length}{" "}
                service
                {services.length > 1
                  ? "s"
                  : ""}
              </span>
            </div>

            {loading ? (
              <div
                className="admin-services-state"
                role="status"
              >
                <RefreshCw
                  size={26}
                  className="admin-services-spin"
                  aria-hidden="true"
                />

                <p>
                  Chargement des services...
                </p>
              </div>
            ) : services.length ===
              0 ? (
              <div className="admin-services-state">
                <p>
                  Aucun service disponible.
                </p>
              </div>
            ) : (
              <div className="admin-list__items">
                {services.map(
                  (service) => {
                    const id =
                      getServiceId(
                        service
                      );

                    const title =
                      getServiceTitle(
                        service
                      );

                    const price =
                      getServicePrice(
                        service
                      );

                    const features =
                      getServiceFeatures(
                        service
                      );

                    return (
                      <article
                        key={
                          id ||
                          title
                        }
                        className="admin-service-item"
                      >
                        <div className="admin-service-item__content">
                          <h3>
                            {title}
                          </h3>

                          <p className="admin-service-item__price">
                            {price}
                          </p>

                          {service?.description && (
                            <p className="admin-service-item__description">
                              {
                                service.description
                              }
                            </p>
                          )}

                          {features.length >
                            0 && (
                            <div className="admin-service-item__features">
                              {features
                                .slice(
                                  0,
                                  6
                                )
                                .map(
                                  (
                                    feature
                                  ) => (
                                    <span
                                      key={
                                        feature
                                      }
                                    >
                                      {
                                        feature
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          )}
                        </div>

                        <div className="admin-list__actions">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                service
                              )
                            }
                            disabled={
                              Boolean(
                                deletingId
                              )
                            }
                            aria-label={`Modifier ${title}`}
                          >
                            <Pencil
                              size={
                                18
                              }
                              aria-hidden="true"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                service
                              )
                            }
                            disabled={
                              deletingId ===
                              id
                            }
                            aria-label={`Supprimer ${title}`}
                          >
                            <Trash2
                              size={
                                18
                              }
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}
