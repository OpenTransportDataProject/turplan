import Leaflet from "leaflet";

export const parkingIcon = Leaflet.icon({
    iconUrl: "images/marker-park.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [-3, -76]
});

export const chargingIcon = Leaflet.icon({
    iconUrl: "images/marker-charge.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [-3, -76]
});

export const newMarkerIcon = Leaflet.icon({
    iconUrl: "images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [-3, -76]
});