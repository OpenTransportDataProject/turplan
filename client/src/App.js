import React, { Component } from 'react';
import './App.css';
import ReactLeafletMap from './components/map/Map.js';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <div>
        <ReactLeafletMap>
        </ReactLeafletMap>
        </div>
      </div>

    );
  }
}

export default App;
