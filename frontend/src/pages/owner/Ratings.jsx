import { useEffect, useState } from "react";

import { getRatings } from "../../api/owner.api";

function Ratings() {
  const [ratings, setRatings] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchRatings();
  }, [page]);

  const fetchRatings = async () => {
    try {
      const response = await getRatings({
        page,
        limit,
      });

      setRatings(response.data.data.ratings);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch ratings."
      );
    }
  };

  return (
    <div>
      <h1>Ratings</h1>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={styles.th}>User</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Rating</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((rating) => (
            <tr key={rating.id}>
              <td style={styles.td}>
                {rating.user.name}
              </td>

              <td style={styles.td}>
                {rating.user.email}
              </td>

              <td style={styles.td}>
                ⭐ {rating.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
};

export default Ratings;