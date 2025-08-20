/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // pode adicionar outras variáveis aqui
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  