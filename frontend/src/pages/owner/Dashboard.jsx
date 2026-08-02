import { useEffect, useState } from "react";
import { getDashboard } from "../../api/owner.api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    }
  };

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Owner Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Store Name</h3>
          <h2>{dashboard.store.name}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Average Rating</h3>
          <h2>{dashboard.statistics.averageRating}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Ratings</h3>
          <h2>{dashboard.statistics.totalRatings}</h2>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "220px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default Dashboard;