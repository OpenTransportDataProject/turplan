import React, {Component} from 'react';
import axios from "axios";

export class Hikes extends Component {

    constructor(props){
        super(props);

        this.state = {
            polyLineCoordinates: []
        }


        // Binding the functions
        this.getHikes = this.getHikes.bind(this);
        this.flipCoordinates = this.flipCoordinates.bind(this);
        this.setCoordinates = this.setCoordinates.bind(this);

    }

    setCoordinates() {
        
    }

    flipCoordinates(coordinates) {
        for(let i = 0; i < coordinates.length; i++) {
            console.log(coordinates[i]);
        }
    }

    async getHikes(){
        
        let upperLat = this.props.mapBounds.northEastLat;
        let upperLng = this.props.mapBounds.northEastLng;
        let lowerLat = this.props.mapBounds.southWestLat;
        let lowerLng = this.props.mapBounds.southWestLng;

        let url = "http://198.211.120.107:3001";

        //return axios.get('https://api.github.com/users/' + username + '/repos');
        // console.log(axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`))
        
        let result = await axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
        console.log(result)

        this.flipCoordinates(result);

        //return axios.get(`${url}/api/v1/trips?lat_lower=${lowerLat}&lat_upper=${upperLat}&lng_lower=${lowerLng}&lng_upper=${upperLng}`);
    }

    componentWillUpdate() {
        this.getHikes();
    }

    render(){


        return(
            <div>
                
            </div> 
        )
    }

}
