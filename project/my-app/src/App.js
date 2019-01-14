import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from "react-router-dom"

import login from './components/login/login.js'
import main from './components/main/main.js'
import altuploader from './components/AltUploader/altuploader.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <BrowserRouter>
          <div>
            <Route path="/main" component={main} />
            <Route path="/" component={login} exact/>
            <Route path ='/alt' component = {altuploader} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;