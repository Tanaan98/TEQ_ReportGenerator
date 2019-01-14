import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx'
import DataDisplay from './datadisplay/datadisplay.js';
import DataModifier from './datamodifier/datamodifier.js';
import  '../../firebase';
import firebase from 'firebase';
import {dataprocess} from './datauploaderhelper';
import {checkDuplicateData} from './datauploaderhelper';
// create constant to use
// this gives the data existance indicator
const uniqueId1 = "Unique Identifier Value";
const uniqueId2 = "Course Code"
// this gives the row where header is 
let informationindex;
var emptysheetwarning = "";

// string that signifies a value is incorrect when filtering
// this string should not reasonably appear in the data
const filteredStr = "placeholderFilteredString";
// value used for missing or filtered out data
const missingValue = "";
// number of rows and columns described in filter alert before cutting off
const rowFilterCutoff = 4;
const colFilterCutoff = 3;

// a temp datafile 
var tempjson = 
{
};

function ReadUserData(databaseref) {
  firebase.database().ref('/').once('value').then(function(snapshot) {
  console.log(databaseref);
  var temp = (snapshot.child(databaseref).val());
  if(temp == null){
    alert("The data reference does not exist, please try with a different name");
    console.log(temp);
  }
  else{
    alert("data loaded")
    tempjson = temp;
  }
  })
}

class Datauploader extends Component {
  constructor(props) {
    super(props);
    this.state = {rawdata: null,
                  databaseref: ""};
   }
  
  senddata =() => {
    this.setState({
      rawdata: tempjson
    })
  }

  handleFiles = (files) => {
          // Check for the varioustempjsonAPI support.
          if (window.FileReader) {
            if (files != null) {
              let reader = new FileReader();
              reader.onload = function(e) {
                tempjson = {};
                // Use reader.result
                const bstr = reader.result;
                const wb = XLSX.read(bstr, {type:'binary'});
                /* Get all worksheets */
                let i = 1;
                while(wb.SheetNames[i] != null) {
                    const wsname = wb.SheetNames[i];
                    const ws = wb.Sheets[wsname];
                    /* Convert array of arrays */
                    const data = XLSX.utils.sheet_to_json(ws, {raw: true, header:1, range:1});
                    /* Update state */
                    dataprocess(data, wsname, tempjson, uniqueId1, uniqueId2,
                                informationindex, emptysheetwarning,
                                filteredStr, missingValue,
                                rowFilterCutoff, colFilterCutoff);
                    i++;
                  }
              let dup = checkDuplicateData(tempjson,uniqueId1,uniqueId2);
              if(dup !== ''){
                alert(dup);
              }
              // warn user about empty sheets
              if(emptysheetwarning !== "") {
                emptysheetwarning += " are empty";
                alert(emptysheetwarning);
                emptysheetwarning = "";
              }
              console.log(tempjson);
          }
          reader.readAsBinaryString(files[0]);
        }
      }
    }


    // the following will handle the change on the input and push corresbonding data name to database
    
    handleDatabaseChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
      console.log(this.state.databaseref);
    }

    onSubmit = (e) => {
      if(this.state.databaseref !== "") {
        ReadUserData(this.state.databaseref);
      }
      else{
        alert("Please enter a name")
      }
   }



  render() {
    return (
      
      <div className="container-upload">

        <ReactFileReader handleFiles = {this.handleFiles} fileTypes={'.csv, .xlsx'} >
          <button>Upload New File</button>
        </ReactFileReader>

        <div className="container-reference">

          <label>
            Enter Data Reference to get the data from database: 
              <input class="userInput"
                name='databaseref'
                value={this.state.databaseref}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>

          <button onClick={(e) => this.onSubmit(e)}>Get Data</button> 

        </div>

        <button onClick = {this.senddata}>Data Display</button>

        <DataDisplay rawdata = {this.state.rawdata}/>

        <DataModifier modifyingdata = {this.state.rawdata}/>
      </div>
    );
  }
}

export default Datauploader;
