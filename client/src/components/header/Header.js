import React from "react";
import styled from "styled-components";
import logo from "./images/route.png";
import settings from "./images/settings.png";

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(58, 77, 109);
  padding-left: 10px;
  padding-right: 10px;
`;

const MainTitle = styled.h1`
  font-size: 2em;
  color: black;
`;

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`;

const SettingsImg = styled.img`
  width: 32px;
  height: 32px;
`;

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
