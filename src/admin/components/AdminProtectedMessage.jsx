import { ShieldAlert } from "lucide-react";

export default function AdminProtectedMessage({
  title = "Accès protégé",
  message = "Cette section est réservée aux administrateurs autorisés.",
}) {
  return (
    <div
      className="admin-protected-message"
      role="alert"
    >
      <div className="admin-protected-message__icon">
        <ShieldAlert size={28} />
      </div>

      <div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
