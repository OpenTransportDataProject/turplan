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
  constructor(){
      super();
      this.state={
        LandingPage:true
      };
      this.swapComponent = this.swapComponent.bind(this);
  }

  swapComponent(){
    this.setState({LandingPage:false});
  }


  render() {
    var headerToShow;
    var componentToShow;

    if (this.state.LandingPage) {
      headerToShow = <Header swapComponent={this.swapComponent}/>
      componentToShow = <LandingPage swapComponent={this.swapComponent}/>
    }
    else{
      headerToShow = <MapHeader/>
      componentToShow = <ReactLeafletMap/>
    }

    return (
      <Container className="App">

          {headerToShow}
          {componentToShow}
          <Footer />


      </Container>
    );
  }
}

export default App;
