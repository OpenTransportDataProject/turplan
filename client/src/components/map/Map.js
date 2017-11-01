import React, { Component } from "react";
import Leaflet from "leaflet";
import axios from "axios";
import {newMarkerIcon} from '../../assets/markers';

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
			showParking: false,
			showCharging: false,
			hikesInView: []
		}
		this._onViewportChanged = this._onViewportChanged.bind(this);
	}

	async _onViewportChanged(){
		var bounds = this.refs.map.leafletElement.getBounds();

		this.state.hikesInView = this.state.showHikes ? await getHikes(bounds) : [];
		if(this.state.hikesInView) {
			var hikes = await getHikes(bounds) || [];
			this.setState({ hikesInView: hikes });
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
							defaultToggled={false} // todo: This could cause a potential bug. What if we decide to have hikes visible from the start??
							onToggle={(event, value) => {this.state.showHikes = value; this._onViewportChanged();}}
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

					</Map>
				</MapContainer>
			</Container>
		);
	}
}

export default ReactLeafletMap;
