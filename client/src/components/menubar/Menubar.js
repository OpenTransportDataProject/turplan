
import React, { PureComponent } from 'react';
import Leaflet from 'leaflet';
import './Menubar.css';

class Menubar extends PureComponent {

  findParkingLots(){
    alert("Clickety click");
  }

  constructor(props){
    super(props);
    this.findParkingLots = this.findParkingLots.bind(this);
    
  }


  render() {
    return (
      <div className="Menubar">
        <button onClick={this.findParkingLots}>Press Me</button>
      </div>
    );
  }
}

export default Menubar;
