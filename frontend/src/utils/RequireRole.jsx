// utils/RequireRole.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export const RequireRole = ({ roles = [], children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.rol)) {
    // 👇 Mostramos aviso en lugar de redirigir
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h2 style={{ color: "#dc3545", marginBottom: "1rem" }}>🚫 Acceso denegado</h2>
        <p style={{ maxWidth: "500px", fontSize: "1.1rem" }}>
          Necesitás ser <strong>Gestor</strong> o <strong>Administrador</strong> para acceder a esta página.
        </p>
        <a
          href="/"
          style={{
            marginTop: "1.5rem",
            background: "#0d6efd",
            color: "#fff",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "background .2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0b5ed7")}
          onMouseOut={(e) => (e.target.style.background = "#0d6efd")}
        >
          ⬅ Volver al inicio
        </a>
      </div>
    );
  }

  return children;
};
