import { useEffect, useState } from "react";

import {
  getStores,
  submitRating,
  updateRating,
} from "../../api/user.api";

function Stores() {
  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [limit] = useState(5);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState("");

  useEffect(() => {
    fetchStores();
  }, [page, search]);

  const fetchStores = async () => {
    try {
      const response = await getStores({
        page,
        limit,
        search,
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

  const handleSubmitRating = async () => {
    if (!selectedStore) return;

    try {
      const payload = {
        rating: Number(rating),
      };

      if (selectedStore.userRating) {
        await updateRating({
          storeId: selectedStore.id,
          rating: Number(rating),
        });

        alert("Rating updated successfully.");
      } else {
        await submitRating({
          storeId: selectedStore.id,
          rating: Number(rating),
        });

        alert("Rating submitted successfully.");
      }

      setSelectedStore(null);
      setRating("");

      fetchStores();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to save rating."
      );
    }
  };

  return (
    <div>
      <h1>Stores</h1>

      <input
        type="text"
        placeholder="Search by name or address..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{
          width: "350px",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={styles.th}>Store</th>
            <th style={styles.th}>Address</th>
            <th style={styles.th}>Overall Rating</th>
            <th style={styles.th}>My Rating</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td style={styles.td}>{store.name}</td>

              <td style={styles.td}>{store.address}</td>

              <td style={styles.td}>
                {store.averageRating ?? "No Ratings"}
              </td>

              <td style={styles.td}>
                {store.userRating ?? "-"}
              </td>

              <td style={styles.td}>
                <button
                  onClick={() => {
                    setSelectedStore(store);
                    setRating(store.userRating ?? "");
                  }}
                >
                  {store.userRating
                    ? "Update Rating"
                    : "Submit Rating"}
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
          onClick={() =>
            setPage((prev) => prev - 1)
          }
        >
          Previous
        </button>

        <span>
          Page {pagination.page} of{" "}
          {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </button>
      </div>

      {selectedStore && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fff",
            border: "1px solid #ddd",
            maxWidth: "350px",
          }}
        >
          <h3>
            {selectedStore.userRating
              ? "Update Rating"
              : "Submit Rating"}

            {" - "}

            {selectedStore.name}
          </h3>

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
          >
            <option value="">
              Select Rating
            </option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "10px",
            }}
          >
            <button onClick={handleSubmitRating}>
              Submit
            </button>

            <button
              onClick={() => {
                setSelectedStore(null);
                setRating("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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