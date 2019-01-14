import { filterData } from './filterdata.js';
import { formatAlert } from './formatalert.js';

//a helper function to sort json data
export function sortbyindex(sheetdata) {
    if (sheetdata != null) {
    for (var i = 0; i < sheetdata.length; i++) {
      sheetdata[i].sort(function(a, b) {
        return a.order - b.order})
      }
    }
    return sheetdata;
  }

// process the data that gives a good json structure for each unique user
export function dataprocess(data, sheetname, tempjson, uniqueId1, uniqueId2,
                            informationindex, emptysheetwarning,
                            filteredStr, missingValue, rowFilterCutoff,
                            colFilterCutoff) {
  console.log("processing " + sheetname);
  tempjson[sheetname] = [];
  //handle different primary key
  let uniqueId;
  if (sheetname === "Options Sheet"){
    uniqueId = uniqueId1;
    informationindex = 0;
  }
  else if (sheetname === "LT Course Setup") {
    uniqueId = uniqueId2;
    informationindex = 1;
  }
  else {
    uniqueId = uniqueId1;
    informationindex = 1;
  }
  var indexuniqueid = data[informationindex].indexOf(uniqueId);
  // arrays of true/false describing if any values are filtered
  var isFilteredRows = Array(data.length).fill(false);
  var isFilteredCols = Array(data[informationindex].length).fill(false);
  // construct data based on each header
  for (var i = informationindex + 1; i < data.length ;i++) {
    // check whether data exists
    if (data[i][indexuniqueid] != null) {
      // temp sub json data
      var jsondata = []
      for (var j = 0; j <= data[informationindex].length -1; j++){
        //data structure
        // {field: "name", value: "john", index: 1}
        //  first index is value, second is index
        var fieldUsed = data[informationindex][j];
        var valueUsed = filterData(fieldUsed, data[i][j], filteredStr);
        // check if value has been filtered
        if (valueUsed === filteredStr) {
          isFilteredRows[i] = true;
          isFilteredCols[j] = true;
          valueUsed = missingValue;
        }
        if (valueUsed == null) {
          valueUsed = missingValue;
        }
        jsondata.push({field: fieldUsed, value: valueUsed, index: j})
      }
      tempjson[sheetname].push(jsondata);
    }
  }
  // check if the sheet only has feature names, if yes, push empty sheet, update warning
  if (tempjson[sheetname].length === 0) {
    var emptysheetdata = []
      for (var k = 0; k <= data[informationindex].length-1;k++){
        emptysheetdata.push({field:data[informationindex][k], value: "", index: k})
      }
    tempjson[sheetname].push(emptysheetdata);
    emptysheetwarning +=  ", " + sheetname;
  }
  // Alert for any issues while filtering
  var alertStr = formatAlert(data[informationindex], sheetname,
                             isFilteredRows, isFilteredCols,
                             rowFilterCutoff, colFilterCutoff);
  if (alertStr != null) {
    alert(alertStr);
  }
  sortbyindex(tempjson.sheetname);
  // default reset will change later
}        

  
// Check for duplicate client/course data
export function checkDuplicateData(tempjson, uniqueId1, uniqueId2) {
  var duplicateAlert = "";
  // Loop through each sheet
  Object.keys(tempjson).forEach(function(key) {
    //  Loop through each row
    for (var row = 0; row < tempjson[key].length; row++) {
      // Get primary key of sheet
      var pk = "";
      if (key === "LT Course Setup") {
        pk = uniqueId2;
      } else {
        pk = uniqueId1;
      }
      var pkValue = getPrimaryKey(tempjson[key][row], pk);
      // Check if duplicate with pk of all rows after
      for (var rowAfter = row+1; rowAfter < tempjson[key].length; rowAfter++) {
        var pkValueAfter = getPrimaryKey(tempjson[key][rowAfter], pk);
        if (pkValue === pkValueAfter) {
          duplicateAlert += "Duplicate rows " + (row+1) + " and " + (rowAfter+1) + " in " + key + "\n";
        }
      }
    }
  });
  return duplicateAlert;
}
    
    
// Get pk of data row    
export function getPrimaryKey(rowData, pk) {
  var col = 0;
  while (col < rowData.length) {
    if (rowData[col].field === pk) {
      return rowData[col].value;
    }
    col++;
  }
}