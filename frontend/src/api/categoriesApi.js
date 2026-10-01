import axiosInstance from "./axiosInstance";

export async function getAllCategories() {
	const response = await axiosInstance.get("/categories");
	return response.data;
}

export async function createCategory(categoryData) {
	const response = await axiosInstance.post("/categories", categoryData);
	return response.data;
}

export async function deleteCategory(id) {
	await axiosInstance.delete("/categories/" + id);
}