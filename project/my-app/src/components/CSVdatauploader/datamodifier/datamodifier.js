import React, { Component } from 'react';
import {findField} from '../findfield.js';
import  '../../../firebase';
import firebase from 'firebase';

// a temp datafile 
var tempjsonToEdit = null;

function editUserData(databaseref) {
  // read data into tempjsonToEdit
  firebase.database().ref('/').once('value').then(function(snapshot) {
    tempjsonToEdit = (snapshot.child(databaseref).val());
    alert("Database reference for on-site modification set to "+ databaseref);
  });
}

class DataModifier extends Component {
  constructor(props) {
    super(props);
    this.state = {databaseref: null, sheet: null, person: null, field: null, newValue: null}
  }

  // the following will handle the change on the input and push corresponding data name to database
  handleDatabaseChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state.databaseref);
  }

  setDataRef =() => {
    editUserData(this.state.databaseref);
  }

  modifyData =() => {
    // check that databaseref is valid
    if (tempjsonToEdit === null) {
      alert("Invalid database reference");
      return null;
    }
    // check that sheet, person, and field are valid
    if (tempjsonToEdit[this.state.sheet] === null ||
          tempjsonToEdit[this.state.sheet] === undefined) {
      alert("Sheet " + this.state.sheet + " not found for reference " + this.state.databaseref);
      return null;
    }
    var personArray = tempjsonToEdit[this.state.sheet][this.state.person];
    if (personArray === null || personArray === undefined) {
      alert(this.state.person + " not found in sheet " + this.state.sheet);
      return null;
    }
    var fieldIndex = findField(personArray, this.state.field);
    if (fieldIndex === null || fieldIndex === undefined) {
      alert("Field " + this.state.field + " not found for person " + this.state.person);
      return null;
    }
    // change tempjsonToEdit to have new value
    tempjsonToEdit[this.state.sheet][this.state.person][fieldIndex["index"]]["value"] = this.state.newValue;
    // push data back
    firebase.database().ref(this.state.databaseref +'/').set(tempjsonToEdit);
    alert(this.state.field + " changed to " + this.state.newValue);
  }
  
  render() {
    return (
      
      <div className="Data Modifier">
        <h3>Modify the data:</h3>
        <p><label className="userLable">
          Data reference: 
            <input class="userInput"
              name='databaseref'
              value={this.state.databaseref}                        
              onChange={e => this.handleDatabaseChange(e)}/>
          <button className ="setdatarefbtn" onClick={this.setDataRef}>Use data reference</button>    
        </label></p>

        <p>
          <label className="userLable">
            Sheet: 
              <input class="userInput"
                name='sheet'
                value={this.state.sheet}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>

          <label className="userLable">
            Index of person: 
              <input class="userInput"
                name='person'
                value={this.state.person}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>

          <label className="userLable">
            Field: 
              <input class="userInput"
                name='field'
                value={this.state.field}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>

          <label className="userLable">
            New Value: 
              <input class="userInput"
                name='newValue'
                value={this.state.newValue}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>
        
          <button className = 'modifybtn' onClick = {this.modifyData}>Modify Data</button>
        </p>
      </div>
    );
  }
}

export default DataModifier;
