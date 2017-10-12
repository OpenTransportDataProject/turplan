import React, { Component } from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Menubar from "../Menubar/Menubar.js";
import {Searchbar} from "../Searchbar/Searchbar";
import styled from "styled-components";

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
    zoom: 15,
    //The markers list will be filled with positions for all parking lots
    markers: [],
    startmarker: []
  };

  // Makes this availiable. Fixes most of the react issues related to getting correct things
  this.findParkingLots = this.findParkingLots.bind(this);
  this.findChargingStations = this.findChargingStations.bind(this);
  this.addMarker = this.addMarker.bind(this);
  this.handleMap = this.handleMap.bind(this);


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

handleMap(lat, lng){
  this.setState({
    lat,
    lng
  })
}



printLatLng(){
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
        <Searchbar handleMap={(lat, lng) => this.handleMap(lat, lng)}/>
      </Searchcontainer>

      }
      <MapContainer>
        <Map
          center={[this.state.lat, this.state.lng]}
          //center={[this.props.lat, this.props.lng]}
          zoom={this.state.zoom}
          ref="map"
          onClick={this.addMarker}
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
        </Map>
      </MapContainer>
      <Menubar
        findParkingLots={this.findParkingLots}
        findChargingStations={this.findChargingStations}
      />
    </Container>
  );
}
}
export default ReactLeafletMap;
