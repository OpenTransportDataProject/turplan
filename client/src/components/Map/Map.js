import React, { Component } from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Menubar from "../Menubar/Menubar.js";
import { Searchbar } from "../Searchbar/Searchbar";
import MapHeader from "../Header/MapHeader.js";
import { Container, Searchcontainer, MapContainer } from "./MapStyles";


/* This function is connected to the button in the menu, and will use the
overpass-api to find parking lots within open street map.*/

//Leaflet.Icon.Default.imagePath =
//"//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";

var parkingIcon = Leaflet.icon({
  iconUrl: "images/marker-park.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [-3, -76]
});

var chargingIcon = Leaflet.icon({
  iconUrl: "images/marker-charge.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [-3, -76]
});

var newMarkerIcon = Leaflet.icon({
  iconUrl: "images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [-3, -76]
});

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
      parkingMarkers: [],
      chargingMarkers: [],
      chargingNobilMarkers: [],
      startMarker: [],

      //For selecting the Starting point.
           pos:null,
           s_parkingpoint: null,
// Selecting the Charging stations
          c_pos:null,
          s_chargepoint:null,




    };

    // Makes this availiable. Fixes most of the react issues related to getting correct things
    this.findParkingLots = this.findParkingLots.bind(this);
    this.findChargingStations = this.findChargingStations.bind(this);
    this.findNobilChargingStations = this.findNobilChargingStations.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.selectparking = this.selectparking.bind(this);
    this.selectcharging=this.selectcharging.bind(this);

  }

  addMarker = e => {
    let { startMarker } = this.state;
    startMarker = [];
    startMarker.push(e.latlng);
    this.setState({ startMarker });
  };


  selectparking(pos){
 console.log("we are passing the postion"+pos);

 this.setState({

s_parkingpoint:pos,

 })

 }




selectcharging(pos)
{
console.log("we Have Selected the Charging Station"+ pos)

this.setState({
s_chargepoint:pos,
})

for (var i = 0; i < this.state.parkingMarkers.length; i++)
{
this.setState({
parkingMarkers:[],

})

}

}


  findParkingLots() {
    // http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example <-- read here for info abt queries

    var bounds = this.refs.map.leafletElement.getBounds();
    // Include the overpass library to be able to use it. It's a bit slow, but works
    const overpass = require("query-overpass");
    //This is reset the Selected parking position
    this.setState({

    s_parkingpoint:null,

})



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
      if(data == null){
        alert("Fikk ingen respons, prøv på nytt litt senere");
        return;
      }
      // Here is what gets returned from the api call to overpass based on bounds.
      var parkingLots = data.features;
      // Obtaining coordinates for each parking lot entry
      let { parkingMarkers } = this.state;
      parkingMarkers = [];
      // Obtain all positions and send them to the state which will be used to make markers
      for (var i = 0; i < parkingLots.length; i++) {
        var parkingLot = parkingLots[i];
        var lat = parkingLot.geometry.coordinates[1];
        var lng = parkingLot.geometry.coordinates[0];
        parkingMarkers.push([lat, lng]);
      }
      // Updates the state with new markers.
      this.setState({ parkingMarkers });
    });
  }

  findChargingStations() {
    // Finding the bounding box of the current window to use in api call
    var bounds = this.refs.map.leafletElement.getBounds();
//Reset the value of the charging marker
this.setState({
//s_parkingpoint:null,
s_chargepoint:null,

})


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
      if(data == null){
        alert("Fikk ingen respons, prøv på nytt litt senere");
        return;
      }
      // Here is what gets returned from the api call to overpass based on bounds.
      var charging_stations = data.features;
      console.log(error);
      // Obtaining coordinates for each parking lot entry
      let { chargingMarkers } = this.state;
      chargingMarkers = [];
      // Obtain all positions and send them to the state which will be used to make markers
      for (var i = 0; i < charging_stations.length; i++) {
        var chargingStation = charging_stations[i];
        var lat = chargingStation.geometry.coordinates[1];
        var lng = chargingStation.geometry.coordinates[0];
        chargingMarkers.push([lat, lng]);
      }
      // Updates the state with new markers.
      this.setState({ chargingMarkers });
    });


  }

  findNobilChargingStations() {
    // Finding the bounding box of the current window to use in api call
    var bounds = this.refs.map.leafletElement.getBounds();
    // Execute Query
    fetch('http://localhost:3001/charging/'+ // Now we MUST run client on 3001. Find a better way.
      bounds._southWest.lat +
      "/" +
      bounds._southWest.lng +
      "/" +
      bounds._northEast.lat +
      "/" +
      bounds._northEast.lng,{
      method:'GET',
        }).then(
          response=>response.json() //converts from json
        ).then(data=>{
            console.log(data);
            var charging_stations = data.chargerstations;
            // Obtaining coordinates for each parking lot entry
            let { chargingNobilMarkers } = this.state;
            chargingNobilMarkers = [];
            // Obtain all positions and send them to the state which will be used to make markers
            for (var i = 0; i < charging_stations.length; i++) {
              var chargingStation = charging_stations[i];
              var lat = chargingStation.csmd.Position.split(",")[0];
              lat = lat.substr(1);
              var lng = chargingStation.csmd.Position.split(",")[1];
              lng = lng.substr(0,lat.length-1);
              chargingNobilMarkers.push([parseFloat(lat), parseFloat(lng)]);
              console.log(parseFloat(lat), parseFloat(lng));
            }
            // Updates the state with new markers.
            this.setState({ chargingNobilMarkers });
          }
      );
    }





  handleMap(lat, lng) {
    this.setState({
      lat,
      lng
    });
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
        <MapHeader />
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
          >
            <TileLayer
              url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
              attribution="&copy; <a href=&quot;http://www.statkart.no&quot;>Startkart.no</a>"
            />

            {!this.state.s_parkingpoint ?this.state.parkingMarkers.map((position, idx) => (


              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={parkingIcon}
              >
                <Popup>
                  <span>


             {<button onClick={(e) =>this.selectparking(position)}>Mark This parking lot starting point</button>}




                  </span>
                </Popup>
              </Marker>
            )):  <Marker  position={this.state.s_parkingpoint} icon={parkingIcon}>

            <Popup>


                       <span>

                     This is your selected Starting point
                       </span>
                     </Popup>

           </Marker>

          }






            {!this.state.s_chargepoint ?this.state.chargingMarkers.map((position, idx) => (
              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={chargingIcon}
              >
                <Popup>
                  <span>
                 {<button onClick={(e) =>this.selectcharging(position)}>Mark This charging as starting point</button>}
                  </span>
                </Popup>
              </Marker>
            )): <Marker  position={this.state.s_chargepoint} icon={chargingIcon}>

            <Popup>


                       <span>

                     This is your selected Starting point
                       </span>
                     </Popup>

           </Marker>





          }





            {this.state.chargingNobilMarkers.map((position, idx) => (
              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={chargingIcon}
              >
                <Popup>
                  <span>NOBIL Ladestasjon!</span>
                </Popup>
              </Marker>
            ))}
            {this.state.startMarker.map((position, idx) => (
              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={newMarkerIcon}
              >
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
          findNobilChargingStations={this.findNobilChargingStations}
        />
      </Container>
    );
  }
}
export default ReactLeafletMap;
