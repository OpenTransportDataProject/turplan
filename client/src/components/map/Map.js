
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
      search: '',
      bounds: [[], []]
    }
  }


  render() {
    return (
      <div className="map">
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >


          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
          />
        </Map>
      </div>
    );
  }
}

export default ReactLeafletMap;
