import React, { Component } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import {
  ContentContainer,
  SearchButton,
  MapButton,
  Input,
  SearchContainer,
  PageContent,
  PageBanner,
  MapBanner,
  Divider
} from "./LandingPageStyles";

//<PageBanner src={"images/tursti.jpg"}/>
class LandingPage extends Component {
  render() {
    return (
      <ContentContainer>
        <Header swapComponent={this.props.swapComponent.bind(this)}/>
        <PageContent>
        <p>Denne siden er laget i samarbeid med Statens Vegvesen, Sintef Digital og studenter ved NTNU i forbindelse med emnet "Kundestyrt prosjekt" høsten 2017.</p>
        <Divider/>
          <MapBanner>
            <MapButton onClick={this.props.swapComponent.bind(this)}>
              Gå til kart
            </MapButton>
          </MapBanner>

          </PageContent>
        <Footer />
      </ContentContainer>
    );
  }
}

export default LandingPage;
