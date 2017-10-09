import React, { PureComponent } from "react";
import "./Menubar.css";

class Menubar extends PureComponent {

  render() {
    return (
      <div className="Menubar">
      <button onClick={this.props.findParkingLots.bind(this)}>
        Find Parking Lots
      </button>

      <button onClick={this.props.findChargingStations.bind(this)}>
        Find Charging Stations
      </button>

      </div>
    );
  }
}

export default Menubar;
