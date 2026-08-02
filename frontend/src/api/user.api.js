import api from "../services/axios";

export const updatePassword = (data) => {
  return api.put("/user/password", data);
};

export const getStores = (params) => {
  return api.get("/user/stores", { params });
};

export const submitRating = (data) => {
  return api.post("/user/ratings", data);
};

export const updateRating = (data) => {
  return api.put("/user/ratings", data);
};