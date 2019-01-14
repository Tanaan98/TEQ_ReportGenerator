// Filters values for specific fields
// Returns filteredStr if value is filtered out
export function filterData(field, value, filteredStr) {
  // Check that dates of birth are of format yyyy-mm-dd
  if (/Date/.test(field)) {
    return dateCheck(value, filteredStr);
  }
  // Check that postal codes are of format xxx xxx
  if (/Postal Code/.test(field)) {
    return postalCodeCheck(value, filteredStr);
  }
  // Check that yes/no columns have Yes/No responses
  if (['Directed at a Specific Target Group',
       'Target Group: Senior',
       'Provisions for Disabilities'].includes(field)) {
    return yesNoCheck(value, filteredStr);
  }
  // Check that string columns are strings
  if (['Official Language of Preference',
       'Activity Under Which Client Received Services'].includes(field)) {
    return stringCheck(value, filteredStr);
  }

  // Check that numeric columns are numbers
  if (['Number of IRCC-Funded Spots in Course'].includes(field)) {
    return numericCheck(value, filteredStr);
  }
  return value;
}

// Helper to check that dates are of format yyyy-mm-dd
function dateCheck(value, filteredStr) {
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
    // Attempt to correct date
    var validDate = new Date(value);
    if ((validDate === 'Invalid Date') || isNaN(validDate)) {
      // Return filteredStr if date can't be corrected
      return filteredStr;
    }
    return validDate.toISOString().slice(0, 10);
  }
  return value;
}

// Helper to check that postal codes are of format xxx xxx
function postalCodeCheck(value, filteredStr) {
  if (!/^[a-zA-Z0-9]{3} [a-zA-Z0-9]{3}$/.test(value)) {
    // Attempt to correct xxxxxx
    if (/^[a-zA-Z0-9]{6}$/.test(value)) {
      return value.substring(0, 3) + ' ' + value.substring(3, 6);
    }
    // Return filteredStr if unrecognized format
    return filteredStr;
  }
  return value;
}

// Helper to check that yes/no responses are as so
function yesNoCheck(value, filteredStr) {
  if (['YES', 'Yes', 'yes', 'Y', 'y',
       'TRUE', 'True', 'true', 'T', 't'].includes(value)) {
    return 'Yes';
  }
  if (['NO', 'No', 'no', 'N', 'n',
       'FALSE', 'False', 'false', 'F', 'f'].includes(value)) {
    return 'No';
  }
  // Return filteredStr if not recognized as yes or no
  return filteredStr;
}

// Helper to return string columns as so
function stringCheck(value, filteredStr) {
  return "" + value;
}

// Helper to check that numeric responses are as so
function numericCheck(value, filteredStr) {
  if (isNaN(value)) {
    // Return filteredStr if not a number
    return filteredStr;
  }
  return value;
}
