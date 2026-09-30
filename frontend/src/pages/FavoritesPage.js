import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyFavorites, removeFavorite } from "../api/favoritesApi";

function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFavorites() {
            setLoading(true);
            const data = await getMyFavorites();
            setFavorites(data);
            setLoading(false);
        }

        fetchFavorites();
    }, []);

    async function handleRemove(placeId) {
        await removeFavorite(placeId);

        const updatedFavorites = favorites.filter(function (fav) {
            return fav.placeId !== placeId;
        });

        setFavorites(updatedFavorites);
    }

    if (loading) {
        return <p className="container mt-4">Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <h1>My Favorites</h1>

            {favorites.length === 0 ? (
                <p>You haven't added any places to your favorites yet.</p>
            ) : (
                <div className="row">
                    {favorites.map(function (favorite) {
                        return (
                            <div key={favorite.id} className="col-md-4 mb-3">
                                <div className="card">
                                    {favorite.coverImageUrl && (
                                        <img
                                            src={favorite.coverImageUrl}
                                            className="card-img-top"
                                            alt={favorite.placeName}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{favorite.placeName}</h5>

                                        <Link to={"/places/" + favorite.placeId} className="btn btn-primary btn-sm me-2">
                                            View Details
                                        </Link>

                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => handleRemove(favorite.placeId)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default FavoritesPage;