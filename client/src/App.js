import React, { Component } from 'react';
import './App.css';
import ReactLeafletMap from './components/map/Map.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>varde</h1>
      <ReactLeafletMap/>
      </div>

    );
  }
}

export default App;
