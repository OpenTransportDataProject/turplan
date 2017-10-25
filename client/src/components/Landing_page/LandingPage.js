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
                <InfoHeader>Finn parkeringsplasser</InfoHeader>
                <InfoText>I kartet kan du lett finne parkeringsplasser når du har aktivert parkering. Det hentes da inn informasjon fra to forskjellige kilder. Den første kilden, Open Street Map, er et api som inneholder parkeringsplasser lagt til av publikum. Disse kan mangele noe info om begrensinger, men det er lagt til store mengder data. De andre kilden er fra Statens Vegvesen, og disse inneholder mer info om begrensinger, men det er bare et lite subset av alle norges parkeringsplasser i dette registeret. Punktene lar seg ikke slå sammen, da de er registret på forskjellige måter.</InfoText>
              </Info>
              <Image imageUrl={"images/karteksempel.jpg"}/>
            </Row>
            <Row>
              <Image imageUrl={"images/lade.jpg"}/>
              <Info>
                <InfoHeader>Finn ladestasjon</InfoHeader>
                <InfoText>Ladestasjonene som er tilgjengelige i vårt kart er en kombinasjon av Open Street Map og Nobil Transnova's api. Sistnevnte samarbeider med elbilforeningen og har et ganske komplett bilde av alle norges ladestasjoner for elbil. Disse er utgangspunktet for vår applikasjon. Der det finnes ekstra fra Open Street Map har disse blitt lagt til, hvis ikke har vi valgt å vise Nobil's stasjoner. </InfoText>
              </Info>
            </Row>
            <Row>
              <Info>
                <InfoHeader>Finn turer</InfoHeader>
                <InfoText>Denne applikasjonen samler tur-informasjon fra Nasjonalturbase. Da denne var strukturert litt uhelig for vårt bruk, har vi lastet ned et subset av deres turer for å vise i vår applikasjon. </InfoText>
              </Info>
                <Image imageUrl={"images/tur.jpg"}/>
            </Row>
            <Row>
              <Image imageUrl={"images/kart.jpg"}/>
              <Info>
                <InfoHeader>Våre kart</InfoHeader>
                <InfoText>Vi benytter leaflet som basis for å vise kart-data og markere, med kartblad hentet ut fra statkart. </InfoText>
              </Info>
            </Row>
          </PageInfoContainer>
          <PageContentHeader>
            <h1>Api og datakilder</h1>
            <ul>
            <li>Nobil Transnova</li>
            <li>Open Street Map</li>
            <li>Statens vegvesen's parkeringsregister</li>
            <li>Google places</li>
            <li>Nasjonalturbase</li>
            <li>Leaflet</li>
            <li>Statkart/Kartverket/Norgeskart</li>

            </ul>
          </PageContentHeader>
          </PageContentContainer>
        <Footer />
      </ContentContainer>
    );
  }
}

export default LandingPage;
