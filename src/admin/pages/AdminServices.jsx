import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from "../services/adminApi";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  features: "",
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadServices = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminServices();

      setServices(
        Array.isArray(data)
          ? data
          : data?.services || []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (service) => {
    setEditingId(service._id || service.id);

    setForm({
      title:
        service.title ||
        service.name ||
        "",
      description:
        service.description || "",
      price:
        service.price ||
        service.pricing ||
        service.amount ||
        "",
      features: Array.isArray(service.features)
        ? service.features.join(", ")
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      description: form.description,
      price: form.price,
      features: form.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateService(
          editingId,
          payload
        );
      } else {
        await createService(payload);
      }

      resetForm();
      await loadServices();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'enregistrer le service."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    const id = service._id || service.id;

    if (!id) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer "${service.title || service.name || "ce service"}" ?`
    );

    if (!confirmed) return;

    try {
      await deleteService(id);
      await loadServices();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de supprimer le service."
      );
    }
  };

  return (
    <>
      <SEO title="Gestion des services" />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>

              <h1>Services</h1>

              <p>
                Gérez les prestations et leurs tarifs.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadServices}
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

          <section className="admin-form-card">
            <div className="admin-form-card__header">
              <h2>
                {editingId
                  ? "Modifier le service"
                  : "Ajouter un service"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  className="admin-cancel"
                  onClick={resetForm}
                >
                  Annuler
                </button>
              )}
            </div>

            <form
              className="admin-form"
              onSubmit={handleSubmit}
            >
              <label>
                Nom du service

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Développement web"
                  required
                />
              </label>

              <label>
                Description

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </label>

              <label>
                Tarif

                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Ex : Sur devis"
                />
              </label>

              <label>
                Prestations incluses

                <input
                  type="text"
                  name="features"
                  value={form.features}
                  onChange={handleChange}
                  placeholder="Conception, développement, mise en ligne"
                />

                <small>
                  Sépare les prestations par des virgules.
                </small>
              </label>

              <button
                type="submit"
                className="admin-submit"
                disabled={saving}
              >
                {editingId ? (
                  <Pencil size={18} />
                ) : (
                  <Plus size={18} />
                )}

                {saving
                  ? "Enregistrement..."
                  : editingId
                    ? "Modifier le service"
                    : "Ajouter le service"}
              </button>
            </form>
          </section>

          <section className="admin-list">
            <h2>Services existants</h2>

            {loading ? (
              <p>Chargement...</p>
            ) : services.length === 0 ? (
              <p>
                Aucun service disponible.
              </p>
            ) : (
              <div className="admin-list__items">
                {services.map((service) => {
                  const id =
                    service._id ||
                    service.id;

                  return (
                    <article
                      key={id}
                      className="admin-list__item"
                    >
                      <div>
                        <h3>
                          {service.title ||
                            service.name ||
                            "Service"}
                        </h3>

                        <p>
                          {service.price ||
                            service.pricing ||
                            service.amount ||
                            "Tarif sur demande"}
                        </p>
                      </div>

                      <div className="admin-list__actions">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(service)
                          }
                          aria-label="Modifier"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(service)
                          }
                          aria-label="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}
