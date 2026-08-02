import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getStore } from "../../api/owner.api";

function Store() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await getStore();

      setStore(response.data.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch store."
      );
    }
  };

  if (!store) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>My Store</h1>

      <table
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
          width: "500px",
        }}
      >
        <tbody>
          <tr>
            <td style={styles.label}>Name</td>
            <td style={styles.value}>{store.name}</td>
          </tr>

          <tr>
            <td style={styles.label}>Email</td>
            <td style={styles.value}>{store.email}</td>
          </tr>

          <tr>
            <td style={styles.label}>Address</td>
            <td style={styles.value}>{store.address}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/owner/store/edit">
        <button
          style={{
            marginTop: "20px",
          }}
        >
          Update Store
        </button>
      </Link>
    </div>
  );
}

const styles = {
  label: {
    fontWeight: "bold",
    padding: "10px",
    width: "180px",
  },

  value: {
    padding: "10px",
  },
};

export default Store;