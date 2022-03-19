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
