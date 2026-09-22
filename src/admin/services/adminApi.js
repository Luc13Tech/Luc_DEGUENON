import api from "../../services/api";

/**

* =========================================================
* AUTHENTIFICATION ADMIN
* =========================================================
  */

/**

* Connexion administrateur
  */
  export async function adminLogin(credentials) {
  const response = await api.post(
  "/auth/login",
  credentials
  );

return response.data;
}

/**

* Déconnexion administrateur
  */
  export async function adminLogout() {
  const response = await api.post(
  "/auth/logout"
  );

return response.data;
}

/**

* Récupération de l'administrateur connecté
  */
  export async function getCurrentAdmin() {
  const response = await api.get(
  "/auth/me"
  );

return response.data;
}

/**

* =========================================================
* GESTION DES PROJETS
* =========================================================
* 
* Le backend utilise :
* 
* GET    /api/projects
* POST   /api/projects
* PUT    /api/projects/:id
* DELETE /api/projects/:id
  */

/**

* Liste des projets
  */
  export async function getAdminProjects() {
  const response = await api.get(
  "/projects"
  );

return response.data;
}

/**

* Création d'un projet
  */
  export async function createProject(data) {
  const response = await api.post(
  "/projects",
  data
  );

return response.data;
}

/**

* Modification d'un projet
  */
  export async function updateProject(id, data) {
  const response = await api.put(
  "/projects/${id}",
  data
  );

return response.data;
}

/**

* Suppression d'un projet
  */
  export async function deleteProject(id) {
  const response = await api.delete(
  "/projects/${id}"
  );

return response.data;
}

/**

* =========================================================
* GESTION DES COMPÉTENCES
* =========================================================
  */

/**

* Liste des compétences
  */
  export async function getAdminSkills() {
  const response = await api.get(
  "/skills"
  );

return response.data;
}

/**

* Création d'une compétence
  */
  export async function createSkill(data) {
  const response = await api.post(
  "/skills",
  data
  );

return response.data;
}

/**

* Modification d'une compétence
  */
  export async function updateSkill(id, data) {
  const response = await api.put(
  "/skills/${id}",
  data
  );

return response.data;
}

/**

* Suppression d'une compétence
  */
  export async function deleteSkill(id) {
  const response = await api.delete(
  "/skills/${id}"
  );

return response.data;
}

/**

* =========================================================
* GESTION DES SERVICES
* =========================================================
  */

/**

* Liste des services
  */
  export async function getAdminServices() {
  const response = await api.get(
  "/services"
  );

return response.data;
}

/**

* Création d'un service
  */
  export async function createService(data) {
  const response = await api.post(
  "/services",
  data
  );

return response.data;
}

/**

* Modification d'un service
  */
  export async function updateService(id, data) {
  const response = await api.put(
  "/services/${id}",
  data
  );

return response.data;
}

/**

* Suppression d'un service
  */
  export async function deleteService(id) {
  const response = await api.delete(
  "/services/${id}"
  );

return response.data;
}

/**

* =========================================================
* PROFIL
* =========================================================
  */

/**

* Modification du profil
  */
  export async function updateProfile(data) {
  const response = await api.put(
  "/profile",
  data
  );

return response.data;
}

/**

* =========================================================
* PARAMÈTRES
* =========================================================
  */

/**

* Liste des paramètres administrateur
  */
  export async function getAdminSettings() {
  const response = await api.get(
  "/settings"
  );

return response.data;
}

/**

* Modification des paramètres
  */
  export async function updateSettings(data) {
  const response = await api.put(
  "/settings",
  data
  );

return response.data;
}

/**

* =========================================================
* MÉDIAS / CLOUDINARY
* =========================================================
  */

/**

* Upload d'un média
* 
* Ne pas définir manuellement Content-Type.
* Axios doit générer automatiquement :
* 
* multipart/form-data; boundary=...
* 
* Le token CSRF est ajouté automatiquement
* par l'intercepteur de src/services/api.js.
  */
  export async function uploadMedia(formData) {
  const response = await api.post(
  "/media/upload",
  formData
  );

return response.data;
}

/**

* Liste des médias
  */
  export async function getAdminMedia() {
  const response = await api.get(
  "/media"
  );

return response.data;
}

/**

* Suppression logique d'un média
  */
  export async function deleteMedia(id) {
  const response = await api.delete(
  "/media/${id}"
  );

return response.data;
}

/**

* =========================================================
* AUDIT / SÉCURITÉ
* =========================================================
  */

/**

* Liste des journaux d'audit
* 
* Backend :
* GET /api/audit
  */
  export async function getAuditLogs(
  params = {}
  ) {
  const response = await api.get(
  "/audit",
  {
  params,
  }
  );

return response.data;
  }
