import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>User Dashboard</h1>

      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          maxWidth: "600px",
        }}
      >
        <h2>Welcome, {user?.name}</h2>

        <p style={{ marginTop: "15px" }}>
          You can browse stores, submit ratings,
          update your ratings, and change your
          password using the navigation menu.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;