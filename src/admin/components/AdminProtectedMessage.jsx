import { ShieldAlert } from "lucide-react";

export default function AdminProtectedMessage({
  title = "Accès protégé",
  message =
    "Cette section est réservée aux administrateurs autorisés.",
}) {
  return (
    <div
      className="admin-protected-message"
      role="alert"
      aria-live="polite"
    >
      <div
        className="admin-protected-message__icon"
        aria-hidden="true"
      >
        <ShieldAlert
          size={28}
          strokeWidth={1.8}
        />
      </div>

      <div className="admin-protected-message__content">
        <h2>{title}</h2>

        <p>{message}</p>
      </div>
    </div>
  );
}
