import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, RefreshCw } from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";
import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/adminApi";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  category: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  technologies: "",
};

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminProjects();

      setProjects(
        Array.isArray(data)
          ? data
          : data?.projects || []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les projets."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
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

  const handleEdit = (project) => {
    setEditingId(project._id || project.id);

    setForm({
      title: project.title || project.name || "",
      slug: project.slug || "",
      description: project.description || "",
      category: project.category || "",
      imageUrl:
        project.imageUrl ||
        project.image?.url ||
        "",
      liveUrl:
        project.liveUrl ||
        project.url ||
        "",
      githubUrl: project.githubUrl || "",
      technologies: Array.isArray(
        project.technologies
      )
        ? project.technologies.join(", ")
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
      ...form,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateProject(
          editingId,
          payload
        );
      } else {
        await createProject(payload);
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'enregistrer le projet."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (project) => {
    const id = project._id || project.id;

    if (!id) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer "${project.title || project.name || "ce projet"}" ?`
    );

    if (!confirmed) return;

    try {
      await deleteProject(id);
      await loadProjects();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de supprimer le projet."
      );
    }
  };

  return (
    <>
      <SEO title="Gestion des projets" />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>
              <h1>Projets</h1>
              <p>
                Ajoutez, modifiez ou supprimez les
                réalisations du portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={loadProjects}
              className="admin-action"
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
                  ? "Modifier le projet"
                  : "Ajouter un projet"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="admin-cancel"
                >
                  Annuler
                </button>
              )}
            </div>

            <form
              className="admin-form"
              onSubmit={handleSubmit}
            >
              <div className="admin-form__grid">
                <label>
                  Nom du projet
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Slug
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="mon-projet"
                  />
                </label>

                <label>
                  Catégorie
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Développement web"
                  />
                </label>

                <label>
                  Image
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="URL de l'image"
                  />
                </label>

                <label>
                  Site web
                  <input
                    type="url"
                    name="liveUrl"
                    value={form.liveUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </label>

                <label>
                  GitHub
                  <input
                    type="url"
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                  />
                </label>
              </div>

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
                Technologies
                <input
                  name="technologies"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
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
                    ? "Modifier le projet"
                    : "Ajouter le projet"}
              </button>
            </form>
          </section>

          <section className="admin-list">
            <h2>Réalisations existantes</h2>

            {loading ? (
              <p>Chargement des projets...</p>
            ) : projects.length === 0 ? (
              <p>Aucun projet disponible.</p>
            ) : (
              <div className="admin-list__items">
                {projects.map((project) => {
                  const id =
                    project._id ||
                    project.id;

                  return (
                    <article
                      key={id}
                      className="admin-list__item"
                    >
                      <div>
                        <h3>
                          {project.title ||
                            project.name ||
                            "Projet"}
                        </h3>

                        <p>
                          {project.category ||
                            "Sans catégorie"}
                        </p>
                      </div>

                      <div className="admin-list__actions">
                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(project)
                          }
                          aria-label="Modifier"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(project)
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
