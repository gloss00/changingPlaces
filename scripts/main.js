//listeners
document.getElementById("displayTable").addEventListener("click", function() {
    generateTable(table, toilets);
});

document.getElementById("createCsv").addEventListener("click", function() {
    createCsv()
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

//create CSV
function createCsv() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headings.join(",") + "\r\n";

    toilets.forEach(function(toilet){
        for (const [key, value] of Object.entries(toilet)) {
            if(value && typeof value === 'string' && value.includes(',')){
                toilet[key] = value.split(',').join('');
            };
        }

        let row = 
            toilet.id + ',' +
            toilet.n + ',' +
            toilet.a1 + ',' +
            toilet.c + ',' +
            toilet.p + ',' +
            toilet.la + ',' +
            toilet.lo;

        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri); 
}

