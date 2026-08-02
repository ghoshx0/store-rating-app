import { useEffect, useState } from "react";

import { getDashboard } from "../../api/admin.api";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();

      setStats(response.data.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    }
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          <h3>Total Users</h3>
          <h2>{stats.totalUsers}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          <h3>Total Owners</h3>
          <h2>{stats.totalOwners}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          <h3>Total Stores</h3>
          <h2>{stats.totalStores}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          <h3>Total Ratings</h3>
          <h2>{stats.totalRatings}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;