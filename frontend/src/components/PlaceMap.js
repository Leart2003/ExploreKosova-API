import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "../../utils/leafletIconFix";


function PlaceMap({ places, center, centerLng }) {

  return (
    <MapContainer center={[centerLat, centerLng]}
    zoom={12}
       style={{ height: "500px", width: "100%" }}
        >
           <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {places.map(function (place) {
        return (
          <Marker key={place.id} position={[place.latitude, place.longitude]}>
            <Popup>
              <strong>{place.name}</strong>
              <br />
              {place.categoryName}
              <br />
              <Link to={"/places/" + place.id}>View details</Link>
            </Popup>
          </Marker>
        );
      })}
        </MapContainer>
        
  )
}


export default PlaceMap;