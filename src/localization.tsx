/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "kn";

const translations = {
  en: {
    appName: "Public Health Administration", portalName: "Worker Management Portal", language: "Language", english: "English", kannada: "ಕನ್ನಡ",
    loginTitle: "Admin Login", loginSubtitle: "Sign in to manage your workers.", email: "Email address", password: "Password",
    emailPlaceholder: "Enter your email", passwordPlaceholder: "Enter your password", login: "Sign in", invalidLogin: "Invalid email or password",
    dashboard: "Dashboard", workers: "Workers", logout: "Log out", welcome: "Administration Dashboard",
    dashboardSubtitle: "Workforce registration and management overview", totalWorkers: "Total workers", registeredWorkers: "Registered in the system",
    manageWorkers: "Manage workers", workerManagement: "Worker management", workerManagementSubtitle: "Add, update, and remove registered workers.",
    addWorker: "Add worker", editWorker: "Edit worker", searchPlaceholder: "Search by name, email, or service", fullName: "Full name",
    fullNamePlaceholder: "Enter full name", phone: "Phone number", phonePlaceholder: "Enter phone number", service: "Service",
    selectService: "Select a service", pickup: "Pickup", delivery: "Delivery", collection: "Collection", other: "Other", actions: "Actions",
    edit: "Edit", delete: "Delete", saveChanges: "Save changes", cancel: "Cancel", noWorkers: "No workers have been added yet.",
    noSearchResults: "No workers match your search.", deleteConfirmation: "Are you sure you want to delete this worker?",
    showingWorkers: "{shown} of {total} workers", workerSaved: "Worker details saved successfully.", workerAdded: "Worker added successfully.",
    workerDetails: "Worker details", backToWorkers: "Back to workers", totalPoints: "Total points earned", medicalWastePickups: "Medical waste pickups",
    pointsPlaceholder: "Enter total points", pickupsPlaceholder: "Enter pickup count", contactInformation: "Contact information",
    workerNotFound: "Worker not found", workerNotFoundDesc: "This worker may have been removed or the link is invalid.", viewWorker: "View worker details",
    appCredentials: "App login credentials", workerNumber: "Worker number", username: "Username", usernamePlaceholder: "Create a unique username",
    accountPassword: "Password", accountPasswordPlaceholder: "Create a temporary password", credentialsNote: "Prototype only: credentials are stored in this browser. A production app must use secure backend authentication.",
    usernameExists: "This username is already assigned to another worker.", passwordConfigured: "Password configured", loginAccount: "App login account",
  },
  kn: {
    appName: "ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಆಡಳಿತ", portalName: "ಕಾರ್ಮಿಕರ ನಿರ್ವಹಣಾ ಪೋರ್ಟಲ್", language: "ಭಾಷೆ", english: "English", kannada: "ಕನ್ನಡ",
    loginTitle: "ನಿರ್ವಾಹಕರ ಲಾಗಿನ್", loginSubtitle: "ಕಾರ್ಮಿಕರನ್ನು ನಿರ್ವಹಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.", email: "ಇಮೇಲ್ ವಿಳಾಸ", password: "ಪಾಸ್‌ವರ್ಡ್",
    emailPlaceholder: "ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ", passwordPlaceholder: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ", login: "ಸೈನ್ ಇನ್", invalidLogin: "ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", workers: "ಕಾರ್ಮಿಕರು", logout: "ಲಾಗ್ ಔಟ್", welcome: "ಆಡಳಿತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    dashboardSubtitle: "ಕಾರ್ಮಿಕರ ನೋಂದಣಿ ಮತ್ತು ನಿರ್ವಹಣೆಯ ಸಂಕ್ಷಿಪ್ತ ವಿವರ", totalWorkers: "ಒಟ್ಟು ಕಾರ್ಮಿಕರು", registeredWorkers: "ವ್ಯವಸ್ಥೆಯಲ್ಲಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ",
    manageWorkers: "ಕಾರ್ಮಿಕರನ್ನು ನಿರ್ವಹಿಸಿ", workerManagement: "ಕಾರ್ಮಿಕರ ನಿರ್ವಹಣೆ", workerManagementSubtitle: "ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕರನ್ನು ಸೇರಿಸಿ, ನವೀಕರಿಸಿ ಮತ್ತು ತೆಗೆದುಹಾಕಿ.",
    addWorker: "ಕಾರ್ಮಿಕರನ್ನು ಸೇರಿಸಿ", editWorker: "ಕಾರ್ಮಿಕರನ್ನು ಸಂಪಾದಿಸಿ", searchPlaceholder: "ಹೆಸರು, ಇಮೇಲ್ ಅಥವಾ ಸೇವೆಯ ಮೂಲಕ ಹುಡುಕಿ", fullName: "ಪೂರ್ಣ ಹೆಸರು",
    fullNamePlaceholder: "ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ", phone: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ", phonePlaceholder: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ", service: "ಸೇವೆ",
    selectService: "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", pickup: "ಪಿಕಪ್", delivery: "ವಿತರಣೆ", collection: "ಸಂಗ್ರಹಣೆ", other: "ಇತರೆ", actions: "ಕ್ರಮಗಳು",
    edit: "ಸಂಪಾದಿಸಿ", delete: "ಅಳಿಸಿ", saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ", cancel: "ರದ್ದುಮಾಡಿ", noWorkers: "ಇನ್ನೂ ಯಾವುದೇ ಕಾರ್ಮಿಕರನ್ನು ಸೇರಿಸಲಾಗಿಲ್ಲ.",
    noSearchResults: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಯಾವುದೇ ಕಾರ್ಮಿಕರು ಸಿಗಲಿಲ್ಲ.", deleteConfirmation: "ಈ ಕಾರ್ಮಿಕರನ್ನು ಅಳಿಸಲು ಖಚಿತವಾಗಿ ಬಯಸುವಿರಾ?",
    showingWorkers: "{total} ಕಾರ್ಮಿಕರಲ್ಲಿ {shown} ತೋರಿಸಲಾಗುತ್ತಿದೆ", workerSaved: "ಕಾರ್ಮಿಕರ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.", workerAdded: "ಕಾರ್ಮಿಕರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ.",
    workerDetails: "ಕಾರ್ಮಿಕರ ವಿವರಗಳು", backToWorkers: "ಕಾರ್ಮಿಕರ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ", totalPoints: "ಗಳಿಸಿದ ಒಟ್ಟು ಅಂಕಗಳು", medicalWastePickups: "ವೈದ್ಯಕೀಯ ತ್ಯಾಜ್ಯ ಸಂಗ್ರಹಣೆಗಳು",
    pointsPlaceholder: "ಒಟ್ಟು ಅಂಕಗಳನ್ನು ನಮೂದಿಸಿ", pickupsPlaceholder: "ಸಂಗ್ರಹಣೆಗಳ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ", contactInformation: "ಸಂಪರ್ಕ ಮಾಹಿತಿ",
    workerNotFound: "ಕಾರ್ಮಿಕರು ಕಂಡುಬಂದಿಲ್ಲ", workerNotFoundDesc: "ಈ ಕಾರ್ಮಿಕರನ್ನು ತೆಗೆದುಹಾಕಿರಬಹುದು ಅಥವಾ ಲಿಂಕ್ ತಪ್ಪಾಗಿದೆ.", viewWorker: "ಕಾರ್ಮಿಕರ ವಿವರಗಳನ್ನು ನೋಡಿ",
    appCredentials: "ಆ್ಯಪ್ ಲಾಗಿನ್ ವಿವರಗಳು", workerNumber: "ಕಾರ್ಮಿಕರ ಸಂಖ್ಯೆ", username: "ಬಳಕೆದಾರ ಹೆಸರು", usernamePlaceholder: "ವಿಶಿಷ್ಟ ಬಳಕೆದಾರ ಹೆಸರನ್ನು ರಚಿಸಿ",
    accountPassword: "ಪಾಸ್‌ವರ್ಡ್", accountPasswordPlaceholder: "ತಾತ್ಕಾಲಿಕ ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ", credentialsNote: "ಮಾದರಿಗಾಗಿ ಮಾತ್ರ: ಲಾಗಿನ್ ವಿವರಗಳನ್ನು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. ನೈಜ ಆ್ಯಪ್ ಸುರಕ್ಷಿತ ಬ್ಯಾಕೆಂಡ್ ದೃಢೀಕರಣವನ್ನು ಬಳಸಬೇಕು.",
    usernameExists: "ಈ ಬಳಕೆದಾರ ಹೆಸರನ್ನು ಈಗಾಗಲೇ ಇನ್ನೊಬ್ಬ ಕಾರ್ಮಿಕರಿಗೆ ನೀಡಲಾಗಿದೆ.", passwordConfigured: "ಪಾಸ್‌ವರ್ಡ್ ಹೊಂದಿಸಲಾಗಿದೆ", loginAccount: "ಆ್ಯಪ್ ಲಾಗಿನ್ ಖಾತೆ",
  },
} as const;

type TranslationKey = keyof typeof translations.en;
type LocalizationContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
};

const LocalizationContext = createContext<LocalizationContextValue | null>(null);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem("admin_language") === "kn" ? "kn" : "en");

  useEffect(() => {
    localStorage.setItem("admin_language", language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LocalizationContextValue>(() => ({
    language,
    setLanguage,
    t: (key, values) => {
      let translatedText: string = translations[language][key];
      Object.entries(values ?? {}).forEach(([name, replacement]) => {
        translatedText = translatedText.replace(`{${name}}`, String(replacement));
      });
      return translatedText;
    },
  }), [language]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  if (!context) throw new Error("useLocalization must be used inside LocalizationProvider");
  return context;
}
