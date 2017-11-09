import React, { Component } from "react";
import Leaflet from "leaflet";
import L from "leaflet";
import axios from "axios";
import {newMarkerIcon, chargingIcon, parkingIcon} from '../../assets/markers';

import { Map, TileLayer, Popup, Marker, Polyline } from "react-leaflet";
import { Searchbar } from "../Searchbar/Searchbar";
import MapHeader from "../Header/MapHeader.js";
import { ToggleStyle, Container, Searchcontainer, MapContainer, TripDescriptionContainer, TagContainer, InlineTagsContainer, Button, Row, ToggleContainer, Header, InfoError } from "./MapStyles";
import Toggle from 'material-ui/Toggle';
import Dialog from './Dialog';
import 'leaflet-routing-machine';
import Loading from 'react-loading-spinner';
import 'react-loading-spinner/src/css/index.css';

/* This function is connected to the button in the menu, and will use the
overpass-api to find parking lots within open street map.*/
import styled from "styled-components";

import {getHikes, Difficulity} from "../../actions/hikes";
import {getChargingStations} from "../../actions/charging";
import {getParking} from "../../actions/parking";
import {distance} from "../../actions/haversineDist";

Leaflet.Icon.Default.imagePath = "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";


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
			loadingHikes: false,
			showCharging: false,
			loadingCharging: false,
			showParking: false,
			loadingParking: false,
			hikesInView: null,
			chargingStationsInView: null,
			parkingInView: null,
			routingStart: null,
			routingDestination: null,
			routingElement: null,
			zoomLevel: 15,
		}
		this._onViewportChanged = this._onViewportChanged.bind(this);
		this._selectStart = this._selectStart.bind(this);
		this._selectDestination = this._selectDestination.bind(this);
		this._clearRoute = this._clearRoute.bind(this);
		this.setPosition = this.setPosition.bind(this);
		this.onMapClick = this.onMapClick.bind(this);
		this._selectDestinationHike = this._selectDestinationHike.bind(this);
	}

	async _onViewportChanged(){
		//this.refs.map.leafletElement.closePopup();

		let zoom = this.refs.map.leafletElement.getZoom();

		var bounds = this.refs.map.leafletElement.getBounds();
		this.setState({zoomLevel: zoom}, () => {
			if(this.state.showParking) this._updateParking(true, bounds);
		});
		if(this.state.showHikes) this._updateHikes(true, bounds);
		if(this.state.showCharging) this._updateChargingStations(true, bounds);
	}

	async _updateHikes(value, bounds){
		if(value == true) {
			this.setState({ showHikes: true });
			this.setState({ loadingHikes: true });
			var hikes = await getHikes(bounds) || [];
			this.setState({ loadingHikes: false });
			this.setState({ hikesInView: hikes });
		} else {
			this.setState({ showHikes: false });
			this.setState({ loadingHikes: false });
			this.setState({ hikesInView: null });
		}
	}

	async _updateChargingStations(value, bounds){
		if(value == true) {
			this.setState({ showCharging: true });
			this.setState({ loadingCharging: true });
			var chargingStations = await getChargingStations(bounds) || [];
			this.setState({ loadingCharging: false });
			this.setState({ chargingStationsInView: chargingStations });
		} else {
			this.setState({ showCharging: false });
			this.setState({ loadingCharging: false });
			this.setState({ chargingStationsInView: null });
		}
	}

	async _updateParking(value, bounds) {

		if(value == true) {
			if(this.state.zoomLevel > 14) {
				this.setState({ showParking: true });
				this.setState({ loadingParking: true });
				var parking = await getParking(bounds) || [];
				this.setState({ loadingParking: false });
				this.setState({ parkingInView: parking });
			} else {
			}
		} else {
			this.setState({ showParking: false });
			this.setState({ loadingParking: false });
			this.setState({ parkingInView: null });
		}
	}

	_selectStart(start) {
		this.setState({ routingStart: start }, this._updateRoute);
	}

	_selectDestination(dest) {
		console.log(dest);
		this.setState({ routingDestination: dest }, this._updateRoute);
		this.refs.map.leafletElement.closePopup();
	}

	_clearRoute(){
		this.setState({routingDestination: null}, () => {
			this.setState({routingStart: null}, this._updateRoute);
		});
	}

	_selectDestinationHike(hike) {
		this._selectDestination({geometry: { type: 'Point', coordinates: [ hike.geometry.coordinates[0][0], hike.geometry.coordinates[0][1] ] }})
	}

	setPosition(lat, lng) {
		this.refs.map.leafletElement.panTo([lat, lng]);
		this._selectStart({geometry: { type: 'Point', coordinates: [lng, lat] }})
	}

	onMapClick(e) {
		this._selectStart({geometry: { type: 'Point', coordinates: [e.latlng.lng, e.latlng.lat] }})
	}

	_updateRoute(){
		if(this.state.routingElement) {
			this.refs.map.leafletElement.removeControl(this.state.routingElement);
			this.state.routingElement = null;
		}
		if(this.state.routingStart && this.state.routingDestination) {

			var startCoords = this.state.routingStart.geometry.type == 'Point' ? this.state.routingStart.geometry.coordinates : this.state.routingStart.geometry.coordinates[0];
			var endCoords = this.state.routingDestination.geometry.type == 'Point' ? this.state.routingDestination.geometry.coordinates : this.state.routingDestination.geometry.coordinates[0];
			var dist = distance(startCoords, endCoords);
			if(dist < 100 || dist > 50000 || !dist) {
				return;
			}
			console.log('start: ',startCoords)
			console.log('end:   ',endCoords)

			var route = L.Routing.control({
				lineOptions:{styles:[{color: 'black', opacity: 0.15, weight: 9},
				{color: 'blue', opacity: 0.8, weight: 6},
				{color: 'blue', opacity: 1, weight: 2}]},
				waypoints:[
					L.latLng(startCoords[0], startCoords[1]),
					L.latLng(endCoords[0], endCoords[1]),
				]
			}).addTo(this.refs.map.leafletElement);
			this.setState({routingElement: route}, () => console.log("hello World"));
		} else if(this.state.routingElement) {
			this.refs.map.leafletElement.removeControl(this.state.routingElement);
			this.setState({routingElement: null});
		}
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
							defaultToggled={false}
							onToggle={(event, value) => {this._updateHikes(value, this.refs.map.leafletElement.getBounds());}}
						/>
						{this.state.loadingHikes ? <Loading isLoading={true}></Loading> : null}
					</ToggleContainer>
					<ToggleContainer>
						<Toggle
							label="Ladestasjoner"
							labelStyle={ToggleStyle}
							defaultToggled={false}
							onToggle={(event, value) => {this._updateChargingStations(value, this.refs.map.leafletElement.getBounds());}}
						/>
						{this.state.loadingCharging ? <Loading isLoading={true}></Loading> : null}
					</ToggleContainer>
					<ToggleContainer>
						<Toggle
							label="Parkering"
							labelStyle={ToggleStyle}
							value={this.state.showParking}
							disabled={this.state.zoomLevel <= 14}
							ref="parkingToggle"
							defaultToggled={false}
							onToggle={(event, value) => {this._updateParking(value, this.refs.map.leafletElement.getBounds());}}
						/>
						{this.state.loadingParking ? <Loading isLoading={true}></Loading> : null}
					</ToggleContainer>
					<Button color="primary" disabled={!this.state.routingStart && !this.state.routingDestination} onClick={this._clearRoute}>Fjern rute</Button>
					<Searchbar handleMap={(lat, lng) => this.setPosition(lat, lng)} />
				</Row>
				<MapContainer>
					<Map
						onViewportChanged={this._onViewportChanged}
						center={[startPosition.lat, startPosition.lng]}
						zoom={startPosition.zoom}
						onClick={this.onMapClick}
            			ref="map">

						<TileLayer
							url="http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo2&zoom={z}&x={x}&y={y}"
							attribution="&copy; <a href=&quot;http://www.statkart.no&quot;>Startkart.no</a>"
						/>

						{this.state.showHikes && this.state.hikesInView != null ? this.state.hikesInView.map((hike, idx) => (
						<div key={hike._id}>
							<Polyline positions={hike.geometry.coordinates} color="rgba(0,0,255,1)"/>
							<Marker key={`marker-${idx}`} position={hike.geometry.coordinates[0]} icon={newMarkerIcon}>
								<Popup autoPan={false}>
									<div>
										{hike.name ? <div style={{"marginBottom": "8px"}}><b><h3>{hike.name}</h3></b></div> : null }
										{hike.maxDist > 0 ? <div><b>Lengde: </b>{hike.maxDist}</div> : null}
										{hike.description ? <TripDescriptionContainer dangerouslySetInnerHTML={{ __html: hike.description }}></TripDescriptionContainer> : null}
										{hike.duration > 0 ? <div><b>Varighet: </b>{hike.duration} timer</div> : null}
										{hike.provider > 0 ? <div><b>Tilbyder: </b>{hike.provider}</div> : null}
										{hike.tags ? <InlineTagsContainer>{hike.tags ? (hike.tags.map((tag, tagId) => (<TagContainer key={tagId}>{tag}</TagContainer>)))
											: null}</InlineTagsContainer> : null }
										{hike.classification ? <div><b>Vansklighetsgrad: </b>{Difficulity[hike.classification]}</div> : null}
										<div>
										{
											<button onClick={e => this._selectDestinationHike(hike)}> Merk som mål </button>
										}
										</div>
									</div>
								</Popup>
							</Marker>
						</div>
						)) : null}

						{this.state.showCharging && this.state.chargingStationsInView != null && this.state.chargingStationsInView != null ? this.state.chargingStationsInView.map((chargingStation, idx) => (
						<div key={idx}>
							<Marker key={`marker-${idx}`} position={chargingStation.geometry.coordinates.reverse()} icon={chargingIcon}>
								<Popup autoPan={false}>
									<div>
										<div>Ladestasjon!</div>
										<div>
											Adresse: {chargingStation.address.street} {chargingStation.address.street_nr}
										</div>
										<div>Antall Ladeplasser: {chargingStation.points}</div>
										<div>Fra: NOBIL Transnova</div>
										<div>ID: {chargingStation.id}</div>
										<div>
											<button onClick={e => this._selectDestination(chargingStation)}> Merk som mål </button>
										</div>
									</div>
								</Popup>
							</Marker>
						</div>
						)) : null}

						{this.state.showParking && this.state.parkingInView != null ? this.state.parkingInView.map((parking, idx) => (
						<div key={idx}>
							{parking.geometry ? <Marker key={`marker-${idx}`} position={parking.geometry.coordinates.reverse()} icon={parkingIcon}>
								<Popup autoPan={false}>
									<div>
										<div>Parkeringsplass!</div>
										{parking.source == "osm" ?
											<div>
												<div>Amenity: {parking.amenity}</div>
												<div>Tilgang: {parking.access}</div>
												<div>Kilde: {parking.source}</div>
											</div>
										: null}
										{parking.source == "vegvesenet" ?
											<div>
												<div>Tilbyder: {parking.provider}</div>
												<div>Navn: {parking.name}</div>
												<div>Adresse: {parking.address}</div>
												<div>Antall betalte plasser: {parking.numberOfFeePlaces}</div>
												<div>Antall gratis plasser: {parking.numberOfFreePlaces}</div>
												<div>Antall ladestasjoner: {parking.numberOfChargingPlaces}</div>
												<div>Kilde: {parking.source}</div>
											</div>
										: null}
										<div>
											<button onClick={e => this._selectDestination(parking)}> Merk som mål </button>
										</div>
									</div>
								</Popup>
							</Marker> : null}
						</div>
						)) : null}

						{this.state.routingDestination ?
								<Marker position={this.state.routingDestination.geometry.coordinates.reverse()} icon={newMarkerIcon}>
								</Marker>
						: null}

						{this.state.routingStart ? <Marker position={this.state.routingStart.geometry.coordinates.reverse()} icon={newMarkerIcon}></Marker> : null}

					</Map>
				</MapContainer>
			</Container>
		);
	}
}

export default ReactLeafletMap;
