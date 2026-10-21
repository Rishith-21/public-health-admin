/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_EMAIL?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly VITE_MAPBOX_ACCESS_TOKEN?: string;
  readonly VITE_MAPBOX_PUBLIC_KEY?: string;
  readonly VITE_MAPBOX_STYLE_URI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
