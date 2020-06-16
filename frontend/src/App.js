import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import Home from './pages/home.js';
import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.root_dir = process.env.PUBLIC_URL;
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route basename={this.root_dir} exact path={[`${process.env.PUBLIC_URL}/`,
           `${process.env.PUBLIC_URL}/home`]} component={Home} />
        <BrowserRouter />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
