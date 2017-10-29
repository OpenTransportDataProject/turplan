import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { InfoError } from "./MapStyles";

export default class DialogExampleAlert extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <InfoError onClick={this.handleOpen}/>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Zoom inn for at informasjonen i kartet skal oppdatere seg automatisk.
        </Dialog>
      </div>
    );
  }
}
