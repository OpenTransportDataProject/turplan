
import axios from "axios";

function positionToArray(str) {

    // (63.42182,10.43178) -> [ 63.42182, 10.43178 ]
    
    var res = /\((.*),(.*)\)/.exec(str);
    return [ parseFloat(res[1]), parseFloat(res[2]) ];

}

export async function getChargingStations(mapBounds) {

    let upperLat = mapBounds._northEast.lat;
    let upperLng = mapBounds._northEast.lng;
    let lowerLat = mapBounds._southWest.lat;
    let lowerLng = mapBounds._southWest.lng;

    // todo: move url into own file
    let url = "http://198.211.120.107:3001";

    let result = await axios.get(`${url}/api/v1/charging?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
    result = JSON.parse(result.data);
    
    if(result.error != null) return null;
    result = result.chargerstations;
    
    var parsedResults = [];
    for(let chargingStation of result) {
        var item = {
            position: positionToArray(chargingStation.csmd.Position),
            id: chargingStation.csmd.id,
            name: chargingStation.csmd.name,
            address: {
                street: chargingStation.csmd.Street,
                street_nr: chargingStation.csmd.House_number,
            },
            points: chargingStation.csmd.Number_charging_points,
            description: chargingStation.csmd.Description_of_location
        };
        parsedResults.push(item);
    }

    return parsedResults;
}

