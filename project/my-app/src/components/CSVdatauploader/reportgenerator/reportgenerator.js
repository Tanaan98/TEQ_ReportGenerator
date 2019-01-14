import React, { Component } from 'react';
import {countfield} from './reportgeneratorhelper';
import {formatdata} from './reportgeneratorhelper'
import CsvDownloader from 'react-csv-downloader';
import {countagefield} from './reportgeneratorhelper';

class Reportgenerator extends Component {
    constructor(props) {
        super(props);
        this.initialreportbytime = [["time", "2018-12", "2018-11", "2018-10","2018-09","2018-08","2018-07","2018-06","2018-05","2018-04","2018-03","2018-02","2018-01"]];
        this.agearray = [[0,20],[21,25],[26,30],[31,35],[36,40],[40,50],[50,60],[60,70],[70,200]];
        this.intitialreportbyage = [["age","0-20","21-25","26-30","31-35","36-40","40-50","50-60","60-70","70+"]]
        this.intitialreportbygender = ["gender", "male", "female"]
        this.state = {finalreport: []};
        this.timeargumentlist =[
          {sheet: "Needs Assessment&Referrals", field: "Referred By", option: ""},
          {sheet: "Needs Assessment&Referrals", field: "Type of Institution/Organization Where Client Received Services", option: ""},
          {sheet: "Community Connections", field: "Referred By", option: ""},
          {sheet: "Community Connections", field: "Activity Under Which Client Received Services", option: ""},
          {sheet: "Info&Orien", field: "Referred By", option: ""},
          {sheet: "Info&Orien", field: "Services Received", option: ""},
          {sheet: "Employment", field: "A referral to", option: ""},
          {sheet: "Employment", field: "Postal Code where the service was received", option: ""},
          {sheet: "LT Client Enrol", field: "Support services received", option: ""},
          {sheet: "LT Client Enrol", field: "Postal Code where the service was received", option: ""}
        ];
        this.ageargumentlist = [
          {sheet: "Needs Assessment&Referrals", field: "Referred By", option: ""},
          {sheet: "Needs Assessment&Referrals", field: "Type of Institution/Organization Where Client Received Services", option: ""},
          {sheet: "Community Connections", field: "Referred By", option: ""},
          {sheet: "Community Connections", field: "Activity Under Which Client Received Services", option: ""},
          {sheet: "Info&Orien", field: "Referred By", option: ""},
          {sheet: "Info&Orien", field: "Services Received", option: ""},
          {sheet: "Employment", field: "A referral to", option: ""},
          {sheet: "Employment", field: "Postal Code where the service was received", option: ""},
          {sheet: "LT Client Enrol", field: "Support services received", option: ""},
          {sheet: "LT Client Enrol", field: "Postal Code where the service was received", option: ""}
                            ];
        this.genderagumentlist = [

        ];
    }

    // click to to generate the report and render it into the csvdownloader to download 
    displaydata=() => {
      if(this.props.rawdata !== null){
        let temp = [[]];
        temp[0] = this.initialreportbytime[0];
        let row;
        for(let i = 0; i < this.timeargumentlist.length; i++){
           row = countfield(this.props.rawdata, 0, this.timeargumentlist[i].sheet, this.timeargumentlist[i].field, this.timeargumentlist[i].option, this.initialreportbytime[0]); 
           temp.push(row);
        }
        temp.push([]);
        temp.push(this.intitialreportbyage[0]);
        for(let k = 0; k < this.ageargumentlist.length;k++){
          row = countagefield(this.props.rawdata, 4, this.ageargumentlist[k].sheet, this.ageargumentlist[k].field, this.ageargumentlist[k].option, this.agearray);
          temp.push(row);
        }
        let tempdata = formatdata(temp);
        console.log(tempdata);
        this.setState({
          finalreport:tempdata
        })
        alert("Report generated");
        }
    }

    render() {
      return (
        <div className="Reportgenerator">
            <button className = 'btn' onClick = {this.displaydata}>Generate report</button>
            
            <CsvDownloader 
            filename="myfile"
            datas={this.state.finalreport}
            text="Download" />
            
      </div>
      );
    }
  }
  
  export default Reportgenerator;
