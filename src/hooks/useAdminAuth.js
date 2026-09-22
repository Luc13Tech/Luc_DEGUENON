import {
useCallback,
useEffect,
useState,
} from "react";

import {
getCurrentAdmin,
adminLogout,
} from "../admin/services/adminApi";

export default function useAdminAuth() {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

/**

* =========================================================
* VÉRIFICATION DE LA SESSION
* =========================================================
* 
* Le backend retourne :
* 
* {
* success: true,
* admin: {...}
* }
  */

const checkAuth = useCallback(async () => {
setLoading(true);

try {
  const data =
    await getCurrentAdmin();

  if (
    !data?.success ||
    !data?.admin
  ) {
    setUser(null);
    return null;
  }

  setUser(data.admin);

  return data.admin;
} catch (error) {
  setUser(null);

  return null;
} finally {
  setLoading(false);
}

}, []);

/**

* =========================================================
* VÉRIFICATION AUTOMATIQUE AU CHARGEMENT
* =========================================================
  */

useEffect(() => {
checkAuth();
}, [checkAuth]);

/**

* =========================================================
* CONNEXION
* =========================================================
  */

const login = useCallback(
async (data) => {
if (
!data?.success ||
!data?.admin
) {
setUser(null);
return null;
}

  setUser(data.admin);

  return data.admin;
},
[]

);

/**

* =========================================================
* DÉCONNEXION
* =========================================================
  */

const logout = useCallback(
async () => {
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
},
[]
);

return {
user,
loading,
isAuthenticated: Boolean(user),
login,
logout,
checkAuth,
};
}
