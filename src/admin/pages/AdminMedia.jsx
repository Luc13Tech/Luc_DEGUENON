import { useEffect, useRef, useState } from "react";
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

export default function AdminMedia() {
  const fileInputRef = useRef(null);

  const [media, setMedia] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const loadMedia = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminMedia();

      setMedia(
        Array.isArray(data)
          ? data
          : data?.media || data?.items || []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les médias."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setError("");
    setSuccess("");
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Sélectionnez une image avant l'envoi.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      await uploadMedia(formData);

      setSuccess(
        "Le média a été envoyé avec succès."
      );

      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await loadMedia();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'envoyer le média."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    const id = item?._id || item?.id;

    if (!id) return;

    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce média ?"
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteMedia(id);

      setSuccess(
        "Le média a été supprimé avec succès."
      );

      await loadMedia();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de supprimer le média."
      );
    }
  };

  const getMediaUrl = (item) => {
    return (
      item?.url ||
      item?.secureUrl ||
      item?.imageUrl ||
      item?.cloudinaryUrl ||
      item?.mediaUrl ||
      item?.fileUrl ||
      ""
    );
  };

  const getMediaName = (item) => {
    return (
      item?.originalName ||
      item?.filename ||
      item?.name ||
      item?.publicId ||
      "Média"
    );
  };

  const copyUrl = async (item) => {
    const url = getMediaUrl(item);

    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);

      const id = item?._id || item?.id;

      setCopiedId(id);

      setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      setError(
        "Impossible de copier l'URL."
      );
    }
  };

  return (
    <>
      <SEO title="Gestion des médias" />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>

              <h1>Médias</h1>

              <p>
                Gérez les images et médias utilisés dans
                votre portfolio.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadMedia}
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
            <div className="admin-form-card__header">
              <div>
                <h2>Ajouter un média</h2>

                <p>
                  Les images seront envoyées vers le système
                  de stockage configuré sur le backend.
                </p>
              </div>
            </div>

            <form
              className="admin-form"
              onSubmit={handleUpload}
            >
              <label>
                Image

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileChange}
                />
              </label>

              {selectedFile && (
                <div className="admin-media-selected">
                  <ImageIcon size={20} />

                  <div>
                    <strong>
                      {selectedFile.name}
                    </strong>

                    <small>
                      {(
                        selectedFile.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
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
                <Upload size={18} />

                {uploading
                  ? "Envoi en cours..."
                  : "Envoyer le média"}
              </button>
            </form>
          </section>

          <section className="admin-list">
            <h2>
              Médiathèque
              {media.length > 0 &&
                ` (${media.length})`}
            </h2>

            {loading ? (
              <p>
                Chargement des médias...
              </p>
            ) : media.length === 0 ? (
              <div className="admin-media-empty">
                <ImageIcon size={35} />

                <p>
                  Aucun média disponible.
                </p>
              </div>
            ) : (
              <div className="admin-media-grid">
                {media.map((item, index) => {
                  const id =
                    item?._id ||
                    item?.id ||
                    index;

                  const url =
                    getMediaUrl(item);

                  const name =
                    getMediaName(item);

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
                          />
                        ) : (
                          <div className="admin-media-card__placeholder">
                            <ImageIcon size={35} />
                          </div>
                        )}
                      </div>

                      <div className="admin-media-card__content">
                        <h3 title={name}>
                          {name}
                        </h3>

                        {item?.type && (
                          <small>
                            {item.type}
                          </small>
                        )}

                        {url && (
                          <div className="admin-media-card__actions">
                            <button
                              type="button"
                              onClick={() =>
                                copyUrl(item)
                              }
                              className="admin-media-copy"
                            >
                              {copiedId === id ? (
                                <Check size={17} />
                              ) : (
                                <Copy size={17} />
                              )}

                              {copiedId === id
                                ? "Copié"
                                : "Copier l'URL"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(item)
                              }
                              className="admin-media-delete"
                              aria-label="Supprimer le média"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        )}

                        {!url && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item)
                            }
                            className="admin-media-delete admin-media-delete--full"
                          >
                            <Trash2 size={17} />
                            Supprimer
                          </button>
                        )}
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
