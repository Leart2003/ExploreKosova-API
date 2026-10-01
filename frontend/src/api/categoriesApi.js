export async function createCategory(categoryData) {
	const response = await axiosInstance.post("/categories", categoryData);
	return response.data;
}

export async function deleteCategory(id) {
	await axiosInstance.delete("/categories/" + id);
}