import React, { PureComponent } from "react";
import "./Menubar.css";

class Menubar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Menubar">
        <button onClick={this.props.findParkingLots.bind(this)}>
          Press Me
        </button>
      </div>
    );
  }
}

export default Menubar;
