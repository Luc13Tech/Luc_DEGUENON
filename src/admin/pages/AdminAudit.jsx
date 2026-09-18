import { useCallback, useEffect, useState } from "react";
import {
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import { getAuditLogs } from "../services/adminApi";

import "./AdminAudit.css";

export default function AdminAudit() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAuditLogs({
        limit: 100,
      });

      const receivedLogs =
        Array.isArray(data)
          ? data
          : data?.logs ||
            data?.auditLogs ||
            data?.items ||
            [];

      setLogs(
        Array.isArray(receivedLogs)
          ? receivedLogs
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
          : "Impossible de charger les journaux de sécurité."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const getAction = (log) => {
    return (
      log?.action ||
      log?.event ||
      log?.type ||
      log?.operation ||
      "Action"
    );
  };

  const getStatus = (log) => {
    return String(
      log?.status ||
        log?.result ||
        log?.outcome ||
        ""
    ).toLowerCase();
  };

  const isFailure = (log) => {
    const status = getStatus(log);

    return (
      status.includes("fail") ||
      status.includes("error") ||
      status.includes("denied") ||
      status.includes("reject") ||
      status.includes("invalid")
    );
  };

  const formatDate = (value) => {
    if (!value) {
      return "Date inconnue";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return date.toLocaleString("fr-FR", {
      dateStyle: "medium",
      timeStyle: "medium",
    });
  };

  const getUser = (log) => {
    return (
      log?.user?.name ||
      log?.user?.email ||
      log?.admin?.name ||
      log?.admin?.email ||
      log?.email ||
      log?.username ||
      "Système"
    );
  };

  const getIp = (log) => {
    return (
      log?.ip ||
      log?.ipAddress ||
      log?.clientIp ||
      log?.requestIp ||
      "Non disponible"
    );
  };

  const formatDetails = (details) => {
    if (!details) {
      return "";
    }

    if (typeof details === "string") {
      return details;
    }

    try {
      return JSON.stringify(details);
    } catch {
      return "Détails indisponibles";
    }
  };

  return (
    <>
      <SEO
        title="Journal de sécurité"
        description="Journal des activités administratives du portfolio Luc DEGUENON."
      />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>

              <h1>
                Journal de sécurité
              </h1>

              <p>
                Consultez les actions enregistrées
                par le système d'administration.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadLogs}
              disabled={loading}
              aria-label="Actualiser le journal de sécurité"
            >
              <RefreshCw
                size={18}
                className={
                  loading
                    ? "admin-audit-spin"
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

          <section
            className="admin-security-summary"
            aria-label="État de la sécurité"
          >
            <div
              className="admin-security-summary__icon"
              aria-hidden="true"
            >
              <ShieldCheck
                size={28}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <strong>
                Surveillance des activités
              </strong>

              <p>
                Les connexions et opérations
                administratives enregistrées
                par le backend peuvent être
                consultées ici.
              </p>
            </div>
          </section>

          {error && (
            <div
              className="admin-message admin-message--error"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          <section
            className="admin-list"
            aria-labelledby="audit-list-title"
          >
            <div className="admin-list__header">
              <h2 id="audit-list-title">
                Activités récentes
                {logs.length > 0 &&
                  ` (${logs.length})`}
              </h2>
            </div>

            {loading ? (
              <div
                className="admin-audit-state"
                role="status"
                aria-live="polite"
              >
                <RefreshCw
                  size={25}
                  className="admin-audit-spin"
                  aria-hidden="true"
                />

                <p>
                  Chargement du journal de
                  sécurité...
                </p>
              </div>
            ) : logs.length === 0 ? (
              <div className="admin-audit-empty">
                <ShieldCheck
                  size={35}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                <strong>
                  Aucun événement
                </strong>

                <p>
                  Aucun événement de sécurité
                  n'est actuellement disponible.
                </p>
              </div>
            ) : (
              <div className="admin-audit-list">
                {logs.map((log, index) => {
                  const failed =
                    isFailure(log);

                  const id =
                    log?._id ||
                    log?.id ||
                    `audit-${index}`;

                  const date =
                    log?.createdAt ||
                    log?.timestamp ||
                    log?.date;

                  const details =
                    formatDetails(
                      log?.details
                    );

                  return (
                    <article
                      key={id}
                      className={`admin-audit-item${
                        failed
                          ? " admin-audit-item--danger"
                          : ""
                      }`}
                    >
                      <div
                        className="admin-audit-item__icon"
                        aria-hidden="true"
                      >
                        {failed ? (
                          <AlertTriangle
                            size={21}
                            strokeWidth={1.8}
                          />
                        ) : (
                          <CheckCircle
                            size={21}
                            strokeWidth={1.8}
                          />
                        )}
                      </div>

                      <div className="admin-audit-item__content">
                        <div className="admin-audit-item__top">
                          <strong>
                            {getAction(log)}
                          </strong>

                          <time
                            dateTime={
                              date
                                ? new Date(
                                    date
                                  ).toISOString()
                                : undefined
                            }
                          >
                            {formatDate(date)}
                          </time>
                        </div>

                        <p>
                          <strong>
                            Utilisateur :
                          </strong>{" "}
                          {getUser(log)}
                        </p>

                        <small>
                          Adresse IP :{" "}
                          {getIp(log)}
                        </small>

                        {log?.description && (
                          <small>
                            {String(
                              log.description
                            )}
                          </small>
                        )}

                        {details && (
                          <small className="admin-audit-item__details">
                            {details}
                          </small>
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
