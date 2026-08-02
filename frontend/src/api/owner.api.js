import api from "../services/axios";

export const getDashboard = () => {
  return api.get("/owner/dashboard");
};

export const getMyStore = () => {
  return api.get("/owner/store");
};

export const updateMyStore = (data) => {
  return api.put("/owner/store", data);
};

export const getRatings = (params) => {
  return api.get("/owner/ratings", { params });
};

export const getStore = () => {
  return api.get("/owner/store");
};

export const updateStore = (data) => {
  return api.put("/owner/store", data);
};