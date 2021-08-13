//listener
document.getElementById("displayTable").addEventListener("click", function() {
    generateTable(table, toilets);
});

//create table
function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    headings.forEach(element => {
        let th = document.createElement("th");
        th.classList.add("header");
        let text = document.createTextNode(element);
        th.appendChild(text);
        row.appendChild(th);
    });  
}

let table = document.querySelector("table");
let headings = ['Id', 'Name', 'Address', 'City', 'Postcode', 'Lat', 'Long',];
let headerId = ['id', 'n', 'a1', 'c', 'p', 'la', 'lo'];
generateTableHead(table);

function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      row.classList.add('tabel-data')
      for (let i = 0; i < headerId.length; i++) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[headerId[i]]);
            cell.appendChild(text);    
          }
      }
    }