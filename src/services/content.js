import api from "./api";

/**
 * Récupère le profil public.
 */
export async function getProfile() {
  const response = await api.get("/profile");
  return response.data;
}

/**
 * Récupère les projets publics.
 */
export async function getProjects() {
  const response = await api.get("/projects");
  return response.data;
}

/**
 * Récupère les compétences publiques.
 */
export async function getSkills() {
  const response = await api.get("/skills");
  return response.data;
}

/**
 * Récupère les services publics.
 */
export async function getServices() {
  const response = await api.get("/services");
  return response.data;
}

/**
 * Récupère les paramètres publics.
 */
export async function getSettings() {
  const response = await api.get("/settings");
  return response.data;
}

/**
 * Vérifie que le backend est disponible.
 */
export async function getHealth() {
  const response = await api.get("/health");
  return response.data;
}
