import axios from "axios";

/*

* =========================================================
* URL DE L'API
* =========================================================
  */

const API_URL =
import.meta.env.VITE_API_URL ||
"https://luc-deguenon-backend.onrender.com/api";

if (!import.meta.env.VITE_API_URL) {
console.warn(
"⚠️ VITE_API_URL n'est pas configurée. " +
"L'URL Render du backend est utilisée par défaut."
);
}

/*

* =========================================================
* INSTANCE AXIOS
* =========================================================
  */

const api = axios.create({
baseURL: API_URL,
withCredentials: true,
headers: {
"Content-Type": "application/json",
},
});

/*

* =========================================================
* LECTURE D'UN COOKIE
* =========================================================
  */

function getCookie(name) {
const cookies = document.cookie
? document.cookie.split("; ")
: [];

for (const cookie of cookies) {
const [key, ...value] = cookie.split("=");

if (key === name) {
  return decodeURIComponent(value.join("="));
}

}

return null;
}

/*

* =========================================================
* RÉCUPÉRATION DU TOKEN CSRF
* =========================================================
* 
* Le backend crée le cookie :
* 
* luc_csrf
* 
* avec GET /auth/csrf.
* 
* Cette fonction doit être appelée avant toute requête
* POST / PUT / PATCH / DELETE nécessitant le CSRF.
  */

export async function initializeCsrf() {
try {
const response = await api.get("/auth/csrf");

/*
 * Le cookie est normalement créé par le backend.
 * On conserve également le token retourné par l'API
 * en mémoire au cas où le navigateur ne l'expose pas
 * immédiatement via document.cookie.
 */
if (response.data?.csrfToken) {
  csrfTokenMemory = response.data.csrfToken;
}

return response.data?.csrfToken || null;

} catch (error) {
console.error(
"❌ Impossible d'initialiser la protection CSRF :",
error.response?.data?.message || error.message
);

throw error;

}
}

/*

* Token CSRF conservé en mémoire.
* 
* Important :
* Le cookie luc_csrf est volontairement non HttpOnly
* côté backend, mais nous gardons aussi le token retourné
* par /auth/csrf afin de rendre le flux plus fiable.
  */

let csrfTokenMemory = null;

/*

* =========================================================
* INTERCEPTEUR DES REQUÊTES
* =========================================================
  */

api.interceptors.request.use(
(config) => {
const method = config.method?.toLowerCase();

const methodsRequiringCsrf = [
  "post",
  "put",
  "patch",
  "delete",
];

if (methodsRequiringCsrf.includes(method)) {
  const csrfToken =
    csrfTokenMemory ||
    getCookie("luc_csrf");

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
}

return config;

},
(error) => Promise.reject(error)
);

/*

* =========================================================
* INTERCEPTEUR DES RÉPONSES
* =========================================================
  */

api.interceptors.response.use(
(response) => response,

(error) => {
if (error.response) {
console.error(
"❌ API ${error.response.status}:",
error.response.data?.message ||
error.response.data?.error ||
"Erreur serveur"
);
} else if (error.request) {
console.error(
"❌ API inaccessible :",
error.message
);
} else {
console.error(
"❌ Erreur API :",
error.message
);
}

return Promise.reject(error);

}
);

/*

* =========================================================
* MÉTHODES API
* =========================================================
  */

export const apiGet = (url, config = {}) =>
api.get(url, config);

export const apiPost = (
url,
data = {},
config = {}
) => api.post(url, data, config);

export const apiPut = (
url,
data = {},
config = {}
) => api.put(url, data, config);

export const apiPatch = (
url,
data = {},
config = {}
) => api.patch(url, data, config);

export const apiDelete = (
url,
config = {}
) => api.delete(url, config);

export default api;
