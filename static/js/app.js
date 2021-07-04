const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  tbody.html("");


  data.forEach((dataRow) => {
    
	// Append a row to the table body
    let row = tbody.append("tr");


    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {}


// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
	var changedElement = d3.select(this);
	
    // 4b. Save the value that was changed as a variable.
	var elementValue = changedElement.property("value");
	//console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable.
	var idFilter = changedElement.attr("id")
	//console.log(idFilter);
	if (elementValue) {
		filters[idFilter]=elementValue;
		}
	else {
		delete filters[idFilter];
		}
	
	//console.log(filters)
	
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
	let filteredData = tableData;
	
    
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
	
	//emma
	Object.entries(filters).forEach(([key,value])=>{
		filteredData=filteredData.filter(row => row[key] === value
		);
		console.log(key,value)
	});
	
    buildTable(filteredData)
  }
  

	d3.selectAll("input").on("change",updateFilters);


  buildTable(tableData);