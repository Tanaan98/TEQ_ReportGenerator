// locate the field in that person row 
export function findField(person, field){
    for(let k = 0; k < person.length; k ++){
        if(person[k].field === field){
            return person[k];
        }
    }
    return null;
}
