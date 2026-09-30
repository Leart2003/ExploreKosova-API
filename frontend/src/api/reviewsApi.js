import axiosInstance from "./axiosInstance";

export async function getReviewsByPlaceId(placeId) {
    const response = await axiosInstance.get("/reviews/place/" + placeId);
    return response.data;
}

export async function createReview(reviewData) {
    const response = await axiosInstance.post("/reviews", reviewData);
    return response.data;
}