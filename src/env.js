export const BACKEND_BASE_URL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_DEV_BACKEND_URL
    : import.meta.env.VITE_PROD_BACKEND_URL;
