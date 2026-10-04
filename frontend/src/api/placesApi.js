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

  console.log("=== GET NEARBY PLACES ===");
  console.log("latitude:", latitude);
  console.log("longitude:", longitude);
  console.log("radiusKm:", radiusKm);
  console.log("categoryId:", categoryId);

  const params = {
    latitude,
    longitude,
    radiusKm,
  };

  if (categoryId) {
    params.categoryId = categoryId;
  }

  console.log("Request params:", params);

  const response = await axiosInstance.get("/places/nearby", {
    params,
  });

  return response.data;
}

export async function createPlace(placeData) {
    const response = await axiosInstance.post("/places", placeData);
    return response.data;
}

export async function updatePlace(id, placeData) {
    const response = await axiosInstance.put("/places/" + id, placeData);
    return response.data;
}

export async function deletePlace(id) {
    await axiosInstance.delete("/places/" + id);
}
