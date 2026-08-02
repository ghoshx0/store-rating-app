import { useState } from "react";
import { updatePassword } from "../../api/user.api";

function UpdatePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePassword(formData);

      alert("Password updated successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update password."
      );
    }
  };

  return (
    <div>
      <h1>Update Password</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          maxWidth: "400px",
          marginTop: "30px",
        }}
      >
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;