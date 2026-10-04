
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>

        <button onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main>
        <h2>Welcome, Admin!</h2>
        <p>Manage your application from here.</p>

        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Total Workers</h3>
            <p>0</p>
          </div>

          <div className="dashboard-card">
            <h3>Total Users</h3>
            <p>0</p>
          </div>

          <div className="dashboard-card">
            <h3>Pending Requests</h3>
            <p>0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
