//listener
document.getElementById("createCsv").addEventListener("click", function() {
    createCsv()
});

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