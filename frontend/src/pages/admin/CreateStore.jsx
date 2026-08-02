import { useEffect, useState } from "react";
import {
  createStore,
  getOwners,
} from "../../api/admin.api";

function CreateStore() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [owners, setOwners] = useState([]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchOwners = async () => {
    try {
      const response = await getOwners();

      setOwners(response.data.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createStore(formData);

      alert("Store created successfully.");

      setFormData({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create store."
      );
    }
  };

  return (
    <div>
      <h1>Create Store</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "450px",
          marginTop: "30px",
        }}
      >
        <input
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Store Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <select
          name="ownerId"
          value={formData.ownerId}
          onChange={handleChange}
          required
        >
          <option value="">Select Owner</option>

          {owners.map((owner) => (
            <option
              key={owner.id}
              value={owner.id}
            >
              {owner.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Create Store
        </button>
      </form>
    </div>
  );
}

export default CreateStore;