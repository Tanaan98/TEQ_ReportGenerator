import {findField} from './../findfield.js';

// interate through data and get the count the number of corresponding in the field
export function countfield(data,timestampindex, sheet, inputfield, option, date) {
    let currsheet = data[sheet];
    if(currsheet === undefined){
        return [];
    }
    console.log(currsheet);
    let field = inputfield.replace(/,/g, ' ');
    let sheetname = "number of " + sheet + ' ' + inputfield;
    let dataarray = [sheetname];
    // loop through each date
    let count = 0;
    
    for(let g =1 ;g < date.length; g++){
        // this gives a special structure such that we know that it contains a date as substring
        let dateveri = date[g];
        // loop through each person
        for(let i = 0; i < currsheet.length; i++){
            let timestamp = currsheet[i][timestampindex].value;
            if(timestamp !== undefined){
                if(timestamp.includes(dateveri)){
                // check whether an option is given
                    let curr_field = findField(currsheet[i], field);
                    if(curr_field !== null ){
                        if(option !== null){
                            if(curr_field.value === null){
                                curr_field.value = "";
                            }
                            if(curr_field.value.length > 0)
                            {
                                // update count
                                count++;
                            }
                        }
                        else{
                            count++;
                        }
                    }
                }
            }        
        }
    
    dataarray.push(count);
    count = 0;
    dateveri ='';
    }
return dataarray;
}

// format the data so it fits the requirement for csvdownloader
export function formatdata(array){
    let output = [];
    for(let i= 0; i < array.length; i++){
        let row = {};
        for(let k = 0; k < array[i].length; k++){
            row[k] = array[i][k]
        }
        output.push(row);
    }
    return output;
}

function checkage(agearray){
    let newagearray = []
    for(let i = agearray[0]; i < agearray[1];i++){
        newagearray.push(i);
    }
    return newagearray
}

//helper to get age based on birthday
function getage(birth, thisyear){
    let age;
    if(birth === undefined){
        return 0;
    }
    age = parseInt(birth.substr(0, birth.indexOf('-')));
    console.log(thisyear - age);
    return thisyear - age; 
}

// get the data based on age
export function countagefield(data,timestampindex, sheet, inputfield, option, agearray) {
    let currsheet = data[sheet];
    if(currsheet === undefined){
        return [];
    }
    let field = inputfield.replace(/,/g, ' ');
    let sheetname = "number of " + sheet + ' ';
    let dataarray = [sheetname];
    // loop through each age
    let count = 0;
    for(let g =0 ;g < agearray.length; g++){
        // this gives a special structure such that we know that it contains a date as substring
        let range = checkage(agearray[g]);
        // loop through each person
        for(let i = 0; i < currsheet.length; i++){
            for(let p = 0; p < range.length; p++){
                let timestamp = getage(currsheet[i][timestampindex].value, 2018);
                if(timestamp !== undefined){
                    if(timestamp == range[p]){
                    // check whether an option is given
                        let curr_field = findField(currsheet[i], field);
                        if(curr_field !== null ){
                            if(option !== null){
                                if(curr_field.value === null){
                                    curr_field.value = "";
                                }
                                if(curr_field.value.length > 0)
                                {
                                    // update count
                                    count++;
                                }
                            }
                            else{
                                count++;
                            }
                        }
                    }
                }
            }        
        }
    
    dataarray.push(count);
    count = 0;
    }
return dataarray;
}


