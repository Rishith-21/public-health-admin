
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useLocalization } from "../localization";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useLocalization();

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setError(t("invalidLogin"));
    }
  }

  return (
    <div className="login-container">
      <div className="login-language"><LanguageSwitcher /></div>
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-logo" aria-hidden="true">+</div>
        <h1>{t("loginTitle")}</h1>
        <p>{t("loginSubtitle")}</p>

        <label htmlFor="email">{t("email")}</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          required
        />

        <label htmlFor="password">{t("password")}</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("passwordPlaceholder")}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">{t("login")}</button>
      </form>
    </div>
  );
}

export default Login;
