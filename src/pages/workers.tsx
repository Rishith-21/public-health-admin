
import { useEffect, useState } from "react";

type Worker = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
};

const STORAGE_KEY = "admin_workers";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
};

function Workers() {
  const [workers, setWorkers] = useState<Worker[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) as Worker[] : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workers));
  }, [workers]);

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(worker: Worker) {
    setForm({
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      service: worker.service,
    });
    setEditingId(worker.id);
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingId) {
      setWorkers((current) =>
        current.map((worker) =>
          worker.id === editingId
            ? { ...worker, ...form }
            : worker
        )
      );
    } else {
      const newWorker: Worker = {
        id: crypto.randomUUID(),
        ...form,
      };

      setWorkers((current) => [...current, newWorker]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this worker?"
    );

    if (confirmed) {
      setWorkers((current) =>
        current.filter((worker) => worker.id !== id)
      );
    }
  }

  const filteredWorkers = workers.filter((worker) => {
    const query = search.toLowerCase();

    return (
      worker.name.toLowerCase().includes(query) ||
      worker.email.toLowerCase().includes(query) ||
      worker.service.toLowerCase().includes(query)
    );
  });

  return (
    <div className="workers-page">
      <div className="workers-header">
        <div>
          <h1>Worker Management</h1>
          <p>Add and manage registered workers.</p>
        </div>

        <button onClick={openAddForm}>
          + Add Worker
        </button>
      </div>

      <div className="workers-toolbar">
        <input
          type="search"
          placeholder="Search name, email or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span>Total workers: {workers.length}</span>
      </div>

      {showForm && (
        <div className="worker-form-card">
          <h2>{editingId ? "Edit Worker" : "Add Worker"}</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="worker-name">Full name</label>
            <input
              id="worker-name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter full name"
              required
            />

            <label htmlFor="worker-email">Email</label>
            <input
              id="worker-email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Enter email"
              required
            />

            <label htmlFor="worker-phone">Phone</label>
            <input
              id="worker-phone"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              placeholder="Enter phone number"
              required
            />

            <label htmlFor="worker-service">Service</label>
            <select
              id="worker-service"
              value={form.service}
              onChange={(e) =>
                setForm({ ...form, service: e.target.value })
              }
              required
            >
              <option value="">Select service</option>
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
              <option value="Collection">Collection</option>
              <option value="Other">Other</option>
            </select>

            <div className="worker-form-actions">
              <button type="submit">
                {editingId ? "Save Changes" : "Add Worker"}
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="workers-table-wrapper">
        <table className="workers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredWorkers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.email}</td>
                <td>{worker.phone}</td>
                <td>{worker.service}</td>
                <td>
                  <div className="worker-actions">
                    <button
                      className="edit-button"
                      onClick={() => openEditForm(worker)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDelete(worker.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredWorkers.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">
                  {search
                    ? "No workers match your search."
                    : "No workers added yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workers;
