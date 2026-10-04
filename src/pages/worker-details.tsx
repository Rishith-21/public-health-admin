import { Link, useParams } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { getStoredWorkers } from "../data/workers";
import { useLocalization } from "../localization";

function WorkerDetails() {
  const { workerId } = useParams();
  const { t } = useLocalization();
  const worker = getStoredWorkers().find((item) => item.id === workerId);

  if (!worker) {
    return (
      <div className="app-shell">
        <AdminHeader />
        <main className="worker-details-page">
          <Link className="back-link" to="/workers">← {t("backToWorkers")}</Link>
          <section className="not-found-panel">
            <h1>{t("workerNotFound")}</h1>
            <p>{t("workerNotFoundDesc")}</p>
          </section>
        </main>
      </div>
    );
  }

  const serviceKey = worker.service.toLowerCase() as "pickup" | "delivery" | "collection" | "other";

  return (
    <div className="app-shell">
      <AdminHeader />
      <main className="worker-details-page">
        <Link className="back-link" to="/workers">← {t("backToWorkers")}</Link>

        <section className="worker-profile-header">
          <div className="worker-avatar" aria-hidden="true">{worker.name.trim().charAt(0).toUpperCase()}</div>
          <div>
            <p className="eyebrow">{t("workerDetails")}</p>
            <h1>{worker.name}</h1>
            <span className="service-badge">{t(serviceKey)}</span>
          </div>
        </section>

        <div className="metric-grid">
          <article className="metric-card points-card">
            <span>{t("totalPoints")}</span>
            <strong>{worker.points ?? 0}</strong>
          </article>
          <article className="metric-card pickups-card">
            <span>{t("medicalWastePickups")}</span>
            <strong>{worker.pickups ?? 0}</strong>
          </article>
        </div>

        <section className="account-card">
          <h2>{t("loginAccount")}</h2>
          <dl>
            <div><dt>{t("workerNumber")}</dt><dd>{worker.workerNumber ?? "—"}</dd></div>
            <div><dt>{t("username")}</dt><dd>{worker.username || "—"}</dd></div>
            <div><dt>{t("accountPassword")}</dt><dd>{worker.password ? `•••••••• · ${t("passwordConfigured")}` : "—"}</dd></div>
          </dl>
        </section>

        <section className="contact-card">
          <h2>{t("contactInformation")}</h2>
          <dl>
            <div><dt>{t("email")}</dt><dd>{worker.email}</dd></div>
            <div><dt>{t("phone")}</dt><dd>{worker.phone}</dd></div>
            <div><dt>{t("service")}</dt><dd>{t(serviceKey)}</dd></div>
          </dl>
        </section>
      </main>
    </div>
  );
}

export default WorkerDetails;
