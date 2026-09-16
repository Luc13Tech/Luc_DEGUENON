import { useCallback, useEffect, useState } from "react";

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
  settings: [],
};

export default function usePortfolio() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPortfolio = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.allSettled([
        getProfile(),
        getProjects(),
        getSkills(),
        getServices(),
        getSettings(),
      ]);

      const [profile, projects, skills, services, settings] = results;

      setData({
        profile:
          profile.status === "fulfilled"
            ? profile.value
            : null,

        projects:
          projects.status === "fulfilled"
            ? projects.value
            : [],

        skills:
          skills.status === "fulfilled"
            ? skills.value
            : [],

        services:
          services.status === "fulfilled"
            ? services.value
            : [],

        settings:
          settings.status === "fulfilled"
            ? settings.value
            : [],
      });

      const failedRequests = results.filter(
        (result) => result.status === "rejected"
      );

      if (failedRequests.length > 0) {
        console.warn(
          `⚠️ ${failedRequests.length} requête(s) du portfolio ont échoué.`
        );
      }
    } catch (err) {
      console.error("❌ Impossible de charger le portfolio :", err);

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
