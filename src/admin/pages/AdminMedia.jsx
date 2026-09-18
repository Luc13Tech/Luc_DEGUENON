import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Upload,
  Trash2,
  RefreshCw,
  Image as ImageIcon,
  Copy,
  Check,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import {
  uploadMedia,
  getAdminMedia,
  deleteMedia,
} from "../services/adminApi";

import "./AdminMedia.css";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export default function AdminMedia() {
  const fileInputRef = useRef(null);

  const [media, setMedia] = useState([]);
  const [selectedFile, setSelectedFile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [copiedId, setCopiedId] =
    useState(null);

  const loadMedia = useCallback(
    async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getAdminMedia();

        const receivedMedia =
          Array.isArray(data)
            ? data
            : data?.media ||
              data?.items ||
              [];

        setMedia(
          Array.isArray(receivedMedia)
            ? receivedMedia
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
            : "Impossible de charger les médias."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (
      !ALLOWED_TYPES.includes(
        file.type
      )
    ) {
      setSelectedFile(null);

      event.target.value = "";

      setError(
        "Format non autorisé. Utilisez JPG, PNG, WEBP ou GIF."
      );

      return;
    }

    if (
      file.size > MAX_FILE_SIZE
    ) {
      setSelectedFile(null);

      event.target.value = "";

      setError(
        "L'image est trop volumineuse. La taille maximale est de 10 MB."
      );

      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async (
    event
  ) => {
    event.preventDefault();

    if (uploading) {
      return;
    }

    if (!selectedFile) {
      setError(
        "Sélectionnez une image avant l'envoi."
      );

      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData =
        new FormData();

      formData.append(
        "file",
        selectedFile
      );

      await uploadMedia(formData);

      setSuccess(
        "Le média a été envoyé avec succès."
      );

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }

      await loadMedia();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : "Impossible d'envoyer le média."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (
    item
  ) => {
    const id =
      item?._id ||
      item?.id;

    if (!id || deletingId) {
      return;
    }

    const name =
      getMediaName(item);

    const confirmed =
      window.confirm(
        `Voulez-vous vraiment supprimer le média « ${name} » ?`
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");
    setDeletingId(id);

    try {
      await deleteMedia(id);

      setSuccess(
        "Le média a été supprimé avec succès."
      );

      setMedia((current) =>
        current.filter(
          (mediaItem) =>
            (mediaItem?._id ||
              mediaItem?.id) !== id
        )
      );
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error;

      setError(
        typeof message === "string" &&
          message.trim()
          ? message.trim()
          : "Impossible de supprimer le média."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getMediaUrl = (
    item
  ) => {
    return (
      item?.url ||
      item?.secureUrl ||
      item?.secure_url ||
      item?.imageUrl ||
      item?.cloudinaryUrl ||
      item?.mediaUrl ||
      item?.fileUrl ||
      ""
    );
  };

  const getMediaName = (
    item
  ) => {
    return (
      item?.originalName ||
      item?.original_name ||
      item?.filename ||
      item?.name ||
      item?.publicId ||
      "Média"
    );
  };

  const copyUrl = async (
    item
  ) => {
    const url =
      getMediaUrl(item);

    if (!url) {
      return;
    }

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          url
        );
      } else {
        const textarea =
          document.createElement(
            "textarea"
          );

        textarea.value = url;

        textarea.style.position =
          "fixed";
        textarea.style.opacity =
          "0";

        document.body.appendChild(
          textarea
        );

        textarea.focus();
        textarea.select();

        document.execCommand(
          "copy"
        );

        textarea.remove();
      }

      const id =
        item?._id ||
        item?.id;

      setCopiedId(id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      setError(
        "Impossible de copier l'URL."
      );
    }
  };

  const formatFileSize = (
    bytes
  ) => {
    if (!bytes) {
      return "0 KB";
    }

    if (
      bytes >=
      1024 * 1024
    ) {
      return `${(
        bytes /
        1024 /
        1024
      ).toFixed(2)} MB`;
    }

    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  };

  return (
    <>
      <SEO
        title="Gestion des médias"
        description="Gestion des images et médias du portfolio Luc DEGUENON."
      />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>
                ADMINISTRATION
              </span>

              <h1>Médias</h1>

              <p>
                Gérez les images et médias
                utilisés dans votre portfolio.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadMedia}
              disabled={loading}
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "admin-media-spin"
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
                  Ajouter un média
                </h2>

                <p>
                  Les images seront envoyées
                  vers le système de stockage
                  configuré sur le backend.
                </p>
              </div>
            </div>

            <form
              className="admin-form"
              onSubmit={handleUpload}
            >
              <label
                htmlFor="admin-media-file"
              >
                Image

                <input
                  id="admin-media-file"
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
                  onChange={
                    handleFileChange
                  }
                  disabled={uploading}
                />
              </label>

              <small className="admin-media-help">
                JPG, PNG, WEBP ou GIF —
                10 MB maximum.
              </small>

              {selectedFile && (
                <div className="admin-media-selected">
                  <ImageIcon
                    size={20}
                    aria-hidden="true"
                  />

                  <div>
                    <strong>
                      {selectedFile.name}
                    </strong>

                    <small>
                      {formatFileSize(
                        selectedFile.size
                      )}
                    </small>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="admin-submit"
                disabled={
                  uploading ||
                  !selectedFile
                }
              >
                <Upload
                  size={18}
                  aria-hidden="true"
                />

                {uploading
                  ? "Envoi en cours..."
                  : "Envoyer le média"}
              </button>
            </form>
          </section>

          <section
            className="admin-list"
            aria-labelledby="media-library-title"
          >
            <div className="admin-list__header">
              <h2 id="media-library-title">
                Médiathèque
                {media.length > 0 &&
                  ` (${media.length})`}
              </h2>
            </div>

            {loading ? (
              <div
                className="admin-media-state"
                role="status"
              >
                <RefreshCw
                  size={26}
                  className="admin-media-spin"
                  aria-hidden="true"
                />

                <p>
                  Chargement des médias...
                </p>
              </div>
            ) : media.length === 0 ? (
              <div className="admin-media-empty">
                <ImageIcon
                  size={35}
                  aria-hidden="true"
                />

                <strong>
                  Aucun média
                </strong>

                <p>
                  Aucun média n'est
                  actuellement disponible.
                </p>
              </div>
            ) : (
              <div className="admin-media-grid">
                {media.map(
                  (item, index) => {
                    const id =
                      item?._id ||
                      item?.id ||
                      `media-${index}`;

                    const url =
                      getMediaUrl(
                        item
                      );

                    const name =
                      getMediaName(
                        item
                      );

                    const isDeleting =
                      deletingId ===
                      id;

                    return (
                      <article
                        key={id}
                        className="admin-media-card"
                      >
                        <div className="admin-media-card__preview">
                          {url ? (
                            <img
                              src={url}
                              alt={name}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="admin-media-card__placeholder">
                              <ImageIcon
                                size={35}
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>

                        <div className="admin-media-card__content">
                          <h3
                            title={name}
                          >
                            {name}
                          </h3>

                          {item?.type && (
                            <small>
                              {String(
                                item.type
                              )}
                            </small>
                          )}

                          {url && (
                            <div className="admin-media-card__actions">
                              <button
                                type="button"
                                onClick={() =>
                                  copyUrl(
                                    item
                                  )
                                }
                                className="admin-media-copy"
                                disabled={
                                  isDeleting
                                }
                              >
                                {copiedId ===
                                id ? (
                                  <Check
                                    size={
                                      17
                                    }
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Copy
                                    size={
                                      17
                                    }
                                    aria-hidden="true"
                                  />
                                )}

                                <span>
                                  {copiedId ===
                                  id
                                    ? "Copié"
                                    : "Copier l'URL"}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    item
                                  )
                                }
                                className="admin-media-delete"
                                disabled={
                                  isDeleting
                                }
                                aria-label={`Supprimer ${name}`}
                              >
                                <Trash2
                                  size={
                                    17
                                  }
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          )}

                          {!url && (
                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  item
                                )
                              }
                              className="admin-media-delete admin-media-delete--full"
                              disabled={
                                isDeleting
                              }
                            >
                              <Trash2
                                size={
                                  17
                                }
                                aria-hidden="true"
                              />

                              <span>
                                {isDeleting
                                  ? "Suppression..."
                                  : "Supprimer"}
                              </span>
                            </button>
                          )}
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
