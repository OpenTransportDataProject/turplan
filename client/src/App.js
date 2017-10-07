import React, { Component } from "react";
import ReactLeafletMap from "./components/map";
import LandingPage from "./components/landing_page";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
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

    var componentToShow;
    if (this.state.LandingPage) {
      componentToShow = <LandingPage swapComponent={this.swapComponent} />
    }
    else{
      componentToShow = <ReactLeafletMap/>
    }

    return (
      <Container className="App">
        <Header />

          {componentToShow}


        <Footer />
      </Container>
    );
  }
}

export default App;
