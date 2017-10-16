import React, { PureComponent } from "react";

import { MenuBar, Button } from "./MenubarStyles";

class Menubar extends PureComponent {
  render() {
    return (
      <MenuBar>
        <Button onClick={this.props.findParkingLots.bind(this)}>
          Find Parking Lots
        </Button>

        <Button onClick={this.props.findChargingStations.bind(this)}>
          Find Charging Stations
        </Button>
      </MenuBar>
    );
  }
}

export default Menubar;
