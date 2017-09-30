import React from "react";
import styled from "styled-components";
import ntnu from "./images/ntnu_logo.png";
import sintef from "./images/sintef_logo.png";
import vegvesen from "./images/vegvesen_logo.png";

const FooterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(58, 77, 109);
  padding-left: 10px;
  padding-right: 10px;
`;

const FooterText = styled.p`
  font-size: 1em;
  color: black;
  padding: 10px;
`;

const CustomerContainer = styled.div`justify-content: center;`;

const NTNUImg = styled.img`
  height: 50px;
  padding-right: 100px;
`;

const SINTEFImg = styled.img`
  height: 50px;
  padding: 10px;
`;

const VegvesenImg = styled.img`
  height: 50px;
  padding: 10px;
`;

export function Footer() {
  return (
    <FooterContainer>
      <NTNUImg src={ntnu} alt="ntnu" />
      <FooterText>
        {
          "TDT4290 Kundestyrt Prosjekt i samarbeid med SINTEF og Statens Vegvesen"
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
