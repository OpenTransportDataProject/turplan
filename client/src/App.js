import React, { Component } from "react";
import ReactLeafletMap from "./components/Map";
import LandingPage from "./components/Landing_page/LandingPage.js";
import styled from "styled-components";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./App.css";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #eee;
`;

class App extends Component {
  constructor() {
    super();
    console.log(process.env);
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
    return <MuiThemeProvider><Container className="App">{componentToShow}</Container></MuiThemeProvider>;
  }
}

export default App;
