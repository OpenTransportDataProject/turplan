import React from "react";
import {
  FooterContainer,
  FooterText,
  CustomerContainer,
  NTNUImg,
  SINTEFImg,
  VegvesenImg
} from "./FooterStyles";

export function Footer() {
  return (
    <FooterContainer>
      <NTNUImg src={"/images/ntnu_logo.png"} alt="ntnu" />
      <FooterText>
        {
          "TDT4290 Kundestyrt Prosjekt i samarbeid med SINTEF Digital og Statens Vegvesen"
        }
      </FooterText>
      <CustomerContainer>
        <SINTEFImg src={"/images/sintef_logo.png"} alt="sintef" />
        <VegvesenImg src={"/images/vegvesen_logo.png"} alt="vegvesen" />{" "}
      </CustomerContainer>
    </FooterContainer>
  );
}

export default Footer;
