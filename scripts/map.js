var link = document.querySelector(".getLocation");
link.addEventListener('click', getLocation);

function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
        locURL = "https://www.google.com/maps/d/embed?mid=1BkdLTWUZFj0ex3dXBK1HLg2SIx0&hl=en&ll=" + position.coords.latitude + "%2c" + position.coords.longitude + "&z=16";
        var iframe = document.querySelector("iframe");
        iframe.src = locURL
        }

    function error() {
        console.log('error');
    }
