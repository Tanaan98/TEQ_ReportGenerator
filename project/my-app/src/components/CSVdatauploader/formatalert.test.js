import { formatAlert } from './formatalert.js';
import ReactDOM from 'react-dom';

test('No filter alert needed', () => {
    expect(formatAlert([], '', [], [], 0, 0)).toEqual(null);
    expect(formatAlert(['a', 'b', 'c'], '123',
                       [false, false, false], [false, false, false],
                       1, 3)).toEqual(null);
    expect(formatAlert([1, 2, 'a'], 'adasdc',
                       [false, false], [false],
                       1, 3)).toEqual(null);
    });

test('Filter alert string without cutoffs', () => {
    expect(formatAlert(['x'], '', [true], [true], 1, 1)).toEqual(
      'Values were filtered out for sheet  in row(s) (beginning at 0):\n0;\ncolumn(s):\nx');

    expect(formatAlert(['x', 123, 'abc'], 'Options',
                       [true, false, true, true], [true, true],
                       20, 20)).toEqual(
      'Values were filtered out for sheet Options in row(s) (beginning at 0):\n0, 2, 3;\ncolumn(s):\nx\n123');
    });

test('Filter alert string with cutoffs', () => {
    expect(formatAlert([''], '1', [true], [true, true], 0, 0)).toEqual(
      'Values were filtered out for sheet 1 in row(s) (beginning at 0):\n\nand 1 more;\ncolumn(s):\n\nand 2 more');

    expect(formatAlert(['123', 'abc', '345', '456'], 'testSheet',
                       [true, false, true, true], [true, true, true, true],
                       2, 2)).toEqual(
      'Values were filtered out for sheet testSheet in row(s) (beginning at 0):\n0, 2\nand 1 more;\ncolumn(s):\n123\nabc\nand 2 more');
    });
