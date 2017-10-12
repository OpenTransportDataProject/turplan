import React, {Component} from "react";

import {
  ContentContainer,
  SearchButton,
  MapButton,
  Input,
  SearchContainer,
  MapButtonContainer } from './LandingPageStyles';

class LandingPage extends Component {

  render() {


  return (
    <ContentContainer>
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
