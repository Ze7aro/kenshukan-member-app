import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.13:3001/api/data",
  withCredentials: true, // Importante para mantener la sesión
});

const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error en login:", error);
    return null;
  }
};

const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error en logout:", error);
    return null;
  }
};

const getData = async () => {
  try {
    const response = await api.get("/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error en getData:", error);
    return null;
  }
};

const createData = async (data) => {
  try {
    const response = await api.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Error en createData:", error);
    return null;
  }
};

const updateData = async (id, data) => {
  try {
    const response = await api.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error en updateData:", error);
    return null;
  }
};

export default { login, logout, getData, createData, updateData };
