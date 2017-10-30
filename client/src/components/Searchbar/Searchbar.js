import React, { Component } from "react";
import { LandingPage } from "../Landing_page/LandingPage";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
//import { geocodeByAddress, geoCodeByPlaceId } from 'react-places-autocomplete';
import styled from "styled-components";
import ReactLeafletMap from "../Map/Map";

import { Container, ContentContainer, SearchButton, Form, SearchIcon } from "./SearchbarStyles";

// API key AIzaSyD-qhLT9q0SQV8EjT4wUivxtyS7K_CxMhM

export class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      lat: 63.417993,
      lng: 10.205758
    };

    this.onChange = address => this.setState({ address });
  }

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        //console.log('Success', latLng)
        this.setState({
          lat: latLng.lat,
          lng: latLng.lng
        })
      )
      .catch(error => console.error("Error", error));

  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then((
        latLng //console.log('Success', latLng)
      ) =>
        this.setState({
          address,
          lat: latLng.lat,
          lng: latLng.lng
        })
      )
      .catch(error => console.error("Error", error));
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    const myStyles = {
      root: {
        position: "relative",
        zIndex: "1"
      },
      input: {
        width: "80%"
      }
    };

    return (
      <Container>
        <Form onSubmit={this.handleFormSubmit}>
          <PlacesAutocomplete
            inputProps={inputProps}
            onSelect={address => this.handleSelect(address)}
            styles={myStyles}
          />
          {
            <SearchIcon
              onClick={() =>
                this.props.handleMap(this.state.lat, this.state.lng)}
            />
          }
        </Form>
      </Container>
    );
  }
}

export default Searchbar;
