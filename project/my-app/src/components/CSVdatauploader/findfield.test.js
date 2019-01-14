import {findField} from './findfield.js';
import ReactDOM from 'react-dom'

test('No false positives', () => {
    expect(findField([], 'test')).toEqual(null);
    expect(findField([{field: 4}], 3)).toEqual(null);
    });

test('Finds fields for various lengths', () => {
    expect(findField([{field: 1}], 1)).toEqual({field: 1});
    expect(findField([{value: 'x', field: 'a'},
    	              { value: 'y', field: 'b'}], 'a')).toEqual({value: 'x', field: 'a'});
    });
