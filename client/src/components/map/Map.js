import React, { Component } from 'react';
import Leaflet from 'leaflet';
import { Map, TileLayer, Popup, Marker } from 'react-leaflet';
import Menubar from '../menubar/Menubar.js';

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

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/';

// This component HAD to be a component, not PureComponent, to be able to display markers.
// DO NOT change it. Was big problem, as it says nothing changes when it in fact does.
class ReactLeafletMap extends Component {
  constructor () {
    //setting up initial starting state of the map.
    super()
    this.state = {
      // center coordinates for initial map <- change these for wanted location
      lat: 63.417993,
      lng: 10.405758,
      zoom: 15,
      //The markers list will be filled with positions for all parking lots
      markers:[],
    }
    // Makes this availiable. Fixes most of the react issues related to getting correct things
    this.findParkingLots = this.findParkingLots.bind(this);
  }


    findParkingLots(){
      // Finding the bounding box of the current window to use in api call
      var bounds = this.refs.map.leafletElement.getBounds();
      var southWest_lat = bounds._southWest.lat;
      var southWest_lng = bounds._southWest.lng;
      var northEast_lat = bounds._northEast.lat;
      var northEast_lng = bounds._northEast.lng;

      // Include the overpass library to be able to use it. It's a bit slow, but works
      const overpass = require('query-overpass')
      // Creates the query which is sent to overpass-api using their language of preference
      const query = '[out:json];node(' +southWest_lat+','+southWest_lng+','+northEast_lat+','+northEast_lng+')[amenity=parking];out;';
      // Performs the query:
      overpass(query, (error, data) => {
        // Here is what gets returned from the api call to overpass based on bounds.
        var parkingLots = data.features;
        // Obtaining coordinates for each parking lot entry
        let {markers} = this.state
        markers = [];
        // Obtain all positions and send them to the state which will be used to make markers
        for (var i=0; i < parkingLots.length;i++){
          var parkingLot = parkingLots[i];
          var lat = parkingLot.geometry.coordinates[1];
          var lng = parkingLot.geometry.coordinates[0];
          markers.push([lat,lng])
        }
        // Updates the state with new markers.
        this.setState({markers})
      })
    }

  /*  MAPS TO LOOK AT
    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
    url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  */
  render() {
    return (
      <div>
        <div className="map">
          <Map
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}
            ref='map'
          >
            <TileLayer
              url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
              attribution='&copy; <a href="http://www.statkart.no">Startkart.no</a>'
            />
            {this.state.markers.map((position, idx) =>
            <Marker key={`marker-${idx}`} position={position}>
            <Popup>
              <span>Parking Lot!</span>
            </Popup>
          </Marker>
          )}
          </Map>
        </div>
        <Menubar findParkingLots={this.findParkingLots}/>
      </div>
    )
  }
}
export default ReactLeafletMap;
