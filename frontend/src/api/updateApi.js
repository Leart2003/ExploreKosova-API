export async function updateCategory(id, categoryData) {
	const response = await axiosInstance.put("/categories/" + id, categoryData);
	return response.data;
}