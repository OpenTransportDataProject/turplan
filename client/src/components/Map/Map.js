import React, { Component } from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Popup, Marker } from "react-leaflet";
import Menubar from "../Menubar/Menubar.js";
import { Searchbar } from "../Searchbar/Searchbar";
import MapHeader from "../Header/MapHeader.js";
import { Container, Searchcontainer, MapContainer, Button, Row, ToggleContainer, Header } from "./MapStyles";
import Toggle from 'material-ui/Toggle';

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

function toRadians(degrees){
  return degrees*Math.PI/180;
}

function coordinateDistance(lat1,lng1,lat2,lng2){
  // This function is supposed to return distance in meters
  // This function is from the internet.
  // based on function from haversine-formula
  var r = 6371e3; // earth radius in meters
  var ro1 = toRadians(lat1);
  var ro2 = toRadians(lat2);
  var deltaro = toRadians(lat2-lat1);
  var deltalamda = toRadians(lng2-lng1);
  var a = Math.sin(deltaro/2)*Math.sin(deltaro/2)+
  Math.cos(ro1)*Math.cos(ro2)*Math.sin(deltalamda/2)*Math.sin(deltalamda/2);
  var c = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  return r*c;
}

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
      vegvesenMarkers: [],
      chargingMarkers: [],
      chargingNobilMarkers: [],
      startMarker: [],
      //Selecting the Parking point.
      p_pos: null,
      s_parkingpoint: null,
      // Selecting the Charging stations
      c_pos: null,
      s_chargepoint: null,
      showParking: false,
      showCharging: false,
      showHikes: false,
    };

    // Makes this availiable. Fixes most of the react issues related to getting correct things
    this.findParkingLots = this.findParkingLots.bind(this);
    this.findVegvesenParkingLots = this.findVegvesenParkingLots.bind(this);
    this.findChargingStations = this.findChargingStations.bind(this);
    this.findNobilChargingStations = this.findNobilChargingStations.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.handleMap = this.handleMap.bind(this);
    this.selectparking = this.selectparking.bind(this);
    this.selectcharging = this.selectcharging.bind(this);

  }

  componentDidMount() {
    this.findParkingLots();
    this.findChargingStations();
  }

  addMarker = e => {
    let { startMarker } = this.state;
    startMarker = [];
    startMarker.push(e.latlng);
    this.setState({ startMarker });
  };

  selectparking(pos) {
    console.log("we are passing the postion" + pos);

    this.setState({ s_parkingpoint: pos });

    for (var i = 0; i < this.state.chargingMarkers.length; i++) {
      this.setState({
        chargingMarkers: [],
        s_chargepoint: null
      });
    }
  }

  selectcharging(pos) {
    console.log("we Have Selected the Charging Station" + pos);

    this.setState({ s_chargepoint: pos });

    for (var i = 0; i < this.state.parkingMarkers.length; i++) {
      this.setState({
        parkingMarkers: [],
        s_parkingpoint: null
      });
    }
  }

  findParkingLots() {
    // http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example <-- read here for info abt queries

    var bounds = this.refs.map.leafletElement.getBounds();
    // Include the overpass library to be able to use it. It's a bit slow, but works
    const overpass = require("query-overpass");
    //This is reset the Selected parking position
    this.setState({ s_parkingpoint: null });

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

    this.findVegvesenParkingLots();
  }

  findChargingStations() {
    this.findNobilChargingStations();
    // Finding the bounding box of the current window to use in api call
    var bounds = this.refs.map.leafletElement.getBounds();

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
            points: points
          });
        }
        // Updates the state with new markers.
        this.setState({ chargingNobilMarkers });
        //Reset the value of the charging marker
        this.setState({ s_chargepoint: null });

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
        //
        overpass(query, (error, data) => {
          if (data == null) {
            return;
          }
          // Here is what gets returned from the api call to overpass based on bounds.
          let charging_stations = data.features;
          // Obtaining coordinates for each parking lot entry
          let chargingMarkers = [];
          // Obtain all positions and send them to the state which will be used to make markers
          for (let i = 0; i < charging_stations.length; i++) {
            var discard = false;
            const chargingStation = charging_stations[i];
            const lat = chargingStation.geometry.coordinates[1];
            const lng = chargingStation.geometry.coordinates[0];
            for (let j = 0; j < chargingNobilMarkers.length;j++){
              // Check if the exact marker is already on map:
              var pos = chargingNobilMarkers[j].position;
              var threshold = 50; // meters merging
              if (coordinateDistance(pos[0],pos[1],lat,lng)<threshold) {
                discard = true;
                break;
              }
            }
            if(discard){
              continue;
            }
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
        var bounds = this.refs.map.leafletElement.getBounds();

        for (let i = 0; i < parking_lots.length; i++) {
          const parking_lot = parking_lots[i];
          const lat = parking_lot.breddegrad;
          const lng = parking_lot.lengdegrad;
          // THIS one discards stuff outside bounding box so it's way faster to zoom/navigate
          if(lat < bounds._southWest.lat || lat > bounds._northEast.lat ||
          lng < bounds._southWest.lng || lng > bounds._northEast.lng){
            continue;
          }
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

  updateInfoOnMap(infoType) {
    if (infoType === 'showParking') {
      console.log('yes')
      this.findParkingLots();
    } else if (infoType === 'showCharging') {
      this.findChargingStations();
    }
  }

  toggleInfoOnMap = (infoType) => {
    this.setState({
      [infoType]: !this.state[infoType]
    })
    this.updateInfoOnMap(infoType);
  }

  /*  MAPS TO LOOK AT
  url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
  url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
*/

  render() {

    const styles = {
      toggle: {
        textAlign: 'right',
        width: '50%',
      }
    }
    return (
      <Container>
        {
          <Row>
            <Header>Turplan</Header>
            <ToggleContainer>
              <Toggle
                label="Parkering"
                defaultToggled={false}
                labelStyle={styles.toggle}
                onToggle={() => this.toggleInfoOnMap('showParking')}
              />
            </ToggleContainer>
            <ToggleContainer>
              <Toggle
                label="Ladestasjon"
                defaultToggled={false}
                labelStyle={styles.toggle}
                onToggle={() => this.toggleInfoOnMap('showCharging')}
              />
            </ToggleContainer>
            <ToggleContainer>
              <Toggle
                label="Turer"
                defaultToggled={false}
                labelStyle={styles.toggle}
                onToggle={() => this.toggleInfoOnMap('showHikes')}
              />
            </ToggleContainer>
            <Searchbar handleMap={(lat, lng) => this.handleMap(lat, lng)} />
          </Row>
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

            {this.state.showParking ? (!this.state.s_parkingpoint ? (
              this.state.parkingMarkers.map(({ position, tags, id }, idx) => (
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
                      <div>
                        {
                          <button onClick={e => this.selectparking(position)}>
                            Mark as starting point?
                          </button>
                        }
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))
            ) : (
              <Marker position={this.state.s_parkingpoint} icon={parkingIcon}>
                <Popup>
                  <span>Your selected starting point!</span>
                </Popup>
              </Marker>
            )) : null}

            {this.state.showCharging ? (!this.state.s_chargepoint ? (
              this.state.chargingMarkers.map(({ position, id, tags }, idx) => (
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
                      <div>
                        {
                          <button onClick={e => this.selectcharging(position)}>
                            Mark as starting point?
                          </button>
                        }
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))
            ) : (
              <Marker position={this.state.s_chargepoint} icon={chargingIcon}>
                <Popup>
                  <span>Your selected starting point!</span>
                </Popup>
              </Marker>
            )) : null }

            {this.state.showParking ? this.state.vegvesenMarkers.map(
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
            ) : null}

            {this.state.showCharging ? this.state.chargingNobilMarkers.map(
              ({ position, id, address, name, points }, idx) => (
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
            ) : null}

            {this.state.startMarker.map((position, idx) => (
              <Marker
                key={`marker-${idx}`}
                position={position}
                icon={newMarkerIcon}
              >
                <Popup>
                  <span>Starting point!</span>
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
