//listener
document.getElementById("getToiletsApi").addEventListener("click", function() {
    makeRequest();
});

function makeRequest() {
    const httpRequest = new XMLHttpRequest();
    // const url='https://jsonplaceholder.typicode.com/posts';
    const url='https://changingplaces.uktoiletmap.org/api/getToilets';
    httpRequest.open("GET", url);
    httpRequest.send();

    httpRequest.onreadystatechange = (e) => {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log(httpRequest.responseText);
            } else {
                alert('There was a problem with the request.');
            }
          }    
    }
}