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
  ExternalLink,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/adminApi";

import "./AdminProjects.css";

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

const getProjectId = (project) =>
  project?._id || project?.id || null;

const getProjectTitle = (project) =>
  project?.title ||
  project?.name ||
  "Projet";

const getProjectImage = (project) =>
  project?.imageUrl ||
  project?.image?.url ||
  project?.image?.secure_url ||
  "";

const getProjectUrl = (project) =>
  project?.liveUrl ||
  project?.url ||
  project?.websiteUrl ||
  "";

const getGithubUrl = (project) =>
  project?.githubUrl ||
  project?.repositoryUrl ||
  "";

export default function AdminProjects() {
  const [projects, setProjects] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

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

  const loadProjects = useCallback(
    async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getAdminProjects();

        const receivedProjects =
          Array.isArray(data)
            ? data
            : data?.projects ||
              data?.items ||
              [];

        setProjects(
          Array.isArray(
            receivedProjects
          )
            ? receivedProjects
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
            : "Impossible de charger les projets."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

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
    project
  ) => {
    const id =
      getProjectId(project);

    if (!id) {
      setError(
        "Impossible d'identifier ce projet."
      );

      return;
    }

    setEditingId(id);

    setForm({
      title:
        project?.title ||
        project?.name ||
        "",

      slug:
        project?.slug ||
        "",

      description:
        project?.description ||
        "",

      category:
        project?.category ||
        "",

      imageUrl:
        getProjectImage(
          project
        ),

      liveUrl:
        getProjectUrl(
          project
        ),

      githubUrl:
        getGithubUrl(
          project
        ),

      technologies:
        Array.isArray(
          project?.technologies
        )
          ? project.technologies.join(
              ", "
            )
          : typeof project?.technologies ===
              "string"
            ? project.technologies
            : "",
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
        "Le nom du projet est obligatoire."
      );

      return;
    }

    if (!description) {
      setError(
        "La description du projet est obligatoire."
      );

      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      ...form,

      title,

      description,

      slug:
        form.slug.trim(),

      category:
        form.category.trim(),

      imageUrl:
        form.imageUrl.trim(),

      liveUrl:
        form.liveUrl.trim(),

      githubUrl:
        form.githubUrl.trim(),

      technologies:
        form.technologies
          .split(",")
          .map(
            (item) =>
              item.trim()
          )
          .filter(Boolean),
    };

    try {
      if (editingId) {
        await updateProject(
          editingId,
          payload
        );

        setSuccess(
          "Le projet a été modifié avec succès."
        );
      } else {
        await createProject(
          payload
        );

        setSuccess(
          "Le projet a été ajouté avec succès."
        );
      }

      setForm({
        ...emptyForm,
      });

      setEditingId(null);

      await loadProjects();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : editingId
            ? "Impossible de modifier le projet."
            : "Impossible d'ajouter le projet."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    project
  ) => {
    const id =
      getProjectId(project);

    if (!id || deletingId) {
      return;
    }

    const title =
      getProjectTitle(project);

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
      await deleteProject(id);

      setProjects(
        (current) =>
          current.filter(
            (item) =>
              getProjectId(item) !==
              id
          )
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess(
        "Le projet a été supprimé avec succès."
      );
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : "Impossible de supprimer le projet."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <SEO
        title="Gestion des projets"
        description="Gestion des réalisations du portfolio Luc DEGUENON."
      />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>
                ADMINISTRATION
              </span>

              <h1>Projets</h1>

              <p>
                Ajoutez, modifiez ou
                supprimez les réalisations
                présentées dans le portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={
                loadProjects
              }
              className="admin-action"
              disabled={loading}
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "admin-projects-spin"
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
                    ? "Modifier le projet"
                    : "Ajouter un projet"}
                </h2>

                <p>
                  Les informations enregistrées
                  seront utilisées par le portfolio
                  public.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={
                    resetForm
                  }
                  className="admin-cancel"
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
              <div className="admin-form__grid">
                <label>
                  <span>
                    Nom du projet
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
                    placeholder="Nom du projet"
                    autoComplete="off"
                    required
                  />
                </label>

                <label>
                  <span>
                    Slug
                  </span>

                  <input
                    type="text"
                    name="slug"
                    value={
                      form.slug
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="mon-projet"
                    autoComplete="off"
                  />
                </label>

                <label>
                  <span>
                    Catégorie
                  </span>

                  <input
                    type="text"
                    name="category"
                    value={
                      form.category
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Développement web"
                  />
                </label>

                <label>
                  <span>
                    Image
                  </span>

                  <input
                    type="url"
                    name="imageUrl"
                    value={
                      form.imageUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                    inputMode="url"
                  />
                </label>

                <label>
                  <span>
                    Site web
                  </span>

                  <input
                    type="url"
                    name="liveUrl"
                    value={
                      form.liveUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://..."
                    inputMode="url"
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
                      form.githubUrl
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://github.com/..."
                    inputMode="url"
                  />
                </label>
              </div>

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
                  placeholder="Décrivez brièvement cette réalisation..."
                  required
                />
              </label>

              <label>
                <span>
                  Technologies
                </span>

                <input
                  type="text"
                  name="technologies"
                  value={
                    form.technologies
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="React, Node.js, MongoDB"
                />

                <small className="admin-field-help">
                  Séparez les technologies
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
                      ? "Modifier le projet"
                      : "Ajouter le projet"}
                </span>
              </button>
            </form>
          </section>

          <section className="admin-list">
            <div className="admin-list__header">
              <h2>
                Réalisations existantes
              </h2>

              <span>
                {projects.length}{" "}
                projet
                {projects.length > 1
                  ? "s"
                  : ""}
              </span>
            </div>

            {loading ? (
              <div
                className="admin-projects-state"
                role="status"
              >
                <RefreshCw
                  size={26}
                  className="admin-projects-spin"
                  aria-hidden="true"
                />

                <p>
                  Chargement des projets...
                </p>
              </div>
            ) : projects.length ===
              0 ? (
              <div className="admin-projects-state">
                <p>
                  Aucun projet disponible.
                </p>
              </div>
            ) : (
              <div className="admin-list__items">
                {projects.map(
                  (project) => {
                    const id =
                      getProjectId(
                        project
                      );

                    const title =
                      getProjectTitle(
                        project
                      );

                    const image =
                      getProjectImage(
                        project
                      );

                    const liveUrl =
                      getProjectUrl(
                        project
                      );

                    return (
                      <article
                        key={
                          id ||
                          title
                        }
                        className="admin-project-item"
                      >
                        {image && (
                          <div className="admin-project-item__image">
                            <img
                              src={image}
                              alt=""
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        )}

                        <div className="admin-project-item__content">
                          <h3>
                            {title}
                          </h3>

                          <p>
                            {project?.category ||
                              "Sans catégorie"}
                          </p>

                          {Array.isArray(
                            project?.technologies
                          ) &&
                            project.technologies.length >
                              0 && (
                              <div className="admin-project-item__tags">
                                {project.technologies
                                  .slice(
                                    0,
                                    5
                                  )
                                  .map(
                                    (
                                      technology
                                    ) => (
                                      <span
                                        key={
                                          technology
                                        }
                                      >
                                        {
                                          technology
                                        }
                                      </span>
                                    )
                                  )}
                              </div>
                            )}
                        </div>

                        <div className="admin-list__actions">
                          {liveUrl && (
                            <a
                              href={
                                liveUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="admin-project-link"
                              aria-label={`Voir ${title}`}
                            >
                              <ExternalLink
                                size={
                                  17
                                }
                                aria-hidden="true"
                              />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                project
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
                                project
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
