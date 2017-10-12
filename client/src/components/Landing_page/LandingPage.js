import React, { Component } from "react";
import styled from "styled-components";
import Searchbar from "../Searchbar/Searchbar.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import {
  ContentContainer,
  SearchButton,
  MapButton,
  Input,
  SearchContainer,
  MapButtonContainer
} from "./LandingPageStyles";

class LandingPage extends Component {
  render() {
    return (
      <ContentContainer>
        <Header />
        {/*
      <SearchContainer>
        <Input placeholder="Søketekst" type="text" />
        <SearchButton>
          Søk etter sted
        </SearchButton>
      </SearchContainer>
      */}
        <MapButtonContainer>
          <MapButton onClick={this.props.swapComponent.bind(this)}>
            Gå til kart
          </MapButton>
        </MapButtonContainer>
        <Footer />
      </ContentContainer>
    );
  }
}

export default LandingPage;
