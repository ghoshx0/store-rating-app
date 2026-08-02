import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getStore,
  updateStore,
} from "../../api/owner.api";

function UpdateStore() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await getStore();

      setFormData({
        name: response.data.data.name,
        email: response.data.data.email,
        address: response.data.data.address,
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to fetch store."
      );
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateStore(formData);

      alert("Store updated successfully.");

      navigate("/owner/store");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update store."
      );
    }
  };

  return (
    <div>
      <h1>Update Store</h1>

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
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Store
        </button>
      </form>
    </div>
  );
}

export default UpdateStore;