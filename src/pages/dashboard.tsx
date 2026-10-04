
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { useLocalization } from "../localization";

const STORAGE_KEY = "admin_workers";

function getWorkerCount() {
  try {
    const workers = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(workers) ? workers.length : 0;
  } catch {
    return 0;
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const workerCount = getWorkerCount();

  return (
    <div className="app-shell">
      <AdminHeader />
      <main className="page-content dashboard-content">
        <div className="page-heading">
          <h1>{t("welcome")}</h1>
          <p>{t("dashboardSubtitle")}</p>
        </div>

        <section className="worker-summary" aria-label={t("totalWorkers")}>
          <div className="summary-icon" aria-hidden="true">●</div>
          <div className="summary-copy">
            <span>{t("totalWorkers")}</span>
            <strong>{workerCount}</strong>
            <small>{t("registeredWorkers")}</small>
          </div>
          <button type="button" onClick={() => navigate("/workers")}>
            {t("manageWorkers")} <span aria-hidden="true">→</span>
          </button>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
