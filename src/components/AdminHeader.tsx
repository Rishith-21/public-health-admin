import { NavLink, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocalization } from "../localization";

function AdminHeader() {
  const navigate = useNavigate();
  const { t } = useLocalization();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <header>
      <div className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">+</span>
          <div><strong>{t("appName")}</strong><small>{t("portalName")}</small></div>
        </div>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        <div className="nav-inner">
          <NavLink to="/dashboard">{t("dashboard")}</NavLink>
          <NavLink to="/workers">{t("workers")}</NavLink>
          <div className="header-actions">
            <LanguageSwitcher />
            <button type="button" className="logout-button" onClick={handleLogout}>{t("logout")}</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminHeader;
