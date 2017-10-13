import React, { Component } from "react";
import ReactLeafletMap from "./components/Map";
import LandingPage from "./components/Landing_page";
import Header from "./components/Header/Header.js";
import MapHeader from "./components/Header/MapHeader.js";
import Footer from "./components/Footer/Footer.js";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      LandingPage: true
    };
    this.swapComponent = this.swapComponent.bind(this);
  }

  swapComponent() {
    this.setState({ LandingPage: false });
  }

  render() {
    var componentToShow;

    if (this.state.LandingPage) {
      componentToShow = <LandingPage swapComponent={this.swapComponent} />;
    } else {
      componentToShow = <ReactLeafletMap />;
    }
    return <Container className="App">{componentToShow}</Container>;
  }
}

export default App;
