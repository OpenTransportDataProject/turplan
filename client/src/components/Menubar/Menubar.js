import React, { PureComponent } from "react";
import styled from 'styled-components';

const MenuBar = styled.div`
  background-color: #d2e2f4;
  width:100%;
  position: absolute;
  bottom:0px;
  display:block;
  height:60px;
`;

const Button = styled.button`
  display: inline-block;
  background-color: #adc2db;
  width:30%;
  height:70%;
  margin-top:5px;
`;

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
