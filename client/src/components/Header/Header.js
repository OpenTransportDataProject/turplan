import React, { Component } from "react";
import logo from "./images/route.png";
import settings from "./images/settings.png";

import {
  HeaderContainer,
  MainTitle,
  LogoImg,
  SettingsImg,
  PromoText,
  MapButton
} from "./HeaderStyles";

//<LogoImg src={logo} alt="logo" />
/* <SettingsImg
  src={settings}
  alt="settings"
  onClick={() => console.log("Klikket på innstillinger......")}
/>*/

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <MainTitle>Turplan</MainTitle>
        <PromoText>
          <h2>Her kan du finne turer og parkering</h2>
          <p>Nå kan du lett finne turer i ditt nærområde og planlegge turen dit. Her kan du hente ut parkeringsplasser og ladestasjoner til elbil ved noen få tastetrykk.  </p>
          <MapButton onClick={this.props.swapComponent.bind(this)}>
            Gå til kart
          </MapButton>
        </PromoText>

      </HeaderContainer>
    );
  }
}

export default Header;
