import ReactDOM from 'react-dom';
import {dataprocess} from './datauploaderhelper';
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

let noidsheet = [["defaultfield", "defaultfied"],["Unique Identifier Value"],[""]]
let twousersheet = [["defaultfield", "defaultfied"],["Unique Identifier Value", "time"],[123, "2018-05-26"],[233, "2018-05-27"]];
let optionsheet = [["Unique Identifier Value"],[233]];
let coursesheet = [["defaultfield", "defaultfied"],["Course Code"],[542]]
let tempjson1 = {};
let tempjson2 = {};
let tempjson3 = {};
let tempjson4 = {};
let expectjson1 = {"thissheet":[[{field:"Unique Identifier Value", value: "", index:0}]]};
let expectjson2 = {"thissheet2":[[{field:"Unique Identifier Value", value: 123, index:0},{field:"time",value: "2018-05-26", index:1}],
                                  [{field:"Unique Identifier Value", value: 233, index:0},{field:"time",value: "2018-05-27", index:1}]]};
let expectjson3 = {"Options Sheet":[[{field:"Unique Identifier Value", value: 233, index:0}]]};
let expectjson4 = {"LT Course Setup":[[{field:"Course Code", value: 542, index:0}]]};

test('noidesheet', () => {
    dataprocess(noidsheet,"thissheet",tempjson1,uniqueId1, uniqueId2,
    informationindex, emptysheetwarning,
    filteredStr, missingValue,
    rowFilterCutoff, colFilterCutoff)
    expect(tempjson1).toEqual(expectjson1);
    });

test('multiple value sheet', () => {
    dataprocess(twousersheet,"thissheet2",tempjson2, uniqueId1, uniqueId2,
    informationindex, emptysheetwarning,
    filteredStr, missingValue,
    rowFilterCutoff, colFilterCutoff )
    expect(tempjson2).toEqual(expectjson2);
    });
test('options sheet', () => {
    dataprocess(optionsheet,"Options Sheet",tempjson3, uniqueId1, uniqueId2,
    informationindex, emptysheetwarning,
    filteredStr, missingValue,
    rowFilterCutoff, colFilterCutoff )
    expect(tempjson3).toEqual(expectjson3);
    });
test('Course Sheet', () => {
    dataprocess(coursesheet,"LT Course Setup",tempjson4,uniqueId1, uniqueId2,
    informationindex, emptysheetwarning,
    filteredStr, missingValue,
    rowFilterCutoff, colFilterCutoff )
    expect(tempjson4).toEqual(expectjson4);
    });