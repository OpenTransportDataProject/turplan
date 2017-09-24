import React, { Component } from 'react';
import './App.css';
import ReactLeafletMap from './components/map/Map.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>varde</h1>
      <div>
        <ReactLeafletMap>
        </ReactLeafletMap>
        </div>
      </div>

    );
  }
}

export default App;
