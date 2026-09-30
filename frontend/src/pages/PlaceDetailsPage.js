import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlaceById } from "../api/placesApi";
import { getReviewsByPlaceId, createReview } from "../api/reviewsApi";
import { addFavorite } from "../api/favoritesApi";
import { useAuth } from "../context/AuthContext";

function PlaceDetailsPage() {
    const { id } = useParams();
    const auth = useAuth();

    const [place, setPlace] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const placeData = await getPlaceById(id);
            const reviewsData = await getReviewsByPlaceId(id);
            setPlace(placeData);
            setReviews(reviewsData);
            setLoading(false);
        }

        fetchData();
    }, [id]);

    async function handleAddFavorite() {
        try {
            await addFavorite(id);
            setMessage("Added to favorites!");
        } catch (err) {
            setMessage("Could not add to favorites.");
        }
    }

    async function handleReviewSubmit(e) {
        e.preventDefault();

        try {
            const newReview = await createReview({
                placeId: Number(id),
                rating: Number(rating),
                comment: comment,
            });

            setReviews([newReview, ...reviews]);
            setComment("");
            setRating(5);
        } catch (err) {
            setMessage("Could not submit review.");
        }
    }

    if (loading) {
        return <p className="container mt-4">Loading...</p>;
    }

    if (!place) {
        return <p className="container mt-4">Place not found.</p>;
    }

    return (
        <div className="container mt-4">
            <h1>{place.name}</h1>
            <p className="text-muted">{place.categoryName}</p>

            <p>{place.description}</p>
            <p>
                <strong>Address:</strong> {place.address}
            </p>

            {place.averageRating > 0 && (
                <p>
                    <strong>Rating:</strong> {place.averageRating} / 5
                </p>
            )}

            {message && <div className="alert alert-info">{message}</div>}

            {auth.isAuthenticated && (
                <button className="btn btn-outline-primary mb-4" onClick={handleAddFavorite}>
                    Add to Favorites
                </button>
            )}

            <hr />

            <h3>Reviews</h3>

            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                reviews.map(function (review) {
                    return (
                        <div key={review.id} className="border-bottom py-2">
                            <strong>{review.userFullName}</strong> - {review.rating}/5
                            <p>{review.comment}</p>
                        </div>
                    );
                })
            )}

            {auth.isAuthenticated && (
                <div className="mt-4">
                    <h4>Leave a Review</h4>
                    <form onSubmit={handleReviewSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Rating (1-5)</label>
                            <select
                                className="form-select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Comment</label>
                            <textarea
                                className="form-control"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit Review
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default PlaceDetailsPage;