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
  Image,
  List
} from "./LandingPageStyles";

//<PageBanner src={"images/tursti.jpg"}/>
class LandingPage extends Component {
  render() {
    return (
      <ContentContainer>
        <Header swapComponent={this.props.swapComponent.bind(this)} />
        <PageContentContainer>
          <PageContentHeader>
            Denne siden er laget i samarbeid med Statens Vegvesen, Sintef
            Digital og studenter ved NTNU i forbindelse med emnet "Kundestyrt
            prosjekt" høsten 2017.
          </PageContentHeader>
          <PageInfoContainer>
            <Row>
              <Info>
                <InfoHeader>Finn parkeringsplasser</InfoHeader>
                <InfoText>
                  I kartet kan du lett finne parkeringsplasser når du har
                  aktivert parkering. Det hentes da inn informasjon fra to
                  forskjellige kilder. Den første kilden, Open Street Map, er et
                  api som inneholder parkeringsplasser lagt til av publikum.
                  Disse kan mangle noe info om begrensinger, men det er lagt
                  til store mengder data. De andre kilden er fra Statens
                  Vegvesen, og disse inneholder mer info om begrensinger, men
                  det er bare et lite subset av alle norges parkeringsplasser i
                  dette registeret. Punktene lar seg ikke slå sammen, da de er
                  registret på forskjellige måter.
                </InfoText>
              </Info>
              <Image imageUrl={"images/karteksempel.jpg"} />
            </Row>
            <Row>
              <Image imageUrl={"images/lade.jpg"} />
              <Info>
                <InfoHeader>Finn ladestasjon</InfoHeader>
                <InfoText>
                  Ladestasjonene som er tilgjengelige i vårt kart er en
                  kombinasjon av Open Street Map og Nobil Transnova's api.
                  Sistnevnte samarbeider med elbilforeningen og har et ganske
                  komplett bilde av alle norges ladestasjoner for elbil. Disse
                  er utgangspunktet for vår applikasjon. Der det finnes ekstra
                  fra Open Street Map har disse blitt lagt til, hvis ikke har vi
                  valgt å vise Nobil's stasjoner.{" "}
                </InfoText>
              </Info>
            </Row>
            <Row>
              <Info>
                <InfoHeader>Finn turer</InfoHeader>
                <InfoText>
                  Denne applikasjonen samler tur-informasjon fra
                  Nasjonalturbase. Da denne var strukturert litt uhelig for vårt
                  bruk, har vi lastet ned et subset av deres turer for å vise i
                  vår applikasjon.{" "}
                </InfoText>
              </Info>
              <Image imageUrl={"images/tur.jpg"} />
            </Row>
            <Row>
              <Image imageUrl={"images/path.jpg"} />
              <Info>
                <InfoHeader>Finn en rute</InfoHeader>
                <InfoText>
                  For å finne en rute mellom punkter, benytter vi "Leaflet Routing Machine". I dette stadiet
                  av applikasjonen, må ting gjøres i en bestemt rekkefølge for å fungere. Det første du trenger er
                  en destinasjon. Du kan sette denne ved å klikke på markøren til enten en parkeringsplass eller
                  ladestasjon, og så sette denne som ditt startpunkt. Videre klikker du på kartet dit du ønsker å reise fra.
                  Da vil det automatisk genereres en rute fra ditt selvvalgte punkt på kartet til den valgte markøren, og du
                  får opp en veibeskrivelse (på engelsk).{" "}
                </InfoText>
              </Info>
            </Row>
            <Row>

              <Info>
                <InfoHeader>Våre kart</InfoHeader>
                <InfoText>
                  Vi benytter leaflet som basis for å vise kart-data og markere,
                  med kartblad hentet ut fra statkart.{" "}
                </InfoText>
              </Info>
                <Image imageUrl={"images/kart.jpg"} />
            </Row>
          </PageInfoContainer>
          <PageContentHeader>
            <h1>Api og datakilder</h1>
            <List>
              <li>Nobil Transnova</li>
              <li>Open Street Map</li>
              <li>Parkeringsregisteret, Statens Vegvesen</li>
              <li>Google Places</li>
              <li>Nasjonal Turbase</li>
              <li>Leaflet routing machine</li>
              <li>Leaflet</li>
              <li>Statkart/Kartverket/Norgeskart</li>
            </List>
          </PageContentHeader>
        </PageContentContainer>
        <Footer />
      </ContentContainer>
    );
  }
}

export default LandingPage;
