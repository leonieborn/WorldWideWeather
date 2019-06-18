
var newLat = 51.51;
var newLon = -0.13;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        writeInfos(data);
    }
};

var c = "http://api.openweathermap.org/data/2.5/weather?lat=" + newLat + "&lon=" + newLon;
loadWeatherData(xhttp, c);


//by marker
function requestPost(newLon, newLat) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("Data").innerHTML = " ";
            var data = JSON.parse(this.responseText);
            writeInfos(data);
        }
    };
    var d = "http://api.openweathermap.org/data/2.5/weather?lat=" + newLat + "&lon=" + newLon;
    loadWeatherData(xhttp, d);
}
//by city entry
function loadWeatherOfCity() { 
    var city = document.getElementById("city").value;
    //set region <p>-tag
    document.getElementById("region").innerHTML = city;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            writeInfos(data);
        }
    };
    var k = "http://api.openweathermap.org/data/2.5/weather?q=" + city;
    loadWeatherData(xhttp, k);
}

//send data:
function loadWeatherData(xhttp, a) {
    var b = "&APPID=1f879d45b6116a6d079ba87067d0f85d";
    xhttp.open("GET", a + b, true);
    xhttp.send();
}
//used &works
function writeInfos(data){
    document.getElementById("coordinates").innerHTML = "coordinates: " + data.coord.lat + " | " + data.coord.lon;
    newLat = data.coord.lat;
    newLon = data.coord.lon;
    document.getElementById("weather").innerHTML = data.weather.map(function (v) {
        selectOWAIcons(v.icon);
        return " Weather: " + v.main + ", " + v.description;

    });
    document.getElementById("temperaturK").innerHTML = " Temperatur in Kelvin: " + data.main.temp + " Pressure:" + data.main.pressure + " \nHumidity:" + data.main.humidity; 
    document.getElementById("temperatur").innerHTML = " Temperatur: " + parseFloat(data.main.temp - 273.15).toFixed(3);
    document.getElementById("temperaturMin").innerHTML = " Temperatur min. : " + parseFloat(data.main.temp_min - 273.15).toFixed(3);
    document.getElementById("temperaturMax").innerHTML = " Temperatur max. : " + parseFloat(data.main.temp_max - 273.15).toFixed(3);

    loadGMaps(data);
    
}
function loadGMaps(data) {
    var map = new GMaps({
        width:"100%" ,
        height:"100%",
        el: '#map', lat: data.coord.lat, lng: data.coord.lon, click: function (e) {
            //debugger ;
            //console.log(e);
            document.getElementById("region").innerHTML = "";
            var newLat = e.latLng.lat();
            var newLon = e.latLng.lng();
            map.addMarker({
                lat: newLat,
                lng: newLon,
                infoWindow: {
                    content: '<p id = infoWindow > Click on the marker to get weather data</p>'
                },
                click: function (e) {
                    requestPost(newLon, newLat);
                }
            });

        }
    });
    map.addMarker({
        lat: newLat,
        lng: newLon,
        infoWindow: {
            content: '<p>position of weather information</p>'
        }
    });
}

function selectOWAIcons(id){
        var img = "http://openweathermap.org/img/w/"+ id+".png";
        document.getElementById("icon").src = img;
    }

