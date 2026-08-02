import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getStoreById } from "../../api/admin.api";

function StoreDetails() {
  const { id } = useParams();

  const [store, setStore] = useState(null);

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

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await getStoreById(id);

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
      <h1>Store Details</h1>

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

						<tr>
							<td style={styles.label}>Average Rating</td>
							<td style={styles.value}>
									{store.averageRating ?? "No Ratings"}
							</td>
						</tr>

						{store.owner && (
						<>
								<tr>
									<td style={styles.label}>Owner</td>
									<td style={styles.value}>{store.owner.name}</td>
								</tr>

								<tr>
									<td style={styles.label}>Owner Email</td>
									<td style={styles.value}>{store.owner.email}</td>
								</tr>
						</>
						)}
				</tbody>
			</table>
    </div>
  );
}

export default StoreDetails;