import React from "react";
import logo from "./images/route.png";
import settings from "./images/settings.png";

import { HeaderContainer, MainTitle, LogoImg, SettingsImg } from './HeaderStyles';

export function Header() {
  return (
    <HeaderContainer>
      <LogoImg src={logo} alt="logo" />
      <MainTitle>{"TopTrip"}</MainTitle>
      <SettingsImg
        src={settings}
        alt="settings"
        onClick={() => console.log("Klikket på innstillinger......")}
      />
    </HeaderContainer>
  );
}

export default Header;
