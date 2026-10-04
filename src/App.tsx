
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Workers from "./pages/workers";
import WorkerDetails from "./pages/worker-details";
import ProtectedRoute from "./components/ProtectedRoute";
import { LocalizationProvider } from "./localization";

function App() {
  return (
    <LocalizationProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/workers"
            element={<Workers />}
          />

          <Route
            path="/workers/:workerId"
            element={<WorkerDetails />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
