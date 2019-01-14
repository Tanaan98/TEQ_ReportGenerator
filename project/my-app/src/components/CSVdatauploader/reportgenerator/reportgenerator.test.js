import ReactDOM from 'react-dom';
import {countfield} from './reportgeneratorhelper'
let initialtime = [["time", "2018-12", "2018-11", "2018-10","2018-09","2018-08"]];
let expectjson = {"Options Sheet":[[{field:"Unique Identifier Value", value: "something", index:0}]]};
let expectjson2 = {"thissheet2":[[{field:"Unique Identifier Value", value: 123, index:0},{field:"time",value: "2018-09-20", index:1}],
[{field:"Unique Identifier Value", value: 233, index:0},{field:"time",value: "2018-08-20", index:1}]]};

test('default', () => {
    expect(countfield(expectjson, 0, "Options Sheet", "Unique Identifier Value", "something", [])).toEqual(["number of Options Sheet Unique Identifier Value"]);
    });

test('two rows', () => {
    expect(countfield(expectjson2,1 , "thissheet2", "time", "2018-05-27", initialtime[0])).toEqual(["number of thissheet2 time",0, 0, 0,1,1]);
    });
