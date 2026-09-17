import api from "../../services/api";

/**
 * ==============================
 * AUTHENTIFICATION ADMIN
 * ==============================
 */

export async function adminLogin(credentials) {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
}

export async function adminLogout() {
  const response = await api.post("/auth/logout");

  return response.data;
}

export async function getCurrentAdmin() {
  const response = await api.get("/auth/me");

  return response.data;
}

/**
 * ==============================
 * GESTION DES PROJETS
 * ==============================
 */

export async function getAdminProjects() {
  const response = await api.get("/projects/admin");

  return response.data;
}

export async function createProject(data) {
  const response = await api.post("/projects", data);

  return response.data;
}

export async function updateProject(id, data) {
  const response = await api.put(
    `/projects/${id}`,
    data
  );

  return response.data;
}

export async function deleteProject(id) {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
}

/**
 * ==============================
 * GESTION DES COMPÉTENCES
 * ==============================
 */

export async function getAdminSkills() {
  const response = await api.get("/skills/admin");

  return response.data;
}

export async function createSkill(data) {
  const response = await api.post("/skills", data);

  return response.data;
}

export async function updateSkill(id, data) {
  const response = await api.put(
    `/skills/${id}`,
    data
  );

  return response.data;
}

export async function deleteSkill(id) {
  const response = await api.delete(
    `/skills/${id}`
  );

  return response.data;
}

/**
 * ==============================
 * GESTION DES SERVICES
 * ==============================
 */

export async function getAdminServices() {
  const response = await api.get("/services/admin");

  return response.data;
}

export async function createService(data) {
  const response = await api.post("/services", data);

  return response.data;
}

export async function updateService(id, data) {
  const response = await api.put(
    `/services/${id}`,
    data
  );

  return response.data;
}

export async function deleteService(id) {
  const response = await api.delete(
    `/services/${id}`
  );

  return response.data;
}

/**
 * ==============================
 * PROFIL
 * ==============================
 */

export async function updateProfile(data) {
  const response = await api.put(
    "/profile",
    data
  );

  return response.data;
}

/**
 * ==============================
 * PARAMÈTRES
 * ==============================
 */

export async function getAdminSettings() {
  const response = await api.get("/settings/admin");

  return response.data;
}

export async function updateSettings(data) {
  const response = await api.put(
    "/settings",
    data
  );

  return response.data;
}

/**
 * ==============================
 * MÉDIAS / CLOUDINARY
 * ==============================
 */

export async function uploadMedia(formData) {
  const response = await api.post(
    "/media/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function getAdminMedia() {
  const response = await api.get("/media");

  return response.data;
}

export async function deleteMedia(id) {
  const response = await api.delete(
    `/media/${id}`
  );

  return response.data;
}

/**
 * ==============================
 * AUDIT / SÉCURITÉ
 * ==============================
 */

export async function getAuditLogs(params = {}) {
  const response = await api.get(
    "/audit-logs",
    {
      params,
    }
  );

  return response.data;
}
