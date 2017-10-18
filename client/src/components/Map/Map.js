import React, { Component } from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Popup, Marker, Polyline } from "react-leaflet";
import Menubar from "../Menubar/Menubar.js";
import { Searchbar } from "../Searchbar/Searchbar";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
display: flex;
flex: 1;
margin: 1em;
`;

const Searchcontainer = styled.div`
flex: 1;
justify-content: center;
align-items: center;
`;

const MapContainer = styled.div`
flex: 4;
justify-content: center;
align-items: center;
`;


//const coordinates = [[63.417993, 10.405758], [66.423132, 10.405758]];

const coordinates = [
    [
        63.1979270275093,
        10.3030374768782
    ],
    [
        63.1997846592407,
        10.3032091382617
    ],
    [
        63.2013325946106,
        10.3032091382617
    ],
    [
        63.2029578376467,
        10.3045824293297
    ],
    [
        63.2031126179375,
        10.3080156569997
    ],
    [
        63.2064401939566,
        10.3129938371212
    ],
    [
        63.2067497164583,
        10.3164270647912
    ],
    [
        63.2079103963503,
        10.3205469379952
    ],
    [
        63.2091484035809,
        10.3244951498165
    ],
    [
        63.210773207678,
        10.329130007171
    ],
    [
        63.2164206262746,
        10.3359964625110
    ],
    [
        63.2186638153286,
        10.339429690181
    ],
    [
        63.222144281475,
        10.341489626783
    ],
    [
        63.2267842513910,
        10.3459528227539
    ],
    [
        63.2302637401667,
        10.3493860504239
    ],
    [
        63.2342066544859,
        10.3524759553269
    ],
    [
        63.2379171413132,
        10.3555658602299
    ],
    [
        63.242786432278,
        10.3591707492834
    ],
    [
        63.2457230681575,
        10.3629472997204
    ],
    [
        63.247345817805,
        10.3643205907884
    ],
    [
        63.2490457434626,
        10.3670671729243
    ],
    [
        63.2522907782543,
        10.3718736916623
    ],
    [
        63.2539904128626,
        10.3706720619778
    ],
    [
        63.2556126980303,
        10.3680971412253
    ],
    [
        63.2570031556275,
        10.3624323155699
    ],
    [
        63.2580073333577,
        10.3595140720504
    ],
    [
        63.2587797539982,
        10.3555658602299
    ],
    [
        63.2611741266482,
        10.3550508760794
    ],
    [
        63.2624098541839,
        10.3567674899144
    ],
    [
        63.2641861198351,
        10.3581407809824
    ],
    [
        63.2665028237985,
        10.3602007175844
    ],
    [
        63.2688193417981,
        10.3620889928029
    ],
    [
        63.2707496314167,
        10.3631189611039
    ],
    [
        63.2739922272877,
        10.3665521887738
    ],
    [
        63.2763081440804,
        10.3706720619778
    ],
    [
        63.2804763258049,
        10.3737619668808
    ],
    [
        63.2827145451786,
        10.3758219034828
    ],
    [
        63.284335216291,
        10.3782251628518
    ],
    [
        63.2873447924327,
        10.3821733746732
    ],
    [
        63.2891966831621,
        10.3859499251102
    ],
    [
        63.3031560986491,
        10.3948832089261
    ],
    [
        63.3079372828465,
        10.4003763731989
    ],
    [
        63.3111756987669,
        10.4017496642669
    ],
    [
        63.3145679344841,
        10.4068995057719
    ],
    [
        63.3179597706701,
        10.4041529236359
    ]
]


/* This function is connected to the button in the menu, and will use the
overpass-api to find parking lots within open street map.
Someone has been nice enough to make a node-edition of the osm data we can use
directly, called Overpass.
We use amenity=parking to retreive parking lots from the api. Read more in the
query-overpass guide. This doesn't find all parking lots, but a lot. We should
look into ways to expand the query and find more parking lots.
Also, use "yarn add query-overpass" in the client folder to ensure access to api.
Source for fixing all the bugs in the code related to marker displays:
https://jsfiddle.net/q2v7t59h/413/
*/

Leaflet.Icon.Default.imagePath =
    "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";

// This component HAD to be a component, not PureComponent, to be able to display markers.
// DO NOT change it. Was big problem, as it says nothing changes when it in fact does.
class ReactLeafletMap extends Component {
    constructor() {
        //setting up initial starting state of the map.
        super();
        this.state = {
            // center coordinates for initial map <- change these for wanted location
            lat: 63.417993,
            lng: 10.405758,
            //lat: 63.19792702,
            //lng: 10.30303747,
            zoom: 15,
            //The markers list will be filled with positions for all parking lots
            markers: [],
            startmarker: [],
            bounds: []
        };

        // Makes this availiable. Fixes most of the react issues related to getting correct things
        this.findParkingLots = this.findParkingLots.bind(this);
        this.findChargingStations = this.findChargingStations.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.logBounds = this.logBounds.bind(this);
        this.getHikes = this.getHikes.bind(this);


    }
    addMarker = e => {
        let { startmarker } = this.state;
        startmarker = [];
        startmarker.push(e.latlng);
        this.setState({ startmarker });
    };
    
    findParkingLots() {
        // http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example <-- read here for info abt queries
        
        var bounds = this.refs.map.leafletElement.getBounds();
        // Include the overpass library to be able to use it. It's a bit slow, but works
        const overpass = require("query-overpass");
        // Creates the query which is sent to overpass-api using their language of preference
        const query =
        "[out:json];node(" +
        bounds._southWest.lat +
        "," +
            bounds._southWest.lng +
            "," +
            bounds._northEast.lat +
            "," +
            bounds._northEast.lng +
            ")[amenity=parking];out;way(" +
            bounds._southWest.lat +
            "," +
            bounds._southWest.lng +
            "," +
            bounds._northEast.lat +
            "," +
            bounds._northEast.lng +
            ")[amenity=parking];out center;relation(" +
            bounds._southWest.lat +
            "," +
            bounds._southWest.lng +
            "," +
            bounds._northEast.lat +
            "," +
            bounds._northEast.lng +
            ")[amenity=parking];out center;";
            
            
        // Performs the query:
        overpass(query, (error, data) => {
            // Here is what gets returned from the api call to overpass based on bounds.
            var parkingLots = data.features;
            // Obtaining coordinates for each parking lot entry
            let { markers } = this.state;
            markers = [];
            // Obtain all positions and send them to the state which will be used to make markers
            for (var i = 0; i < parkingLots.length; i++) {
                var parkingLot = parkingLots[i];
                var lat = parkingLot.geometry.coordinates[1];
                var lng = parkingLot.geometry.coordinates[0];
                markers.push([lat, lng]);
            }
            // Updates the state with new markers.
            this.setState({ markers });
        });
    }
    
    findChargingStations() {
        // Finding the bounding box of the current window to use in api call
        var bounds = this.refs.map.leafletElement.getBounds();
        console.log(bounds);
        // Include the overpass library to be able to use it. It's a bit slow, but works
        const overpass = require("query-overpass");
        // Creates the query which is sent to overpass-api using their language of preference
        const query =
        "[out:json];node(" +
            bounds._southWest.lat +
            "," +
            bounds._southWest.lng +
            "," +
            bounds._northEast.lat +
            "," +
            bounds._northEast.lng +
            ")[amenity=charging_station];out;way(" +
            bounds._southWest.lat +
            "," +
            bounds._southWest.lng +
            "," +
            bounds._northEast.lat +
            "," +
            bounds._northEast.lng +
            ")[amenity=charging_station];out center;relation(" +
            bounds._southWest.lat +
            "," +
            bounds._southWest.lng +
            "," +
            bounds._northEast.lat +
            "," +
            bounds._northEast.lng +
            ")[amenity=charging_station];out center;";

            
            // Performs the query:
        overpass(query, (error, data) => {
            // Here is what gets returned from the api call to overpass based on bounds.
            var charging_stations = data.features;
            console.log(error);
            // Obtaining coordinates for each parking lot entry
            let { markers } = this.state;
            markers = [];
            // Obtain all positions and send them to the state which will be used to make markers
            for (var i = 0; i < charging_stations.length; i++) {
                var chargingStation = charging_stations[i];
                var lat = chargingStation.geometry.coordinates[1];
                var lng = chargingStation.geometry.coordinates[0];
                markers.push([lat, lng]);
            }
            // Updates the state with new markers.
            this.setState({ markers });
        });
        
        
        
    }

    handleMap(lat, lng) {
        this.setState({
            lat,
            lng
        })
    }
    

    logBounds(){
        console.log(this.refs.map.leafletElement.getBounds());
        this.getHikes(this.refs.map.leafletElement.getBounds());
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

    

    printLatLng() {
        console.log("Map - Lat: " + this.state.lat + " Lng: " + this.state.lng);
    }

    /*  MAPS TO LOOK AT
      url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
    */
    render() {
        return (
            <Container>
                {

                    <Searchcontainer>
                        <Searchbar handleMap={(lat, lng) => this.handleMap(lat, lng)} />
                    </Searchcontainer>

                }
                <MapContainer>
                    <Map
                        center={[this.state.lat, this.state.lng]}
                        //center={[this.props.lat, this.props.lng]}
                        zoom={this.state.zoom}
                        ref="map"
                        onClick={this.addMarker}
                        style={{ margin: 'auto', width: '90%', height: '90%', position: 'relative' }}
                        onViewportChanged={this.logBounds}

                    >
                        <TileLayer
                            url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
                            attribution="&copy; <a href=&quot;http://www.statkart.no&quot;>Startkart.no</a>"
                        />
                        {this.state.markers.map((position, idx) => (
                            <Marker key={`marker-${idx}`} position={position}>
                                <Popup>
                                    <span>Parking Lot!</span>
                                </Popup>
                            </Marker>
                        ))}
                        {this.state.startmarker.map((position, idx) => (
                            <Marker key={`marker-${idx}`} position={position}>
                                <Popup>
                                    <span>Starting point :D</span>
                                </Popup>
                            </Marker>
                        ))}

                        <Polyline positions={coordinates} color="blue" />
                    </Map>
                </MapContainer>
                <Menubar
                    findParkingLots={this.findParkingLots}
                    findChargingStations={this.findChargingStations}
                   // logBounds={this.logBounds}
                />
            </Container>
        );
    }
}
export default ReactLeafletMap;
