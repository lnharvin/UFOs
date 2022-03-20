// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    // init an array to store value and id
    let changedElement = d3.select(this);
    // console.log("changedElement = " + changedElement); returns [object object
  
    // 4b. Save the value that was changed as a variable.
    let changedElementValue = changedElement.property("value");
    //console.log("changedElementValue = " + changedElementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    //console.log("filterId = " + filterId);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (changedElementValue) {
      filters[filterId] = changedElementValue;
    } else {
      delete filters[filterId]
    }

    // 6. Call function to apply all filters and rebuild the table
      filterTable();  // this calls the filterTable function and the filters object is accessible w/o passing in a parameter.
  }

// console.log(filters);

  // 7. Use this function to filter the table when data is entered.
function filterTable() {
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;

    // 9. Loop through all of the filters and keep any data that
    // matches the filter values

    //console.log(filters);

    //console.log(Object.entries(filters)); // these are the same

    // const keys = Object.entries(filters);
    // console.log(keys);  // these are the same

    //console.log("Object.entries(filters).length = " + Object.entries(filters).length);

    // FINALLY THIS WORKS!!! AFTER 5 ITERACTIONS OF DIFFERENT FOR AND FOREACH LOOPS .... UUUURRRRRRGGGGGHHHHH!!!!!

    filteredData = filteredData.filter(function(item) {
      for (var key in filters) {
        if (item[key] === undefined || item[key] != filters[key])
          return false;
          //console.log("this code ran")
      }
      return true;
    });

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
