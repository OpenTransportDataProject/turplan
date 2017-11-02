import React, { Component } from "react";
import Leaflet from "leaflet";
import axios from "axios";
import {newMarkerIcon, chargingIcon, parkingIcon} from '../../assets/markers';

import { Map, TileLayer, Popup, Marker, Polyline } from "react-leaflet";
import { Searchbar } from "../Searchbar/Searchbar";
import MapHeader from "../Header/MapHeader.js";
import { ToggleStyle, Container, Searchcontainer, MapContainer, TripDescriptionContainer, TagContainer, InlineTagsContainer, Button, Row, ToggleContainer, Header, InfoError } from "./MapStyles";
import Toggle from 'material-ui/Toggle';
import Dialog from './Dialog';
import 'leaflet-routing-machine';

/* This function is connected to the button in the menu, and will use the
overpass-api to find parking lots within open street map.*/
import styled from "styled-components";

import {getHikes, Difficulity} from "../../actions/hikes";
import {getChargingStations} from "../../actions/charging";
import {getParking} from "../../actions/parking";

const startPosition = {
	lat: 63.417993,
	lng: 10.405758,
	zoom: 15
}

class ReactLeafletMap extends Component {
  
	constructor(){
		super();
		this.state = {
			showHikes: false,
			showCharging: false,
			showParking: false,
			hikesInView: [],
			chargingStationsInView: [],
			parkingInView: [],
		}
		this._onViewportChanged = this._onViewportChanged.bind(this);
		this._selectStart = this._selectStart.bind(this);
	}

	async _onViewportChanged(){
		var bounds = this.refs.map.leafletElement.getBounds();
		if(this.state.showHikes) this._getHikes(bounds);
		if(this.state.showCharging) this._getChargingStations(bounds);
		if(this.state.showParking) this._getParking(bounds);
	}

	async _getHikes(bounds){
		var hikes = await getHikes(bounds) || [];
		this.setState({ hikesInView: hikes });
	}

	async _getChargingStations(bounds){
		var chargingStations = await getChargingStations(bounds) || [];
		console.log(chargingStations);
		this.setState({ chargingStationsInView: chargingStations });

	}

	async _getParking(bounds) {
		var parking = await getParking(bounds) || [];
		this.setState({ parkingInView: parking });
	}

	_selectStart(position) {
		console.log(position);
	}

	componentDidMount(){
		this._onViewportChanged();
	}

	render() {

		return (
			<Container>
				<Row>
					<Header>Turplan</Header>
					<ToggleContainer>
						<Toggle
							label="Turer"
							labelStyle={ToggleStyle}
							defaultToggled={false} // todo: This could cause a potential bug. What if we decide to have hikes visible from the start??
							onToggle={(event, value) => {this.state.showHikes = value; this._getHikes(this.refs.map.leafletElement.getBounds());}}
						/>
					</ToggleContainer>
					<ToggleContainer>
						<Toggle
							label="Charging stations"
							labelStyle={ToggleStyle}
							defaultToggled={false} // todo: This could cause a potential bug. What if we decide to have hikes visible from the start??
							onToggle={(event, value) => {this.state.showCharging = value; this._getChargingStations(this.refs.map.leafletElement.getBounds());}}
						/>
					</ToggleContainer>
					<ToggleContainer>
						<Toggle
							label="Parking"
							labelStyle={ToggleStyle}
							defaultToggled={false} // todo: This could cause a potential bug. What if we decide to have hikes visible from the start??
							onToggle={(event, value) => {this.state.showParking = value; this._getParking(this.refs.map.leafletElement.getBounds());}}
						/>
					</ToggleContainer>
				</Row>
				<MapContainer>
					<Map 
						onViewportChanged={this._onViewportChanged}
						center={[startPosition.lat, startPosition.lng]}
            			zoom={startPosition.zoom}
            			ref="map">
						
						<TileLayer
							url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
							attribution="&copy; <a href=&quot;http://www.statkart.no&quot;>Startkart.no</a>"
						/>

						// This is the thing for displaying all the hikes.
						// todo: move into own component
						{this.state.showHikes ? this.state.hikesInView.map((hike, idx) => (
						<div key={hike._id}>
							<Polyline positions={hike.geometry.coordinates} color="rgba(0,0,255,1)"/>
							<Marker key={`marker-${idx}`} position={hike.geometry.coordinates[0]} icon={newMarkerIcon}>
								<Popup>
									<div>
										{hike.name ? <div style={{"marginBottom": "8px"}}><b><h3>{hike.name}</h3></b></div> : null }
										{hike.maxDist > 0 ? <div><b>Lengde: </b>{hike.maxDist}</div> : null}
										{hike.description ? <TripDescriptionContainer dangerouslySetInnerHTML={{ __html: hike.description }}></TripDescriptionContainer> : null}
										{hike.duration > 0 ? <div><b>Varighet: </b>{hike.duration} timer</div> : null}
										{hike.provider > 0 ? <div><b>Tilbyder: </b>{hike.provider}</div> : null}
										{hike.tags ? <InlineTagsContainer>{hike.tags ? (hike.tags.map((tag, tagId) => (<TagContainer key={tagId}>{tag}</TagContainer>)))
											: null}</InlineTagsContainer> : null }
										{hike.classification ? <div><b>Vansklighetsgrad: </b>{Difficulity[hike.classification]}</div> : null}
									</div>
								</Popup>
							</Marker>
						</div>
						)) : null}
						
						// This is the thing for displaying all the charging stations.
						// todo: move into own component
						{this.state.showCharging ? this.state.chargingStationsInView.map((chargingStation, idx) => (
						<div key={idx}>
							<Marker key={`marker-${idx}`} position={chargingStation.geometry.coordinates.reverse()} icon={chargingIcon}>
								<Popup>
									<div>
										<div>Ladestasjon!</div>
										<div>
											Adresse: {chargingStation.address.street} {chargingStation.address.street_nr}
										</div>
										<div>Antall Ladeplasser: {chargingStation.points}</div>
										<div>Fra: NOBIL Transnova</div>
										<div>ID: {chargingStation.id}</div>
									</div>
								</Popup>
							</Marker>
						</div>
						)) : null}

						// This is the thing for displaying all the parking.
						// todo: move into own component
						{this.state.showParking ? this.state.parkingInView.map((parking, idx) => (
						<div key={idx}>
							<Marker key={`marker-${idx}`} position={parking.geometry.coordinates.reverse()} icon={parkingIcon}>
								<Popup>
									<div>
										<div>Parkeringsplass!</div>
										<div>Amenity: {parking.tags.amenity}</div>
										<div>Betaling: {parking.tags.fee}</div>
										<div>Parkeringstillegg: {parking.tags.p_fee}</div>
										<div>Kapasitet: {parking.tags.capacity}</div>
										<div>Maks oppholdstid: {parking.tags.maxstay}</div>
										<div>Fra: OpenStreetMap</div>
										<div>ID: {parking.tags.id}</div>
										<div>
										{
											<button onClick={e => this._selectStart(parking.geometry)}>
												Mark as starting point?
											</button>
										}
										</div>
									</div>
								</Popup>
							</Marker>
						</div>
						)) : null}

					</Map>
				</MapContainer>
			</Container>
		);
	}
}

export default ReactLeafletMap;
