import React, { PureComponent } from "react";

import { MenuBar, Button } from "./MenubarStyles";

class Menubar extends PureComponent {
  render() {
    return (
      <MenuBar>
        <Button onClick={this.props.findParkingLots.bind(this)}>
          Finn parkeringsplass
        </Button>

        <Button onClick={this.props.findChargingStations.bind(this)}>
          Finn ladestasjon
        </Button>

        <Button onClick={this.props.findNobilChargingStations.bind(this)}>
          Finn nobil ladestasjon
        </Button>
      </MenuBar>
    );
  }
}

export default Menubar;
