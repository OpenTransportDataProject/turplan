import React from "react";
import ntnu from "./images/ntnu_logo.png";
import sintef from "./images/sintef_logo.png";
import vegvesen from "./images/vegvesen_logo.png";

import { FooterContainer, FooterText, CustomerContainer, NTNUImg, SINTEFImg, VegvesenImg } from './styles';

export function Footer() {
  return (
    <FooterContainer>
      <NTNUImg src={ntnu} alt="ntnu" />
      <FooterText>
        {
          "TDT4290 Kundestyrt Prosjekt i samarbeid med SINTEF Digital og Statens Vegvesen"
        }
      </FooterText>
      <CustomerContainer>
        <SINTEFImg src={sintef} alt="sintef" />
        <VegvesenImg src={vegvesen} alt="vegvesen" />{" "}
      </CustomerContainer>
    </FooterContainer>
  );
}

export default Footer;
