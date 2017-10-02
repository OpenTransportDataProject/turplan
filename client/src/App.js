import React, { Component } from "react";
import ReactLeafletMap from "./components/Map";
import LandingPage from "./components/LandingPage";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
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
        <LandingPage />
      </Container>
    );
  }
}

export default App;
