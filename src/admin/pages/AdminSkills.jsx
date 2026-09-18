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
  getAdminSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../services/adminApi";

import "./AdminSkills.css";

const emptyForm = {
  name: "",
  description: "",
  percentage: "",
};

const getSkillId = (skill) =>
  skill?._id ||
  skill?.id ||
  null;

const getSkillName = (skill) =>
  skill?.name ||
  skill?.title ||
  "Compétence";

const getSkillPercentage = (
  skill
) => {
  const value =
    skill?.percentage ??
    skill?.level;

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return Math.min(
    100,
    Math.max(0, number)
  );
};

export default function AdminSkills() {
  const [skills, setSkills] =
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

  const loadSkills = useCallback(
    async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getAdminSkills();

        const receivedSkills =
          Array.isArray(data)
            ? data
            : data?.skills ||
              data?.items ||
              [];

        setSkills(
          Array.isArray(
            receivedSkills
          )
            ? receivedSkills
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
            : "Impossible de charger les compétences."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

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
    skill
  ) => {
    const id =
      getSkillId(skill);

    if (!id) {
      setError(
        "Impossible d'identifier cette compétence."
      );

      return;
    }

    const percentage =
      getSkillPercentage(
        skill
      );

    setEditingId(id);

    setForm({
      name:
        skill?.name ||
        skill?.title ||
        "",

      description:
        skill?.description ||
        "",

      percentage:
        percentage === null
          ? ""
          : String(
              percentage
            ),
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

    const name =
      form.name.trim();

    const description =
      form.description.trim();

    if (!name) {
      setError(
        "Le nom de la compétence est obligatoire."
      );

      return;
    }

    let percentage;

    if (
      form.percentage !== ""
    ) {
      const parsed =
        Number(
          form.percentage
        );

      if (
        !Number.isFinite(
          parsed
        )
      ) {
        setError(
          "Le niveau de maîtrise doit être un nombre."
        );

        return;
      }

      percentage =
        Math.min(
          100,
          Math.max(
            0,
            parsed
          )
        );
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      name,
      description,
      ...(percentage !==
        undefined && {
        percentage,
      }),
    };

    try {
      if (editingId) {
        await updateSkill(
          editingId,
          payload
        );

        setSuccess(
          "La compétence a été modifiée avec succès."
        );
      } else {
        await createSkill(
          payload
        );

        setSuccess(
          "La compétence a été ajoutée avec succès."
        );
      }

      setForm({
        ...emptyForm,
      });

      setEditingId(null);

      await loadSkills();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : editingId
            ? "Impossible de modifier la compétence."
            : "Impossible d'ajouter la compétence."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (
    skill
  ) => {
    const id =
      getSkillId(skill);

    if (!id || deletingId) {
      return;
    }

    const name =
      getSkillName(skill);

    const confirmed =
      window.confirm(
        `Voulez-vous vraiment supprimer « ${name} » ?`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError("");
    setSuccess("");

    try {
      await deleteSkill(id);

      setSkills(
        (current) =>
          current.filter(
            (item) =>
              getSkillId(item) !==
              id
          )
      );

      if (editingId === id) {
        setForm({
          ...emptyForm,
        });

        setEditingId(null);
      }

      setSuccess(
        "La compétence a été supprimée avec succès."
      );
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : "Impossible de supprimer la compétence."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <SEO
        title="Gestion des compétences"
        description="Gestion des compétences techniques du portfolio Luc DEGUENON."
      />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>
                ADMINISTRATION
              </span>

              <h1>
                Compétences
              </h1>

              <p>
                Gérez les technologies,
                compétences et niveaux
                affichés sur votre portfolio.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={
                loadSkills
              }
              disabled={loading}
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "admin-skills-spin"
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
                    ? "Modifier la compétence"
                    : "Ajouter une compétence"}
                </h2>

                <p>
                  Ajoutez une technologie
                  ou une compétence à votre
                  profil professionnel.
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
                  Nom de la compétence
                </span>

                <input
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="React"
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
                  rows={5}
                  placeholder="Décrivez votre compétence..."
                />
              </label>

              <label>
                <span>
                  Niveau de maîtrise (%)
                </span>

                <input
                  type="number"
                  name="percentage"
                  value={
                    form.percentage
                  }
                  onChange={
                    handleChange
                  }
                  min="0"
                  max="100"
                  step="1"
                  inputMode="numeric"
                  placeholder="90"
                />

                <small className="admin-field-help">
                  Valeur comprise entre
                  0 et 100.
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
                      ? "Modifier la compétence"
                      : "Ajouter la compétence"}
                </span>
              </button>
            </form>
          </section>

          <section className="admin-list">
            <div className="admin-list__header">
              <h2>
                Compétences existantes
              </h2>

              <span>
                {skills.length}{" "}
                compétence
                {skills.length >
                1
                  ? "s"
                  : ""}
              </span>
            </div>

            {loading ? (
              <div
                className="admin-skills-state"
                role="status"
              >
                <RefreshCw
                  size={26}
                  className="admin-skills-spin"
                  aria-hidden="true"
                />

                <p>
                  Chargement des
                  compétences...
                </p>
              </div>
            ) : skills.length ===
              0 ? (
              <div className="admin-skills-state">
                <p>
                  Aucune compétence
                  disponible.
                </p>
              </div>
            ) : (
              <div className="admin-list__items">
                {skills.map(
                  (skill) => {
                    const id =
                      getSkillId(
                        skill
                      );

                    const name =
                      getSkillName(
                        skill
                      );

                    const percentage =
                      getSkillPercentage(
                        skill
                      );

                    return (
                      <article
                        key={
                          id ||
                          name
                        }
                        className="admin-skill-item"
                      >
                        <div className="admin-skill-item__content">
                          <div className="admin-skill-item__top">
                            <h3>
                              {name}
                            </h3>

                            {percentage !==
                              null && (
                              <strong>
                                {
                                  percentage
                                }
                                %
                              </strong>
                            )}
                          </div>

                          {skill?.description && (
                            <p>
                              {
                                skill.description
                              }
                            </p>
                          )}

                          {percentage !==
                            null && (
                            <div
                              className="admin-skill-progress"
                              aria-label={`Niveau de maîtrise : ${percentage}%`}
                            >
                              <span
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="admin-list__actions">
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                skill
                              )
                            }
                            disabled={
                              Boolean(
                                deletingId
                              )
                            }
                            aria-label={`Modifier ${name}`}
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
                                skill
                              )
                            }
                            disabled={
                              deletingId ===
                              id
                            }
                            aria-label={`Supprimer ${name}`}
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
