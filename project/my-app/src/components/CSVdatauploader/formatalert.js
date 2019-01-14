// format alert string
// headerRow is array of column names (to identify filtered columns)
// sheetName is name of sheet
// isFilteredRows is boolean array on whether each row has been filtered
// isFilteredCols is boolean array on whether each col has been filtered
// rowFilterCutoff is number of filtered cols listed before cutting off
// colFilterCUtoff is number of filtered rows listed before cutting off
export function formatAlert(headerRow, sheetName,
                            isFilteredRows, isFilteredCols,
                            rowFilterCutoff, colFilterCutoff) {
  // create array of row indices (to identify filtered rows)
  var rowIndices = [];
  for (var i = 0; i < isFilteredRows.length; i++) {
    rowIndices.push(i);
  }
  // get alert string pieces for rows and columns
  var rowAlertStr = formatAlertDim(rowIndices, isFilteredRows,
                                   rowFilterCutoff, ', ');
  var colAlertStr = formatAlertDim(headerRow, isFilteredCols,
                                   colFilterCutoff, '\n');
  // combine pieces of alert string
  var alertStr = null;
  if (rowAlertStr !== '') {
    alertStr = 'Values were filtered out for sheet ' + sheetName +
               ' in row(s) (beginning at 0):\n' + rowAlertStr +
               ';\ncolumn(s):\n' + colAlertStr;
  }
  return alertStr; 
}

// formats alert string for a single dimension (row or column)
function formatAlertDim(indices, isFiltered, filterCutoff, sep) {
  // get indices that have been filtered
  var filteredIndices = getTrueIndices(indices, isFiltered);
  // create string describing first few filtered values
  var filteredStr = filteredIndices.slice(0, filterCutoff).join(sep);
  // describe number of cut off values
  var cutoffStr = formatCutoffStr(filteredIndices.length, filterCutoff);
  return filteredStr + cutoffStr;
}

// Returns values in valueArray that have their indices as true in boolArray
function getTrueIndices(valueArray, boolArray) {
  var trueValues = [];
  for (var i = 0; i < boolArray.length; i++) {
    if (boolArray[i]) {
      trueValues.push(valueArray[i]);
    }
  }
  return trueValues;
}

// Returns a string describing number of cut off values
function formatCutoffStr(arrayLength, cutoff) {
  var cutoffStr = '';
  if (arrayLength > cutoff) {
    cutoffStr = '\nand ' + (arrayLength - cutoff) + ' more';
  }
  return cutoffStr;
}
