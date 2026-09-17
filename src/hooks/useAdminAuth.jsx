import { useCallback, useEffect, useState } from "react";

import {
  getCurrentAdmin,
  adminLogout,
} from "../admin/services/adminApi";

export default function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getCurrentAdmin();

      const currentUser =
        data?.user ||
        data?.admin ||
        data;

      setUser(currentUser || null);

      return currentUser || null;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (data) => {
    const currentUser =
      data?.user ||
      data?.admin ||
      data;

    setUser(currentUser || null);

    return currentUser || null;
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.warn(
        "Erreur lors de la déconnexion :",
        error
      );
    } finally {
      setUser(null);
    }
  }, []);

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    checkAuth,
  };
}
