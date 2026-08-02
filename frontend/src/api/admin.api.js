import api from "../services/axios";

export const getDashboard = () => {
  return api.get("/admin/dashboard");
};

export const createUser = (data) => {
  return api.post("/admin/users", data);
};

export const getUsers = (params) => {
  return api.get("/admin/users", {
    params,
  });
};

export const getUserById = (id) => {
  return api.get(`/admin/users/${id}`);
};

export const createStore = (data) => {
  return api.post("/admin/stores", data);
};

export const getStores = (params) => {
  return api.get("/admin/stores", { params });
};

export const getStoreById = (id) => {
  return api.get(`/admin/stores/${id}`);
};

export const getOwners = () => {
  return api.get("/admin/users", {
    params: {
      search: "OWNER",
      page: 1,
      limit: 100,
      sortBy: "name",
      sortOrder: "asc",
    },
  });
};