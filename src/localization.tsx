/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "kn";

const translations = {
  en: {
    appName: "Public Health Admin", portalName: "Worker Portal", language: "Language", english: "English", kannada: "ಕನ್ನಡ",
    loginTitle: "Admin Login", loginSubtitle: "Login to manage workers.", email: "Email", password: "Password",
    emailPlaceholder: "Enter email", passwordPlaceholder: "Enter password", login: "Login", invalidLogin: "Wrong email or password",
    dashboard: "Dashboard", workers: "Workers", logout: "Logout", welcome: "Admin Dashboard",
    dashboardSubtitle: "Overview of workers and pickups", totalWorkers: "Total Workers", registeredWorkers: "Total registered",
    manageWorkers: "Manage Workers", workerManagement: "Worker Management", workerManagementSubtitle: "Add, edit, or delete workers.",
    addWorker: "Add Worker", editWorker: "Edit Worker", searchPlaceholder: "Search name, email, or service", fullName: "Name",
    fullNamePlaceholder: "Enter name", phone: "Phone Number", phonePlaceholder: "Enter phone number", service: "Service",
    selectService: "Select service", pickup: "Pickup", delivery: "Delivery", collection: "Collection", other: "Other", actions: "Actions",
    edit: "Edit", delete: "Delete", saveChanges: "Save", cancel: "Cancel", noWorkers: "No workers added yet.",
    noSearchResults: "No matching workers found.", deleteConfirmation: "Delete this worker?",
    showingWorkers: "Showing {shown} of {total} workers", workerSaved: "Worker saved successfully.", workerAdded: "Worker added successfully.",
    workerDetails: "Worker Details", backToWorkers: "Back to Workers", totalPoints: "Total Points", medicalWastePickups: "Waste Pickups",
    pointsPlaceholder: "Enter points", pickupsPlaceholder: "Enter pickup count", contactInformation: "Contact Info",
    workerNotFound: "Worker Not Found", workerNotFoundDesc: "Worker not found or removed.", viewWorker: "View Details",
    appCredentials: "App Login Info", workerNumber: "Worker ID", username: "Username", usernamePlaceholder: "Enter username",
    accountPassword: "Password", accountPasswordPlaceholder: "Enter password", credentialsNote: "Note: Login details are saved in this browser.",
    usernameExists: "This username is already taken.", passwordConfigured: "Password set", loginAccount: "Login Account",
    locationMap: "Location Map", liveLocations: "Live Locations", locationMapSubtitle: "View live locations of workers and users.", liveTracking: "Live Map", allLocations: "All", publicUsers: "Public Users", trackedLocations: "Location List", demoLocationNote: "Showing demo locations on map.",
  },
  kn: {
    appName: "ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಅಡ್ಮಿನ್", portalName: "ವರ್ಕರ್ ಪೋರ್ಟಲ್", language: "ಭಾಷೆ", english: "English", kannada: "ಕನ್ನಡ",
    loginTitle: "ಅಡ್ಮಿನ್ ಲಾಗಿನ್", loginSubtitle: "ಲಾಗಿನ್ ಮಾಡಿ ಕಾರ್ಮಿಕರನ್ನು ನಿರ್ವಹಿಸಿ.", email: "ಇಮೇಲ್", password: "ಪಾಸ್‌ವರ್ಡ್",
    emailPlaceholder: "ಇಮೇಲ್ ಹಾಕಿ", passwordPlaceholder: "ಪಾಸ್‌ವರ್ಡ್ ಹಾಕಿ", login: "ಲಾಗಿನ್", invalidLogin: "ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", workers: "ಕಾರ್ಮಿಕರು", logout: "ಲಾಗ್ ಔಟ್", welcome: "ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    dashboardSubtitle: "ಕಾರ್ಮಿಕರು ಮತ್ತು ಪಿಕಪ್ ವಿವರಗಳು", totalWorkers: "ಒಟ್ಟು ಕಾರ್ಮಿಕರು", registeredWorkers: "ನೋಂದಾಯಿತ ಕಾರ್ಮಿಕರು",
    manageWorkers: "ಕಾರ್ಮಿಕರನ್ನು ನೋಡಿ", workerManagement: "ಕಾರ್ಮಿಕರ ನಿರ್ವಹಣೆ", workerManagementSubtitle: "ಕಾರ್ಮಿಕರನ್ನು ಸೇರಿಸಿ, ಬದಲಾಯಿಸಿ ಅಥವಾ ಅಳಿಸಿ.",
    addWorker: "ಹೊಸ ಕಾರ್ಮಿಕ ಸೇರಿಸಿ", editWorker: "ಕಾರ್ಮಿಕರ ವಿವರ ಬದಲಾಯಿಸಿ", searchPlaceholder: "ಹೆಸರು, ಇಮೇಲ್ ಮೂಲಕ ಹುಡುಕಿ", fullName: "ಹೆಸರು",
    fullNamePlaceholder: "ಹೆಸರು ಹಾಕಿ", phone: "ಮೊಬೈಲ್ ನಂಬರ್", phonePlaceholder: "ಮೊಬೈಲ್ ನಂಬರ್ ಹಾಕಿ", service: "ಸೇವೆ",
    selectService: "ಸೇವೆ ಆರಿಸಿ", pickup: "ಪಿಕಪ್", delivery: "ಡೆಲಿವರಿ", collection: "ಕಲೆಕ್ಷನ್", other: "ಇತರೆ", actions: "ಆಕ್ಷನ್",
    edit: "ಬದಲಾಯಿಸಿ", delete: "ಡಿಲೀಟ್", saveChanges: "ಸೇವ್ ಮಾಡಿ", cancel: "ರದ್ದು", noWorkers: "ಯಾವ ಕಾರ್ಮಿಕರೂ ಇಲ್ಲ.",
    noSearchResults: "ಫಲಿತಾಂಶ ಸಿಗಲಿಲ್ಲ.", deleteConfirmation: "ಈ ಕಾರ್ಮಿಕರನ್ನು ಡಿಲೀಟ್ ಮಾಡಬೇಕೆ?",
    showingWorkers: "{total} ರಲ್ಲಿ {shown} ಕಾರ್ಮಿಕರು", workerSaved: "ವಿವರ ಉಳಿಸಲಾಗಿದೆ.", workerAdded: "ಕಾರ್ಮಿಕರನ್ನು ಸೇರಿಸಲಾಗಿದೆ.",
    workerDetails: "ಕಾರ್ಮಿಕರ ವಿವರ", backToWorkers: "ಹಿಂದಕ್ಕೆ", totalPoints: "ಒಟ್ಟು ಪಾಯಿಂಟ್ಸ್", medicalWastePickups: "ವೇಸ್ಟ್ ಪಿಕಪ್‌ಗಳು",
    pointsPlaceholder: "ಪಾಯಿಂಟ್ಸ್ ಹಾಕಿ", pickupsPlaceholder: "ಪಿಕಪ್ ಸಂಖ್ಯೆ ಹಾಕಿ", contactInformation: "ಸಂಪರ್ಕ ವಿವರ",
    workerNotFound: "ಕಾರ್ಮಿಕರು ಸಿಗಲಿಲ್ಲ", workerNotFoundDesc: "ಕಾರ್ಮಿಕರ ವಿವರ ಲಭ್ಯವಿಲ್ಲ.", viewWorker: "ವಿವರ ನೋಡಿ",
    appCredentials: "ಲಾಗಿನ್ ವಿವರ", workerNumber: "ವರ್ಕರ್ ಐಡಿ", username: "ಯೂಸರ್ ನೇಮ್", usernamePlaceholder: "ಯೂಸರ್ ನೇಮ್ ಹಾಕಿ",
    accountPassword: "ಪಾಸ್‌ವರ್ಡ್", accountPasswordPlaceholder: "ಪಾಸ್‌ವರ್ಡ್ ಹಾಕಿ", credentialsNote: "ಸೂಚನೆ: ಲಾಗಿನ್ ವಿವರಗಳು ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಸೇವ್ ಆಗುತ್ತವೆ.",
    usernameExists: "ಈ ಯೂಸರ್ ನೇಮ್ ಈಗಾಗಲೇ ಬಳಕೆಯಲ್ಲಿದೆ.", passwordConfigured: "ಪಾಸ್‌ವರ್ಡ್ ಸೆಟ್ ಆಗಿದೆ", loginAccount: "ಲಾಗಿನ್ ಖಾತೆ",
    locationMap: "ಲೊಕೇಶನ್ ಮ್ಯಾಪ್", liveLocations: "ಲೈವ್ ಲೊಕೇಶನ್", locationMapSubtitle: "ಕಾರ್ಮಿಕರು ಮತ್ತು ಜನರ ಸ್ಥಳ ನೋಡಿ.", liveTracking: "ಲೈವ್ ಮ್ಯಾಪ್", allLocations: "ಎಲ್ಲಾ", publicUsers: "ಸಾರ್ವಜನಿಕರು", trackedLocations: "ಸ್ಥಳಗಳ ಪಟ್ಟಿ", demoLocationNote: "ಮ್ಯಾಪ್‌ನಲ್ಲಿ ಮಾದರಿ ಸ್ಥಳ ತೋರಿಸಲಾಗಿದೆ.",
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
