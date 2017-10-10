import React, {Component} from "react";
import styled from "styled-components";
import {Searchbar} from "../searchbar/Searchbar";

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
  padding: 10px;
`;

class LandingPage extends Component {

  render() {


  return (
    <ContentContainer>

      <SearchContainer>
        <Searchbar />
      </SearchContainer>

      {/*
      <SearchContainer>
        <Input placeholder="Søketekst" type="text" />
        <SearchButton>
          Søk etter sted
        </SearchButton>
      </SearchContainer>
      */}
      <MapButtonContainer>
        <MapButton onClick={this.props.swapComponent.bind(this)}>
          Gå til kart
        </MapButton>
      </MapButtonContainer>
    </ContentContainer>
  );
};
}

export default LandingPage;
