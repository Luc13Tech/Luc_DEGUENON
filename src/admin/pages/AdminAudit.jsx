import { useEffect, useState } from "react";
import {
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import Container from "../../components/Container";
import SEO from "../../components/SEO";

import { getAuditLogs } from "../services/adminApi";

export default function AdminAudit() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getAuditLogs({
        limit: 100,
      });

      setLogs(
        Array.isArray(data)
          ? data
          : data?.logs ||
              data?.auditLogs ||
              data?.items ||
              []
      );
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les journaux de sécurité."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const getAction = (log) => {
    return (
      log?.action ||
      log?.event ||
      log?.type ||
      "Action"
    );
  };

  const getStatus = (log) => {
    const value =
      log?.status ||
      log?.result ||
      "";

    return String(value).toLowerCase();
  };

  const isFailure = (log) => {
    const status = getStatus(log);

    return (
      status.includes("fail") ||
      status.includes("error") ||
      status.includes("denied") ||
      status.includes("failed")
    );
  };

  const formatDate = (value) => {
    if (!value) return "Date inconnue";

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
      "Non disponible"
    );
  };

  return (
    <>
      <SEO title="Journal de sécurité" />

      <main className="admin-page">
        <Container>
          <header className="admin-page__header">
            <div>
              <span>ADMINISTRATION</span>

              <h1>Journal de sécurité</h1>

              <p>
                Consultez les actions enregistrées par le
                système d'administration.
              </p>
            </div>

            <button
              type="button"
              className="admin-action"
              onClick={loadLogs}
              disabled={loading}
            >
              <RefreshCw size={18} />
              Actualiser
            </button>
          </header>

          <section className="admin-security-summary">
            <div className="admin-security-summary__icon">
              <ShieldCheck size={28} />
            </div>

            <div>
              <strong>
                Surveillance des activités
              </strong>

              <p>
                Les connexions et opérations administratives
                enregistrées par le backend peuvent être
                consultées ici.
              </p>
            </div>
          </section>

          {error && (
            <div
              className="admin-message admin-message--error"
              role="alert"
            >
              {error}
            </div>
          )}

          <section className="admin-list">
            <div className="admin-list__header">
              <h2>
                Activités récentes
                {logs.length > 0 &&
                  ` (${logs.length})`}
              </h2>
            </div>

            {loading ? (
              <p>
                Chargement du journal de sécurité...
              </p>
            ) : logs.length === 0 ? (
              <div className="admin-audit-empty">
                <ShieldCheck size={35} />

                <p>
                  Aucun événement de sécurité disponible.
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
                    index;

                  return (
                    <article
                      key={id}
                      className={`admin-audit-item ${
                        failed
                          ? "admin-audit-item--danger"
                          : ""
                      }`}
                    >
                      <div className="admin-audit-item__icon">
                        {failed ? (
                          <AlertTriangle
                            size={21}
                          />
                        ) : (
                          <CheckCircle
                            size={21}
                          />
                        )}
                      </div>

                      <div className="admin-audit-item__content">
                        <div className="admin-audit-item__top">
                          <strong>
                            {getAction(log)}
                          </strong>

                          <time>
                            {formatDate(
                              log?.createdAt ||
                                log?.timestamp ||
                                log?.date
                            )}
                          </time>
                        </div>

                        <p>
                          Utilisateur :{" "}
                          {getUser(log)}
                        </p>

                        <small>
                          Adresse IP : {getIp(log)}
                        </small>

                        {log?.description && (
                          <small>
                            {log.description}
                          </small>
                        )}

                        {log?.details && (
                          <small>
                            {typeof log.details ===
                            "string"
                              ? log.details
                              : JSON.stringify(
                                  log.details
                                )}
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
