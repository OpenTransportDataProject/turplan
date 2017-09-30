
import React, { PureComponent } from 'react';
import Leaflet from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import Menubar from '../menubar/Menubar.js';

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/';

class ReactLeafletMap extends PureComponent {
  constructor () {
    super()
    this.state = {
      lat: 63.417993,
      lng: 10.405758,
      zoom: 15,
    }
      this.findParkingLots = this.findParkingLots.bind(this);
  }

  /* This function is connected to the button in the menu, and will use the
  overpass-api to find parking lots within open street map.
  Someone has been nice enough to make a node-edition of the osm data we can use
  directly, called Overpass.

  We use amenity=parking to retreive parking lots from the api. Read more in the
  query-overpass guide.
  Also, use "yarn add query-overpass" in the client folder to ensure access to api.
  */
    findParkingLots(){
      // Finding the bounds of the current window to use in api call
      var bounds = this.refs.map.leafletElement.getBounds();
      var southWest_lat = bounds._southWest.lat;
      var southWest_lng = bounds._southWest.lng;
      var northEast_lat = bounds._northEast.lat;
      var northEast_lng = bounds._northEast.lng;

      console.log(bounds);
      const overpass = require('query-overpass')
      const q = '[out:json];node(' +southWest_lat+','+southWest_lng+','+northEast_lat+','+northEast_lng+')[amenity=parking];out;';
      console.log(q);
      overpass(q, (error, data) => {
        console.log(data)
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
          </Map>
        </div>
        <Menubar findParkingLots={this.findParkingLots}/>
      </div>
    );
  }
}

export default ReactLeafletMap;
