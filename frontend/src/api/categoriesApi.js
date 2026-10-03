import axiosInstance from "./axiosInstance";

export async function getAllCategories() {
  const response = await axiosInstance.get("/Category");
  return response.data;
}

export async function createCategory(categoryData) {
  const response = await axiosInstance.post("/Category", categoryData);
  return response.data;
}

export async function deleteCategory(id) {
  await axiosInstance.delete("/Category/" + id);
}