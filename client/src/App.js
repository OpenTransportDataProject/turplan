import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';

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
        <LandingPage />
      </div>
    );
  }
}

export default App;
