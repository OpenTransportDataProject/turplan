import React, { Component } from 'react';
import './App.css';
import ReactLeafletMap from './components/map/Map.js';
import Header from './components/header/Header.js';


class App extends Component {
  render() {
    var map = <ReactLeafletMap/>;
    return (
      <div className="App">
      <Header/>
      {map}

      </div>

    );
  }
}

export default App;
