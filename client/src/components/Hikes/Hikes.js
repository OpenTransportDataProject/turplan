import React, {Component} from 'react';
import axios from "axios";

export class Hikes extends Component {

    constructor(props){
        super(props);

        
        // Binding the functions
        this.getHikes = this.getHikes.bind(this);

    }


    
    async getHikes(bounds){
        
                
                let upperLat = bounds._northEast.lat;
                let upperLng = bounds._northEast.lng;
                let lowerLat = bounds._southWest.lat;
                let lowerLng = bounds._southWest.lng;
        
                let url = "http://198.211.120.107:3001";
        
                //return axios.get('https://api.github.com/users/' + username + '/repos');
                // console.log(axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`))
                
                let result = await axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
                console.log(result)
                //return axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
    }

    render(){


        return(
            <div>

            </div> 
        )
    }

}
