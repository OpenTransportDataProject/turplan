
import axios from "axios";
import {env} from '../env';

export async function getChargingStations(mapBounds) {

    let upperLat = mapBounds._northEast.lat;
    let upperLng = mapBounds._northEast.lng;
    let lowerLat = mapBounds._southWest.lat;
    let lowerLng = mapBounds._southWest.lng;

    // todo: move url into own file
    let url = env.backendURL;
    let req = `${url}/api/v1/charging?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`;

    let result = await axios.get(req);
    
    if(result.error != null) return null;

    if(result.data.length > 0 ){
        return result.data;
    }

    return Promise.resolve(null);
    
}

