
import axios from "axios";

export const Difficulity = {
    0: "Lett",
    1: "Medium",
    2: "Krevende"
}

function flipHikeCoordinates(hikes) {

    /* The hike coordinates are formatted in a two dimensional array, where every inner array are an
        array with two elements; lng, lat. The order of these has to be flipped to the correct format
        for leaflet to make polyLines of them.   
    */
    for(let hike of hikes) {
        for (let i = 0; i < hike.geometry.coordinates.length; i++) {
            hike.geometry.coordinates[i] = hike.geometry.coordinates[i].reverse();
        }
    }

}

export async function getHikes(mapBounds) {

    let upperLat = mapBounds._northEast.lat;
    let upperLng = mapBounds._northEast.lng;
    let lowerLat = mapBounds._southWest.lat;
    let lowerLng = mapBounds._southWest.lng;

    // todo: move url into own file
    let url = "http://198.211.120.107:3001";

    let result = await axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
    
    if(result.data.length > 0 ){
        flipHikeCoordinates(result.data);
        return result.data;
    }

    return Promise.resolve(null);
}
