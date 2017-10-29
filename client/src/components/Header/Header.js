import React, { Component } from "react";
import {
  HeaderContainer,
  MainTitle,
  PromoText,
  MapButton
} from "./HeaderStyles";

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <MainTitle>Turplan</MainTitle>
        <PromoText>
          <h2>Her kan du finne turer og parkering</h2>
          <p>
            Nå kan du lett finne turer i ditt nærområde og planlegge turen dit.
            Her kan du hente ut parkeringsplasser og ladestasjoner til elbil ved
            noen få tastetrykk.{" "}
          </p>
          <MapButton onClick={this.props.swapComponent.bind(this)}>
            Gå til kart
          </MapButton>
        </PromoText>
      </HeaderContainer>
    );
  }
}

export default Header;
