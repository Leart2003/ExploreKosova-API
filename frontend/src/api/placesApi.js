import axiosInstance from "./axiosInstance";

export async function getAllPlaces() {
  const response = await axiosInstance.get("/places");
  return response.data;
}

export async function getPlaceById(id) {
  const response = await axiosInstance.get("/places/" + id);
  return response.data;
}

export async function getNearbyPlaces(latitude, longitude, radiusKm, categoryId) {
  const response = await axiosInstance.get("/places/nearby", {
    params: {
      latitude: latitude,
      longitude: longitude,
      radiusKm: radiusKm,
      categoryId: categoryId,
    },
  });
  return response.data;
}