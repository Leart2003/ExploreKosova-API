import { useState, useEffect } from "react";
import { getAllPlaces, createPlace, deletePlace } from "../api/placesApi";
import { getAllCategories, createCategory, deleteCategory } from "../api/categoriesApi";

function AdminDashboardPage() {
    const [places, setPlaces] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        const placesData = await getAllPlaces();
        const categoriesData = await getAllCategories();
        setPlaces(placesData);
        setCategories(categoriesData);
        setLoading(false);
    }

    async function handleCreatePlace(e) {
        e.preventDefault();

        try {
            await createPlace({
                name: name,
                description: description,
                latitude: Number(latitude),
                longitude: Number(longitude),
                address: address,
                city: city,
                categoryId: Number(categoryId),
            });

            setMessage("Place created successfully!");
            setName("");
            setDescription("");
            setLatitude("");
            setLongitude("");
            setAddress("");
            setCity("");
            setCategoryId("");

            fetchData();
        } catch (err) {
            setMessage("Could not create place.");
        }
    }

    async function handleDeletePlace(id) {
        await deletePlace(id);
        fetchData();
    }

    async function handleCreateCategory(e) {
        e.preventDefault();

        try {
            await createCategory({ name: newCategoryName });
            setNewCategoryName("");
            fetchData();
        } catch (err) {
            setMessage("Could not create category.");
        }
    }

    async function handleDeleteCategory(id) {
        await deleteCategory(id);
        fetchData();
    }

    if (loading) {
        return <p className="container mt-4">Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <h1>Admin Dashboard</h1>

            {message && <div className="alert alert-info">{message}</div>}

            <div className="row">
                {/* --- Create Place Form --- */}
                <div className="col-md-6">
                    <h3>Add New Place</h3>
                    <form onSubmit={handleCreatePlace}>
                        <div className="mb-2">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Latitude</label>
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Longitude</label>
                            <input
                                type="number"
                                step="any"
                                className="form-control"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(function (category) {
                                    return (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create Place
                        </button>
                    </form>
                </div>

                {/* --- Create Category Form --- */}
                <div className="col-md-6">
                    <h3>Add New Category</h3>
                    <form onSubmit={handleCreateCategory}>
                        <div className="mb-2">
                            <label className="form-label">Category Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create Category
                        </button>
                    </form>

                    <h4 className="mt-4">Existing Categories</h4>
                    <ul className="list-group">
                        {categories.map(function (category) {
                            return (
                                <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {category.name}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <hr className="my-4" />

            {/* --- Places List --- */}
            <h3>All Places</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>City</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {places.map(function (place) {
                        return (
                            <tr key={place.id}>
                                <td>{place.name}</td>
                                <td>{place.categoryName}</td>
                                <td>{place.city}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeletePlace(place.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboardPage;