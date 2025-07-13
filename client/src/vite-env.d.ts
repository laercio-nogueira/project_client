/// <reference types="vite/client" />

interface ViteTypeOptions {}

interface ImportMetaEnv {
  readonly BACKEND_URL?: string;
  readonly PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
