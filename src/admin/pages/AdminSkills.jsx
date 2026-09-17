import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/adminApi";

const emptyForm = {
  name: "",
  description: "",
  percentage: "",
};

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSkills = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminSkills();

      setSkills(
        Array.isArray(data)
          ? data
          : data?.skills || []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les compétences."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
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

  const handleEdit = (skill) => {
    setEditingId(skill._id || skill.id);

    setForm({
      name:
        skill.name ||
        skill.title ||
        "",
      description:
        skill.description || "",
      percentage:
        skill.percentage ??
        skill.level ??
        "",
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

    const percentage =
      form.percentage === ""
        ? undefined
        : Math.min(
            100,
            Math.max(
              0,
              Number(form.percentage)
            )
          );

    const payload = {
      name: form.name,
      description: form.description,
      ...(percentage !== undefined && {
        percentage,
      }),
    };

    try {
      if (editingId) {
        await updateSkill(
          editingId,
          payload
        );
      } else {
        await createSkill(payload);
      }

      resetForm();
      await loadSkills();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'enregistrer la compétence."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill) => {
    const id = skill._id || skill.id;

    if (!id) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer "${skill.name || skill.title || "cette compétence"}" ?`
    );

    if (!confirmed) return;

    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de supprimer la compétence."
      );
    }
  };

  return (
    <>
      <SEO title="Gestion des compétences" />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>

              <h1>Compétences</h1>

              <p>
                Gérez les technologies et compétences
                affichées sur votre portfolio.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadSkills}
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
                  ? "Modifier la compétence"
                  : "Ajouter une compétence"}
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
                Nom de la compétence

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="React"
                  required
                />
              </label>

              <label>
                Description

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Description de la compétence..."
                />
              </label>

              <label>
                Niveau de maîtrise (%)

                <input
                  type="number"
                  name="percentage"
                  value={form.percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  placeholder="90"
                />
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
                    ? "Modifier la compétence"
                    : "Ajouter la compétence"}
              </button>
            </form>
          </section>

          <section className="admin-list">
            <h2>Compétences existantes</h2>

            {loading ? (
              <p>Chargement...</p>
            ) : skills.length === 0 ? (
              <p>
                Aucune compétence disponible.
              </p>
            ) : (
              <div className="admin-list__items">
                {skills.map((skill) => {
                  const id =
                    skill._id ||
                    skill.id;

                  const percentage =
                    skill.percentage ??
                    skill.level;

                  return (
                    <article
                      key={id}
                      className="admin-list__item"
                    >
                      <div>
                        <h3>
                          {skill.name ||
                            skill.title ||
                            "Compétence"}
                        </h3>

                        {skill.description && (
                          <p>
                            {skill.description}
                          </p>
                        )}

                        {percentage !==
                          undefined &&
                          percentage !==
                            null && (
                            <small>
                              Niveau :{" "}
                              {percentage}%
                            </small>
                          )}
                      </div>

                      <div className="admin-list__actions">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(skill)
                          }
                          aria-label="Modifier"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(skill)
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
