import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function OwnerLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#1f1f1f",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h1>Owner Panel</h1>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <Link
            to="/owner/dashboard"
            style={linkStyle}
          >
            Dashboard
          </Link>

          <Link
            to="/owner/store"
            style={linkStyle}
          >
            My Store
          </Link>

          <Link
            to="/owner/ratings"
            style={linkStyle}
          >
            Ratings
          </Link>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "30px",
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f5f5f5",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default OwnerLayout;