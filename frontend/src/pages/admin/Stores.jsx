import { useEffect, useState } from "react";

import { getStores } from "../../api/admin.api";

import { useNavigate } from "react-router-dom";

function Stores() {
  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    fetchStores();
  }, [page, search, sortBy, sortOrder]);

  const fetchStores = async () => {
    try {
      const response = await getStores({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      });

      setStores(response.data.data.stores);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch stores."
      );
    }
  };

  return (
    <div>
      <h1>Stores</h1>

      <input
        type="text"
        placeholder="Search stores..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          padding: "10px",
          width: "350px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="address">Address</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td style={styles.td}>{store.name}</td>
              <td style={styles.td}>{store.email}</td>
              <td style={styles.td}>{store.address}</td>
              <td style={styles.td}>
                {store.averageRating !== null
                  ? store.averageRating
                  : "No Ratings"}
              </td>
              <td style={styles.td}>
                <button
                  onClick={() => navigate(`/admin/stores/${store.id}`)}
                >
                  View
                </button>
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

export default Stores;