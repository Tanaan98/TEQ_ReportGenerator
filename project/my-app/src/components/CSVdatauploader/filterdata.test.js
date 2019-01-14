
import { filterData } from './filterdata.js';
import ReactDOM from 'react-dom';

test('Unrecognized fields always pass', () => {
    expect(filterData('date', 'x', 'asdf')).toEqual('x');
    expect(filterData('qwer', '2027/03/12', '')).toEqual('2027/03/12');
    expect(filterData('PostalCode', '', 'test')).toEqual('');
    expect(filterData('Target Group: Junior', '', '0')).toEqual('');
    });

test('Dates are recognized and corrected/filtered if needed', () => {
    expect(filterData('Date Field', '2015-02-02', '')).toEqual('2015-02-02');
    expect(filterData('Date Field', '1111/1/1', '')).toEqual('1111-01-01');
    expect(filterData('a Date a', '2027/03/12', '23')).toEqual('2027-03-12');
    expect(filterData('Date', '20270312', 'incorrect')).toEqual('incorrect');
    expect(filterData('Date2', '', 'asdf')).toEqual('asdf');
    });

test('Postal codes are recognized and corrected/filtered if needed', () => {
    expect(filterData('aPostal Codea', '132 345', '')).toEqual('132 345');
    expect(filterData('Postal Codeasdf', 'ZXCVBN', '')).toEqual('ZXC VBN');
    expect(filterData('Postal Code', 'asd qwe', '')).toEqual('asd qwe');
    expect(filterData('12Postal Code', 'aA3T9l', '')).toEqual('aA3 T9l');
    expect(filterData('Postal Code', '2027/03/12', '23')).toEqual('23');
    expect(filterData('Postal Code"', '123-456', 'asdf')).toEqual('asdf');
    expect(filterData('-Postal Code-', '', '0')).toEqual('0');
    });

test('Yes/no are recognized and corrected/filtered if needed', () => {
    expect(filterData('Directed at a Specific Target Group',
                      'YES', '1')).toEqual('Yes');
    expect(filterData('Target Group: Senior',
                      'Yes', '2')).toEqual('Yes');
    expect(filterData('Directed at a Specific Target Group',
                      'Y', '3')).toEqual('Yes');
    expect(filterData('Target Group: Senior',
                      't', '4')).toEqual('Yes');
    expect(filterData('Provisions for Disabilities',
                      'TRUE', '5')).toEqual('Yes');
    expect(filterData('Provisions for Disabilities',
                      'no', 'aa')).toEqual('No');
    expect(filterData('Target Group: Senior',
                      'No', 'ab ')).toEqual('No');
    expect(filterData('Directed at a Specific Target Group',
                      'n', ' ab c')).toEqual('No');
    expect(filterData('Target Group: Senior',
                      'F', './>')).toEqual('No');
    expect(filterData('Provisions for Disabilities',
                      'false', '')).toEqual('No');
    expect(filterData('Provisions for Disabilities',
                      '1', '12345')).toEqual('12345');
    });

test('String columns have values returned as strings', () => {
    expect(filterData('Official Language of Preference',
                      'string', '')).toEqual('string');
    expect(filterData('Activity Under Which Client Received Services',
                      1, '')).toEqual('1');
    });

test('Numeric columns are recognized and filtered if needed', () => {
    expect(filterData('Number of IRCC-Funded Spots in Course',
                      1, '')).toEqual(1);
    expect(filterData('Number of IRCC-Funded Spots in Course',
                      'a', '')).toEqual('');
    expect(filterData('Number of IRCC-Funded Spots in Course',
                      '1', 'NaN')).toEqual('1');
    });
