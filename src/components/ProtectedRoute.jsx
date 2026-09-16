import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  isAuthenticated,
  requiredRole,
  user,
}) {
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (
    requiredRole &&
    user?.role !== requiredRole &&
    user?.role !== "superadmin"
  ) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
