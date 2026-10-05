import axiosInstance from "./axiosInstance";

export async function getMyFavorites() {
  const response = await axiosInstance.get("/Favorite");
  return response.data;
}

export async function addFavorite(placeId) {
  const response = await axiosInstance.post("/Favorite/" + placeId);
  return response.data;
}

export async function removeFavorite(placeId) {
  await axiosInstance.delete("/Favorite/" + placeId);
}