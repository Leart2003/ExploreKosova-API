import axiosInstance from "./axiosInstance";

export async function register(registerData) {
  const response = await axiosInstance.post("/auth/register", registerData);
  return response.data;
}

export async function login(loginData) {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
}

export async function changePassword(passwordData) {
  const response = await axiosInstance.post("/auth/change-password", passwordData);
  return response.data;
}