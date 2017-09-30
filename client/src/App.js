import React, { Component } from 'react';
import './App.css';
import ReactLeafletMap from './components/map/Map.js';
import Header from './components/header/Header.js';
import Menubar from './components/menubar/Menubar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      <ReactLeafletMap/>
      <Menubar/>
      </div>

    );
  }
}

export default App;
