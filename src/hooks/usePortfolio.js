import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getProfile,
  getProjects,
  getSkills,
  getServices,
  getSettings,
} from "../services/content";

const initialData = {
  profile: null,
  projects: [],
  skills: [],
  services: [],
  settings: null,
};

/*
 * Récupère un tableau même lorsque l'API
 * renvoie plusieurs niveaux de données.
 *
 * Exemples acceptés :
 *
 * [...]
 *
 * {
 *   projects: [...]
 * }
 *
 * {
 *   data: {
 *     projects: [...]
 *   }
 *
 * }
 *
 * {
 *   success: true,
 *   data: [...]
 * }
 */
const normalizeArray = (value, possibleKeys = []) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  // Recherche directe
  for (const key of possibleKeys) {
    if (Array.isArray(value[key])) {
      return value[key];
    }
  }

  // Recherche dans "data"
  if (
    value.data &&
    typeof value.data === "object"
  ) {
    if (Array.isArray(value.data)) {
      return value.data;
    }

    for (const key of possibleKeys) {
      if (Array.isArray(value.data[key])) {
        return value.data[key];
      }
    }
  }

  // Recherche dans "result"
  if (
    value.result &&
    typeof value.result === "object"
  ) {
    if (Array.isArray(value.result)) {
      return value.result;
    }

    for (const key of possibleKeys) {
      if (Array.isArray(value.result[key])) {
        return value.result[key];
      }
    }
  }

  return [];
};

/*
 * Normalise un objet provenant de l'API.
 */
const normalizeObject = (value) => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    // Cas :
    // { data: { ... } }
    if (
      value.data &&
      typeof value.data === "object" &&
      !Array.isArray(value.data)
    ) {
      return value.data;
    }

    // Cas :
    // { result: { ... } }
    if (
      value.result &&
      typeof value.result === "object" &&
      !Array.isArray(value.result)
    ) {
      return value.result;
    }

    return value;
  }

  return null;
};

/*
 * Normalise les images des projets.
 *
 * Le backend peut utiliser différents noms
 * pour l'image principale.
 */
const normalizeProjectImages = (projects) => {
  if (!Array.isArray(projects)) {
    return [];
  }

  return projects.map((project) => {
    if (!project || typeof project !== "object") {
      return project;
    }

    const image =
      project.image ||
      project.imageUrl ||
      project.imageURL ||
      project.coverImage ||
      project.cover ||
      project.thumbnail ||
      project.featuredImage ||
      project.photo ||
      null;

    const images = Array.isArray(project.images)
      ? project.images
      : [];

    return {
      ...project,

      // Image principale normalisée
      image: image,

      // Galerie normalisée
      images: images,
    };
  });
};

export default function usePortfolio() {
  const [data, setData] =
    useState(initialData);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const loadPortfolio =
    useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
        const results =
          await Promise.allSettled([
            getProfile(),
            getProjects(),
            getSkills(),
            getServices(),
            getSettings(),
          ]);

        const [
          profileResult,
          projectsResult,
          skillsResult,
          servicesResult,
          settingsResult,
        ] = results;

        /*
         * PROFILE
         */
        const profile =
          profileResult.status === "fulfilled"
            ? normalizeObject(
                profileResult.value
              )
            : null;

        /*
         * PROJECTS
         */
        let projects =
          projectsResult.status === "fulfilled"
            ? normalizeArray(
                projectsResult.value,
                [
                  "projects",
                  "items",
                  "data",
                  "results",
                ]
              )
            : [];

        projects =
          normalizeProjectImages(projects);

        /*
         * SKILLS
         */
        const skills =
          skillsResult.status === "fulfilled"
            ? normalizeArray(
                skillsResult.value,
                [
                  "skills",
                  "items",
                  "data",
                  "results",
                ]
              )
            : [];

        /*
         * SERVICES
         */
        const services =
          servicesResult.status === "fulfilled"
            ? normalizeArray(
                servicesResult.value,
                [
                  "services",
                  "items",
                  "data",
                  "results",
                ]
              )
            : [];

        /*
         * SETTINGS
         */
        const settings =
          settingsResult.status === "fulfilled"
            ? normalizeObject(
                settingsResult.value
              )
            : null;

        /*
         * Sauvegarde des données
         */
        setData({
          profile,
          projects,
          skills,
          services,
          settings,
        });

        /*
         * Diagnostic détaillé
         */
        const failedRequests =
          results.filter(
            (result) =>
              result.status === "rejected"
          );

        if (
          failedRequests.length > 0
        ) {
          console.warn(
            `⚠️ ${failedRequests.length} requête(s) du portfolio ont échoué.`
          );

          failedRequests.forEach(
            (result, index) => {
              console.error(
                `❌ Requête portfolio #${index + 1}:`,
                result.reason
              );
            }
          );
        }

        /*
         * Diagnostic utile dans la console
         */
        console.log(
          "✅ Portfolio chargé :",
          {
            profile: !!profile,
            projects: projects.length,
            skills: skills.length,
            services: services.length,
            settings: !!settings,
          }
        );

        /*
         * Vérification des projets/images
         */
        if (projects.length > 0) {
          console.log(
            "🖼️ Projets récupérés :",
            projects.map((project) => ({
              title:
                project.title ||
                project.name ||
                project.slug ||
                "Projet sans titre",

              image:
                project.image ||
                project.imageUrl ||
                null,

              images:
                Array.isArray(project.images)
                  ? project.images.length
                  : 0,
            }))
          );
        }
      } catch (err) {
        console.error(
          "❌ Impossible de charger le portfolio :",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Impossible de charger les données du portfolio."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  return {
    ...data,
    loading,
    error,
    reload: loadPortfolio,
  };
}
