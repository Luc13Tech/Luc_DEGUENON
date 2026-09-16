import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn(
    "⚠️ VITE_API_URL n'est pas configurée. Ajoute-la dans les variables d'environnement Vercel."
  );
}

const api = axios.create({
  baseURL: API_URL || "https://luc-deguenon-backend.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Récupération automatique du token CSRF lorsque le backend en fournit un.
api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrf_token");

    if (
      csrfToken &&
      ["post", "put", "patch", "delete"].includes(
        config.method?.toLowerCase()
      )
    ) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Gestion centralisée des erreurs API.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `❌ API ${error.response.status}:`,
        error.response.data?.message ||
          error.response.data?.error ||
          "Erreur serveur"
      );
    } else if (error.request) {
      console.error("❌ API inaccessible :", error.message);
    } else {
      console.error("❌ Erreur API :", error.message);
    }

    return Promise.reject(error);
  }
);

function getCookie(name) {
  const cookies = document.cookie ? document.cookie.split("; ") : [];

  for (const cookie of cookies) {
    const [key, ...value] = cookie.split("=");

    if (key === name) {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

export const apiGet = (url, config = {}) => api.get(url, config);

export const apiPost = (url, data = {}, config = {}) =>
  api.post(url, data, config);

export const apiPut = (url, data = {}, config = {}) =>
  api.put(url, data, config);

export const apiPatch = (url, data = {}, config = {}) =>
  api.patch(url, data, config);

export const apiDelete = (url, config = {}) =>
  api.delete(url, config);

export default api;
