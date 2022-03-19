// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// building the table
function buildTable(data) {
    // clear any existing table data
    tbody.html("");

    // loop through the data
    data.forEach((dataRow) => {
        // create a variable that will append a row to the table body
        let row = tbody.append("tr");
        
        // loop through each field in the dataRow argument; one object per row
        Object.values(dataRow).forEach((val) => {
          // append each value of the object to a cell in the table  
          let cell = row.append("td");
          // append data into a table data tag
          cell.text(val);
          }
        );
      });
}

function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    // orginial data
    let filteredData = tableData;

    // if date exist, use it
    if (date) {
        //Show only the rows where the date is equal to the date filter value passed in.
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);