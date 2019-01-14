import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx'
import  '../../firebase';
import firebase from 'firebase';
import {dataprocess} from '../CSVdatauploader/datauploaderhelper';
import {checkDuplicateData} from '../CSVdatauploader/datauploaderhelper';
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

function writeUserData(databaseref, datatosend) {
    firebase.database().ref('/').once('value').then(function(snapshot) {
    console.log(databaseref);
    var temp = (snapshot.child(databaseref).val());
    if (temp === null) {
      firebase.database().ref(databaseref +'/').set(datatosend);
      console.log("data sent successfully");
      alert("You have written this data into " + databaseref + " successfully")
    }
   else {
     alert("This data is already existed, please push with a different data reference!")
   }
  })
}

class AltDatauploader extends Component {
  constructor(props) {
    super(props);
    this.state = {databaseref: ""};
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
      writeUserData(this.state.databaseref, tempjson);
    }
    else{
      alert("Please enter a name")
    }
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
                while(wb.SheetNames[i] != null)
                  {
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
              if(emptysheetwarning !== "")
              {
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
    render() {
    return (
      
      <div className="container-upload">
        <ReactFileReader handleFiles = {this.handleFiles} fileTypes={'.csv, .xlsx'} >
          <button>Upload New File</button>
        </ReactFileReader>

        <div className = "container-reference">
          <label>
            Push to database with Database Reference:  
              <input class="userInput"
                name='databaseref'
                value={this.state.databaseref}                        
                onChange={e => this.handleDatabaseChange(e)}/>
          </label>
          <button onClick={(e) => this.onSubmit(e)}>Send</button>
        </div>         
      </div>
    );
  }
}

export default AltDatauploader;
