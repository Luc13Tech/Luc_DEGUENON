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

const normalizeArray = (
  value,
  possibleKeys = []
) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (
    value &&
    typeof value === "object"
  ) {
    for (const key of possibleKeys) {
      if (Array.isArray(value[key])) {
        return value[key];
      }
    }
  }

  return [];
};

const normalizeObject = (value) => {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value;
  }

  return null;
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

        const profile =
          profileResult.status ===
          "fulfilled"
            ? normalizeObject(
                profileResult.value
              )
            : null;

        const projects =
          projectsResult.status ===
          "fulfilled"
            ? normalizeArray(
                projectsResult.value,
                [
                  "projects",
                  "items",
                  "data",
                ]
              )
            : [];

        const skills =
          skillsResult.status ===
          "fulfilled"
            ? normalizeArray(
                skillsResult.value,
                [
                  "skills",
                  "items",
                  "data",
                ]
              )
            : [];

        const services =
          servicesResult.status ===
          "fulfilled"
            ? normalizeArray(
                servicesResult.value,
                [
                  "services",
                  "items",
                  "data",
                ]
              )
            : [];

        const settings =
          settingsResult.status ===
          "fulfilled"
            ? normalizeObject(
                settingsResult.value
              )
            : null;

        setData({
          profile,
          projects,
          skills,
          services,
          settings,
        });

        const failedRequests =
          results.filter(
            (result) =>
              result.status ===
              "rejected"
          );

        if (
          failedRequests.length > 0
        ) {
          console.warn(
            `⚠️ ${failedRequests.length} requête(s) du portfolio ont échoué.`
          );
        }
      } catch (err) {
        console.error(
          "❌ Impossible de charger le portfolio :",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
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
