import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './Authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authentication />
      </div>
    );
  }
}

export default App;
