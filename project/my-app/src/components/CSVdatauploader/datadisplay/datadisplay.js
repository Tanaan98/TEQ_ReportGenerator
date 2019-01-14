import React, { Component } from 'react';
import './datadisplay.css';
import  '../../../firebase';
import firebase from 'firebase';
import Reportgenerator from '../reportgenerator/reportgenerator.js';


//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
function writeUserData(databaseref, datatosend) {
  firebase.database().ref(databaseref +'/').set(datatosend);
  console.log("data sent successfully");
}

function composeSheetTable(sheetData){
  return sheetData[0].map(function(col, col_index){
    return (<div className="col-xs-4">
              <div style={{border:'1px solid black'}}> {col.field} </div>
              {sheetData.map(function(record, row_index){
                return(<div style={{border:'1px solid black'}}> {record[col_index].value === "" ? "N/A" : record[col_index].value} </div> )
              })
              }
            </div>)
  })
}

function TableList(props) {
    const items = props.tableContents;
    console.log(items)
    let tableList = []
    for (let sheetName in items) { 
        tableList.push(<div className="testimonial-group dataTable">
            <div className="row tableTitle">{sheetName}</div>
            <div className="row tableHeader">{composeSheetTable(items[sheetName])}</div> </div>)
    }

    return (<div style={{display:'inline-block', margin: '20px'}}> { tableList } </div>)
}




class DataDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {rawdata: null,
      databaseref: ""};
  }
  componentDidUpdate() {
    if (this.state.rawdata !== this.props.rawdata) {
      this.setState({
        rawdata: this.props.rawdata
      })
      console.log("I got an update")
    }
  }


  // handle input field change
  handleDatabaseChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state.databaseref);
  }
  // push data to database
  onSubmit = (e) => {
    if(this.state.databaseref !== "") {
      writeUserData(this.state.databaseref, this.props.rawdata);
      alert("You have written this data into " + this.state.databaseref + " successfully")
    }
    else{
      alert("Please enter a name")
    }
 }
    render() {
    return (
      <div>
        <div className ="container-reference">
          <label>
            Push to database with Database Reference:  
              <input class="userInput"
                name='databaseref'
                value={this.state.databaseref}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>
          <button onClick={(e) => this.onSubmit(e)}>Send</button>         
        </div>

        <Reportgenerator rawdata = {this.state.rawdata} />

        <TableList tableContents = {this.state.rawdata} />
        
      </div>
    );
  }
}

export default DataDisplay;
