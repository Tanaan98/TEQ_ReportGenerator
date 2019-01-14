import React, { Component } from 'react';
import './main.css';
import Datauploader from '../CSVdatauploader/datauploader.js'


class Main extends Component {
  render() {
    return (
      <div>
        <div class="Title">
          TEQ Dashboard
        </div>

        <Datauploader />
        
      </div>
    );
  }
}

export default Main;