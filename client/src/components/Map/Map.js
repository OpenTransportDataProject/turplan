
import React, { PureComponent } from 'react';
import Leaflet from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/';

class ReactLeafletMap extends PureComponent {
  constructor () {
    super()
    this.state = {
      lat: 63.417993,
      lng: 10.405758,
      zoom: 15,
    }
  }



  /*  MAPS TO LOOK AT
    url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
    url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
  */

  render() {
    return (
      <div className="map">
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >
          <TileLayer
            url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
            attribution='&copy; <a href="http://www.statkart.no">Startkart.no</a>'
          />
        </Map>
      </div>
    );
  }
}

export default ReactLeafletMap;
