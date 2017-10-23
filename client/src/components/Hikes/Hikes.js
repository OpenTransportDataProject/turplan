
import axios from "axios";


var flipHikeCoordinates = function (hikeCoordinates) {

    /* The hike coordinates are formatted in a two dimensional array, where every inner array are an
        array with two elements; lng, lat. The order of these has to be flipped to the correct format
        for leaflet to make polyLines of them.   
    */


    let lengthOfOuterArray = hikeCoordinates.length;

    let flippedHikeCoordinates = hikeCoordinates;


    for (let i = 0; i < lengthOfOuterArray; i++) {
        flippedHikeCoordinates[i] = flippedHikeCoordinates[i].reverse();
    }

    return flippedHikeCoordinates;

}







export async function getHikes(mapBounds) {

    let upperLat = mapBounds.northEastLat;
    let upperLng = mapBounds.northEastLng;
    let lowerLat = mapBounds.southWestLat;
    let lowerLng = mapBounds.southWestLng;

    let url = "http://198.211.120.107:3001";

    let result = await axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
    console.log(result);
    if(result.data.length > 0 ){
        return flipHikeCoordinates(result.data[0].geometry.coordinates);
    } 

    return Promise.resolve(null);
}

