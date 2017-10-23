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
      vegvesenMarkers: []
    };

    // Makes this availiable. Fixes most of the react issues related to getting correct things
    this.findParkingLots = this.findParkingLots.bind(this);
    this.findVegvesenParkingLots = this.findVegvesenParkingLots.bind(this);
    this.findChargingStations = this.findChargingStations.bind(this);
    this.findNobilChargingStations = this.findNobilChargingStations.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.handleMap = this.handleMap.bind(this);
  }

  addMarker = e => {
    let { startMarker } = this.state;
    startMarker = [];
    startMarker.push(e.latlng);
    this.setState({ startMarker });
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
      if (data == null) {
        alert("Fikk ingen respons, prøv på nytt litt senere");
        return;
      }
      // Here is what gets returned from the api call to overpass based on bounds.
      let parkingLots = data.features;
      // Obtaining coordinates for each parking lot entry
      let parkingMarkers = [];
      // Obtain all positions and send them to the state which will be used to make markers
      for (let i = 0; i < parkingLots.length; i++) {
        const parkingLot = parkingLots[i];
        const lat = parkingLot.geometry.coordinates[1];
        const lng = parkingLot.geometry.coordinates[0];
        const id = parkingLot.id;
        const tags = parkingLot.properties.tags;
        const amenity = tags.amenity;
        const access = tags.access;
        const fee = tags.fee;
        const capacity = tags.capacity;
        const maxstay = tags.maxstay;

        parkingMarkers.push({
          position: [lat, lng],
          tags: {
            amenity: amenity,
            access: access
          },
          id: id
        });
      }
      // Updates the state with new markers.
      this.setState({ parkingMarkers });
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
      if (data == null) {
        alert("Fikk ingen respons, prøv på nytt litt senere");
        return;
      }
      // Here is what gets returned from the api call to overpass based on bounds.
      let charging_stations = data.features;
      // Obtaining coordinates for each parking lot entry
      let chargingMarkers = [];
      // Obtain all positions and send them to the state which will be used to make markers
      for (let i = 0; i < charging_stations.length; i++) {
        const chargingStation = charging_stations[i];
        const lat = chargingStation.geometry.coordinates[1];
        const lng = chargingStation.geometry.coordinates[0];
        const id = chargingStation.id;
        const tags = chargingStation.properties.tags;
        const amenity = tags.amenity;
        const fee = tags.fee;
        const capacity = tags.capacity;
        const hours = tags.opening_hours;

        chargingMarkers.push({
          position: [lat, lng],
          id: id,
          tags: {
            amenity: amenity,
            fee: fee,
            capacity: capacity,
            hours: hours
          }
        });
      }
      // Updates the state with new markers.
      this.setState({ chargingMarkers });
    });
  }

  findNobilChargingStations() {
    // Finding the bounding box of the current window to use in api call
    var bounds = this.refs.map.leafletElement.getBounds();
    // Execute Query
    fetch(
      "http://localhost:3001/charging/" + // Now we MUST run client on 3001. Find a better way.
        bounds._southWest.lat +
        "/" +
        bounds._southWest.lng +
        "/" +
        bounds._northEast.lat +
        "/" +
        bounds._northEast.lng,
      {
        method: "GET"
      }
    )
      .then(
        response => response.json() //converts from json
      )
      .then(data => {
        const charging_stations = data.chargerstations;
        // Obtaining coordinates for each parking lot entry
        let chargingNobilMarkers = [];
        // Obtain all positions and send them to the state which will be used to make markers
        for (let i = 0; i < charging_stations.length; i++) {
          const chargingStation = charging_stations[i];
          const lat = chargingStation.csmd.Position.split(",")[0].substr(1);
          //lat = lat.substr(1);
          const lng = chargingStation.csmd.Position
            .split(",")[1]
            .substr(0, lat.length - 1);
          //lng = lng.substr(0, lat.length - 1);
          const id = chargingStation.csmd.id;
          const name = chargingStation.csmd.name;
          const street = chargingStation.csmd.Street;
          const street_nr = chargingStation.csmd.House_number;
          const points = chargingStation.csmd.Number_charging_points;
          const description = chargingStation.csmd.Description_of_location;

          chargingNobilMarkers.push({
            position: [parseFloat(lat), parseFloat(lng)],
            id: id,
            name: name,
            address: {
              street: street,
              street_nr: street_nr
            },
            points: points,
            description: description
          });
        }
        // Updates the state with new markers.
        this.setState({ chargingNobilMarkers });
      });
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

  findVegvesenParkingLots() {
    fetch(
      "https://www.vegvesen.no/ws/no/vegvesen/veg/parkeringsomraade/parkeringsregisteret/v1/parkeringsomraade?datafelter=alle"
    )
      .then(results => results.json())
      .then(parking_lots => {
        let vegvesenMarkers = [];

        for (let i = 0; i < parking_lots.length; i++) {
          const parking_lot = parking_lots[i];
          const lat = parking_lot.breddegrad;
          const lng = parking_lot.lengdegrad;
          const id = parking_lot.id;
          const version = parking_lot.aktivVersjon;
          const address = version.adresse;
          const pay_p = version.antallAvgiftsbelagtePlasser;
          const free_p = version.antallAvgiftsfriePlasser;
          const charge_p = version.antallLadeplasser;
          const handicap_p = version.antallForflytningshemmede;

          vegvesenMarkers.push({
            position: [lat, lng],
            id: id,
            address: address,
            lots: {
              pay: pay_p,
              free: free_p,
              charge: charge_p,
              handicap: handicap_p
            }
          });
        }

        this.setState({ vegvesenMarkers });
      })
      .catch(function(error) {
        console.log(error);
      });
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
            {this.state.parkingMarkers.map(({ position, tags, id }, idx) => (
              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={parkingIcon}
              >
                <Popup>
                  <div>
                    <div>Parkeringsplass!</div>
                    <div>
                      Posisjon: {position[0]}, {position[1]}
                    </div>
                    <div>Amenity: {tags.amenity}</div>
                    <div>Betaling: {tags.fee}</div>
                    <div>Parkeringstillegg: {tags.p_fee}</div>
                    <div>Kapasitet: {tags.capacity}</div>
                    <div>Maks oppholdstid: {tags.maxstay}</div>
                    <div>Fra: OpenStreetMap</div>
                    <div>ID: {id}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
            {this.state.chargingMarkers.map(({ position, id, tags }, idx) => (
              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={chargingIcon}
              >
                <Popup>
                  <div>
                    <div>Ladestasjon!</div>
                    <div>
                      Posisjon: {position[0]}, {position[1]}
                    </div>
                    <div>Amenity: {tags.amenity}</div>
                    <div>Betaling: {tags.fee}</div>
                    <div>Kapasitet: {tags.capacity}</div>
                    <div>Fra: OpenStreetMap</div>
                    <div>ID: {id}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
            {this.state.vegvesenMarkers.map(
              ({ position, id, address, lots }, idx) => (
                <Marker
                  key={`marker-${idx}`}
                  position={position}
                  icon={parkingIcon}
                >
                  <Popup>
                    <div>
                      <div>Parkeringsplass!</div>
                      <div>Adresse: {address}</div>
                      <div>
                        Posisjon: {position[0]}, {position[1]}
                      </div>
                      <div>
                        <div>Antall avgiftsbelagte plasser: {lots.pay}</div>
                        <div>Antall avgiftsfrie plasser: {lots.free}</div>
                        <div>Antall ladeplasser: {lots.charge}</div>
                        <div>Antall handicap plasser: {lots.handicap}</div>
                      </div>
                      <div>Fra: Parkeringsregisteret</div>
                      <div>ID: {id}</div>
                    </div>
                  </Popup>
                </Marker>
              )
            )}
            {this.state.chargingNobilMarkers.map(
              ({ position, id, address, name, points, description }, idx) => (
                <Marker
                  key={`marker-${idx}`}
                  position={position}
                  icon={chargingIcon}
                >
                  <Popup>
                    <div>
                      <div>Ladestasjon!</div>
                      <div>
                        Adresse: {address.street} {address.street_nr}
                      </div>
                      <div>
                        Posisjon: {position[0]}, {position[1]}
                      </div>
                      <div>Antall Ladeplasser: {points}</div>
                      <div>Fra: NOBIL Transnova</div>
                      <div>ID: {id}</div>
                    </div>
                  </Popup>
                </Marker>
              )
            )}
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
          findVegvesenParkingLots={this.findVegvesenParkingLots}
          findChargingStations={this.findChargingStations}
          findNobilChargingStations={this.findNobilChargingStations}
        />
      </Container>
    );
  }
}

export default ReactLeafletMap;
