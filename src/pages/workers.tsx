
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatWorkerNumber, getNextWorkerNumber, getStoredWorkers, type Worker, WORKERS_STORAGE_KEY } from "../data/workers";
import { useLocalization } from "../localization";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  workerNumber: "",
  username: "",
  password: "",
  points: 0,
  pickups: 0,
};

function Workers() {
  const { t } = useLocalization();
  const [workers, setWorkers] = useState<Worker[]>(() =>
    getStoredWorkers().map((worker, index) => ({
      ...worker,
      workerNumber: worker.workerNumber ?? formatWorkerNumber(index + 1),
      username: worker.username ?? "",
      password: worker.password ?? "",
    })),
  );

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    localStorage.setItem(WORKERS_STORAGE_KEY, JSON.stringify(workers));
  }, [workers]);

  function openAddForm() {
    setNotice("");
    setForm({ ...emptyForm, workerNumber: getNextWorkerNumber(workers) });
    setFormError("");
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(worker: Worker) {
    setNotice("");
    setFormError("");
    setForm({
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      service: worker.service,
      workerNumber: worker.workerNumber ?? "",
      username: worker.username ?? "",
      password: worker.password ?? "",
      points: worker.points ?? 0,
      pickups: worker.pickups ?? 0,
    });
    setEditingId(worker.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedUsername = form.username.trim().toLocaleLowerCase();
    const usernameIsTaken = workers.some((worker) =>
      worker.id !== editingId && worker.username?.trim().toLocaleLowerCase() === normalizedUsername
    );
    if (usernameIsTaken) {
      setFormError(t("usernameExists"));
      return;
    }

    if (editingId) {
      setWorkers((current) =>
        current.map((worker) =>
          worker.id === editingId
            ? { ...worker, ...form }
            : worker
        )
      );
      setNotice(t("workerSaved"));
    } else {
      const newWorker: Worker = {
        id: crypto.randomUUID(),
        ...form,
      };

      setWorkers((current) => [...current, newWorker]);
      setNotice(t("workerAdded"));
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      t("deleteConfirmation")
    );

    if (confirmed) {
      setWorkers((current) =>
        current.filter((worker) => worker.id !== id)
      );
    }
  }

  const filteredWorkers = workers.filter((worker) => {
    const query = search.toLocaleLowerCase();
    const localizedService = t(
      worker.service.toLowerCase() as "pickup" | "delivery" | "collection" | "other",
    ).toLocaleLowerCase();

    return (
      worker.name.toLocaleLowerCase().includes(query) ||
      worker.workerNumber?.toLocaleLowerCase().includes(query) ||
      worker.username?.toLocaleLowerCase().includes(query) ||
      worker.email.toLocaleLowerCase().includes(query) ||
      worker.service.toLocaleLowerCase().includes(query) ||
      localizedService.includes(query)
    );
  });

  return (
      <main className="workers-page">
      <div className="workers-header">
        <div>
          <p className="eyebrow">{t("workers")}</p>
          <h1>{t("workerManagement")}</h1>
          <p>{t("workerManagementSubtitle")}</p>
        </div>

        <button onClick={openAddForm}>
          <span aria-hidden="true">+</span> {t("addWorker")}
        </button>
      </div>

      <div className="workers-toolbar">
        <input
          type="search"
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>{t("showingWorkers", { shown: filteredWorkers.length, total: workers.length })}</span>
      </div>

      {notice && <div className="success-notice" role="status">{notice}</div>}

      {showForm && (
        <div className="worker-form-card">
          <h2>{editingId ? t("editWorker") : t("addWorker")}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-section-heading">
              <h3>{t("appCredentials")}</h3>
              <p>{t("credentialsNote")}</p>
            </div>

            <div className="form-field">
              <label htmlFor="worker-number">{t("workerNumber")}</label>
              <input id="worker-number" value={form.workerNumber} readOnly />
            </div>

            <div className="form-field">
              <label htmlFor="worker-username">{t("username")}</label>
              <input id="worker-username" value={form.username} onChange={(e) => { setForm({ ...form, username: e.target.value }); setFormError(""); }} placeholder={t("usernamePlaceholder")} autoComplete="off" required />
            </div>

            <div className="form-field full-width-field">
              <label htmlFor="worker-password">{t("accountPassword")}</label>
              <input id="worker-password" type="password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={t("accountPasswordPlaceholder")} autoComplete="new-password" required />
            </div>

            {formError && <p className="form-error" role="alert">{formError}</p>}

            <div className="form-section-heading personal-details-heading">
              <h3>{t("workerDetails")}</h3>
            </div>

            <div className="form-field">
              <label htmlFor="worker-name">{t("fullName")}</label>
              <input id="worker-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("fullNamePlaceholder")} required />
            </div>

            <div className="form-field">
              <label htmlFor="worker-email">{t("email")}</label>
              <input id="worker-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t("emailPlaceholder")} required />
            </div>

            <div className="form-field">
              <label htmlFor="worker-phone">{t("phone")}</label>
              <input id="worker-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t("phonePlaceholder")} required />
            </div>

            <div className="form-field">
              <label htmlFor="worker-service">{t("service")}</label>
              <select id="worker-service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} required>
                <option value="">{t("selectService")}</option>
                <option value="Pickup">{t("pickup")}</option>
                <option value="Delivery">{t("delivery")}</option>
                <option value="Collection">{t("collection")}</option>
                <option value="Other">{t("other")}</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="worker-points">{t("totalPoints")}</label>
              <input id="worker-points" type="number" min="0" value={form.points} onChange={(e) => setForm({ ...form, points: Math.max(0, Number(e.target.value)) })} placeholder={t("pointsPlaceholder")} required />
            </div>

            <div className="form-field">
              <label htmlFor="worker-pickups">{t("medicalWastePickups")}</label>
              <input id="worker-pickups" type="number" min="0" value={form.pickups} onChange={(e) => setForm({ ...form, pickups: Math.max(0, Number(e.target.value)) })} placeholder={t("pickupsPlaceholder")} required />
            </div>

            <div className="worker-form-actions">
              <button type="submit">
                {editingId ? t("saveChanges") : t("addWorker")}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="workers-table-wrapper">
        <table className="workers-table">
          <thead>
            <tr>
              <th>{t("fullName")}</th>
              <th>{t("workerNumber")}</th>
              <th>{t("username")}</th>
              <th>{t("email")}</th>
              <th>{t("phone")}</th>
              <th>{t("service")}</th>
              <th>{t("actions")}</th>
            </tr>
          </thead>

          <tbody>
            {filteredWorkers.map((worker) => (
              <tr key={worker.id}>
                <td><Link className="worker-name-link" to={`/workers/${worker.id}`} title={t("viewWorker")}>{worker.name}</Link></td>
                <td>{worker.workerNumber}</td>
                <td>{worker.username}</td>
                <td>{worker.email}</td>
                <td>{worker.phone}</td>
                <td>{t(worker.service.toLowerCase() as "pickup" | "delivery" | "collection" | "other")}</td>
                <td>
                  <div className="worker-actions">
                    <button
                      className="edit-button"
                      onClick={() => openEditForm(worker)}
                    >
                      {t("edit")}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(worker.id)}
                    >
                      {t("delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredWorkers.length === 0 && (
              <tr>
                <td colSpan={7} className="empty-state">
                  {search
                    ? t("noSearchResults")
                    : t("noWorkers")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </main>
  );
}

export default Workers;
