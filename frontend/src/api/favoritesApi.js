import axiosInstance from "./axiosInstance";

export async function getMyFavorites() {
    const response = await axiosInstance.get("/favorites");
    return response.data;
}

export async function addFavorite(placeId) {
    const response = await axiosInstance.post("/favorites/" + placeId);
    return response.data;
}

export async function removeFavorite(placeId) {
    await axiosInstance.delete("/favorites/" + placeId);
}