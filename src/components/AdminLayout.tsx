import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocalization } from "../localization";

function DashboardIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6v-9h-6v9Zm0-16v5h6V4h-6Z" /></svg>;
}

function WorkersIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-.32 0-.63.05-.91.14.57.8.91 1.79.91 2.86s-.34 2.06-.91 2.86c.28.09.59.14.91.14Zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" /></svg>;
}

function MapIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5.1-6-2.1-7 2.35V21l7-2.1 6 2.1 7-2.35V3L15 5.1Zm-5-1.03 4 1.4v13.46l-4-1.4V4.07ZM4 6.79l4-1.2v11.52l-4 1.2V6.79Zm16 10.42-4 1.2V6.89l4-1.2v11.52Z" /></svg>;
}

function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocalization();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || "admin@gmail.com";
  const currentPage = location.pathname.startsWith("/workers") ? t("workers") : location.pathname === "/map" ? t("locationMap") : t("dashboard");

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <div className="admin-layout">
      {menuOpen && <button type="button" className="sidebar-overlay visible" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <span className="brand-mark" aria-hidden="true">+</span>
          <div><strong>{t("appName")}</strong><small>{t("portalName")}</small></div>
        </div>
        <div className="sidebar-section-label">{t("portalName")}</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}><DashboardIcon /><span>{t("dashboard")}</span></NavLink>
          <NavLink to="/workers" onClick={() => setMenuOpen(false)}><WorkersIcon /><span>{t("workers")}</span></NavLink>
          <NavLink to="/map" onClick={() => setMenuOpen(false)}><MapIcon /><span>{t("locationMap")}</span></NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="admin-avatar" aria-hidden="true">A</div>
          <div className="admin-identity"><strong>Administrator</strong><small>{adminEmail}</small></div>
          <button type="button" className="sidebar-logout" onClick={handleLogout} title={t("logout")} aria-label={t("logout")}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 7 15.59 8.41 18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5-5-5ZM4 5h8V3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H4V5Z" /></svg>
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-title">
            <button type="button" className="menu-toggle" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
            <div><small>{t("appName")}</small><strong>{currentPage}</strong></div>
          </div>
          <LanguageSwitcher />
        </header>
        <div className="admin-page"><Outlet /></div>
      </div>
    </div>
  );
}

export default AdminLayout;
