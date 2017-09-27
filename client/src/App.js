import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <Container className="App">
        <LandingPage />
      </Container>
    );
  }
}

export default App;
