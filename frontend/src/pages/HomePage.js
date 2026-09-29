import { useState, useEffect } from "react";
import { getNearbyPlaces } from "../api/placesApi";
import { getAllCategories } from "../api/categoriesApi";
import useGeolocation from "../hooks/useGeolocation";
import PlaceMap from "../components/places/PlaceMap";

const PRISHTINA_LAT = 42.6629;
const PRISHTINA_LNG = 21.1655;

function HomePage() {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [loading, setLoading] = useState(true);

  const geo = useGeolocation();


  const latitude = geo.location ? geo.location.latitude : PRISHTINA_LAT;
  const longitude = geo.location ? geo.location.longitude : PRISHTINA_LNG;

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      const categoryFilter = selectedCategoryId === "" ? null : selectedCategoryId;
      const data = await getNearbyPlaces(latitude, longitude, 50, categoryFilter);
      setPlaces(data);
      setLoading(false);
    }

    fetchPlaces();
  }, [latitude, longitude, selectedCategoryId]);

  function handleCategoryChange(e) {
    setSelectedCategoryId(e.target.value);
  }

  return (
    <div className="container mt-4">
      <h1>Explore Kosova</h1>

      <div className="mb-3">
        <label className="form-label">Filter by category</label>
        <select className="form-select" value={selectedCategoryId} onChange={handleCategoryChange}>
          <option value="">All categories</option>
          {categories.map(function (category) {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      {loading ? (
        <p>Loading places...</p>
      ) : (
        <PlaceMap places={places} centerLat={latitude} centerLng={longitude} />
      )}
    </div>
  );
}

export default HomePage;