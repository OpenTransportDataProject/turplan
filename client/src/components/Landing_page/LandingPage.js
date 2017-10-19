import React, { Component } from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import {
  ContentContainer,
  SearchButton,
  MapButton,
  Input,
  SearchContainer,
  PageContentContainer,
  PageContentHeader,
  PageBanner,
  Row,
  PageInfoContainer,
  Info,
  InfoHeader,
  InfoText,
  Image
} from "./LandingPageStyles";

//<PageBanner src={"images/tursti.jpg"}/>
class LandingPage extends Component {
  render() {
    return (
      <ContentContainer>
        <Header swapComponent={this.props.swapComponent.bind(this)}/>
        <PageContentContainer>
          <PageContentHeader>
            Denne siden er laget i samarbeid med Statens Vegvesen,
            Sintef Digital og studenter ved NTNU i forbindelse med emnet "Kundestyrt prosjekt" høsten 2017.
          </PageContentHeader>
          <PageInfoContainer>
            <Row>
              <Info>
                <InfoHeader>Finn Ladestasjon</InfoHeader>
                <InfoText>Lorem Ipsum bifbwb eifbnwfi ipbeifb i</InfoText>
              </Info>
              <Image imageUrl={"images/karteksempel.jpg"}/>
            </Row>
            <Row>
              <Image imageUrl={"images/karteksempel.jpg"}/>
              <Info>
                <InfoHeader>Finn Parkeringsplasser</InfoHeader>
                <InfoText>Lorem Ipsum bifbwb eifbnwfi ipbeifb i</InfoText>
              </Info>
            </Row>
          </PageInfoContainer>
          </PageContentContainer>
        <Footer />
      </ContentContainer>
    );
  }
}

export default LandingPage;
