
import axios from "axios";
import {env} from '../env';

export async function getParking(mapBounds) {

    let upperLat = mapBounds._northEast.lat;
    let upperLng = mapBounds._northEast.lng;
    let lowerLat = mapBounds._southWest.lat;
    let lowerLng = mapBounds._southWest.lng;

    let url = env.backendURL;
    let request = `${url}/api/v1/parking?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`;
    let result = await axios.get(request);
    
    if(result.data.length > 0 ){
        return result.data;
    }

    return Promise.resolve(null);
}

