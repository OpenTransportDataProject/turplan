import React from "react";
import styled from "styled-components";
import Header from "./Header.js";
import Footer from "./Footer.js";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  background-color: rgb(144, 173, 204);
`;

const SearchButton = styled.button`
  display: inline-block;
  padding: 5px;
  font-size: 1em;
  background-color: rgb(86, 115, 163);
  border: 2px solid rgb(58, 77, 109);
  border-radius: 2px;
  margin-left: 10px;
`;

const MapButton = styled.button`
  display: inline-block;
  padding: 20px;
  font-size: 1em;
  background-color: rgb(86, 115, 163);
  border: 2px solid rgb(58, 77, 109);
  border-radius: 2px;
`;

const Input = styled.input`
  width: 30%;
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 10px;
`;

const SearchContainer = styled.div`
  flex: 7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const MapButtonContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
`;

export const LandingPage = () => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <SearchContainer>
          <Input placeholder="Søketekst" type="text" />
          <SearchButton
            onClick={() => console.log("Skal søke etter sted her...")}
          >
            Søk etter sted
          </SearchButton>
        </SearchContainer>
        <MapButtonContainer>
          <MapButton onClick={() => console.log("Skal gå til kart her...")}>
            Gå til kart
          </MapButton>
        </MapButtonContainer>
      </ContentContainer>
      <Footer />
    </Container>
  );
};

export default LandingPage;
