import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "250px",
          background: "#222",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <Link to="/admin/dashboard">Dashboard</Link>

          <Link to="/admin/users">Users</Link>

          <Link to="/admin/stores">Stores</Link>

          <Link to="/admin/create-store">Create Store</Link>

          <button onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;