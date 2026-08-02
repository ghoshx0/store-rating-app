import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserById } from "../../api/admin.api";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);

      setUser(response.data.data);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch user."
      );
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>User Details</h1>

      <table
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td>{user.name}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>{user.email}</td>
          </tr>

          <tr>
            <td><strong>Address</strong></td>
            <td>{user.address}</td>
          </tr>

          <tr>
            <td><strong>Role</strong></td>
            <td>{user.role}</td>
          </tr>

          <tr>
            <td><strong>Created At</strong></td>
            <td>{new Date(user.createdAt).toLocaleString()}</td>
          </tr>

          {user.store && (
            <>
              <tr>
                <td><strong>Store</strong></td>
                <td>{user.store.name}</td>
              </tr>

              <tr>
                <td><strong>Store Email</strong></td>
                <td>{user.store.email}</td>
              </tr>

              <tr>
                <td><strong>Average Rating</strong></td>
                <td>{user.store.averageRating ?? "No ratings"}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;