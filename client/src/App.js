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
  render() {
    return (
      <Container className="App">
        <Header />
        <LandingPage />
        <Footer />
      </Container>
    );
  }
}

export default App;
