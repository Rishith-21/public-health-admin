import { useNavigate } from "react-router-dom";
import { getStoredWorkers } from "../data/workers";
import { useLocalization } from "../localization";

function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const workers = getStoredWorkers();
  const totalPoints = workers.reduce((sum, worker) => sum + (worker.points ?? 0), 0);
  const totalPickups = workers.reduce((sum, worker) => sum + (worker.pickups ?? 0), 0);

  return (
    <main className="page-content dashboard-content">
      <div className="page-heading">
        <p className="eyebrow">{t("dashboard")}</p>
        <h1>{t("welcome")}</h1>
        <p>{t("dashboardSubtitle")}</p>
      </div>

      <section className="dashboard-metrics" aria-label={t("dashboardSubtitle")}>
        <article className="dashboard-stat workers-stat">
          <div><span>{t("totalWorkers")}</span><strong>{workers.length}</strong><small>{t("registeredWorkers")}</small></div>
        </article>
        <article className="dashboard-stat points-stat">
          <div><span>{t("totalPoints")}</span><strong>{totalPoints}</strong><small>{t("workerManagement")}</small></div>
        </article>
        <article className="dashboard-stat pickups-stat">
          <div><span>{t("medicalWastePickups")}</span><strong>{totalPickups}</strong><small>{t("collection")}</small></div>
        </article>
      </section>

      <section className="dashboard-action-card">
        <div><span className="action-kicker">{t("workers")}</span><h2>{t("workerManagement")}</h2><p>{t("workerManagementSubtitle")}</p></div>
        <button type="button" onClick={() => navigate("/workers")}>{t("manageWorkers")} <span aria-hidden="true">→</span></button>
      </section>
    </main>
  );
}

export default Dashboard;
