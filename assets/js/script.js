var cityInputEl = document.querySelector('#cityInput');
var cityInputBtnEl = document.querySelector('#city-input');
var currentTitleEl = document.getElementById('currentTitle');
var currentIconEl = document.getElementById('currentIcon');
var currentTempEl = document.getElementById('currentTemp');
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentUVIEl = document.getElementById('currentUVI');

var apiId = '647023ed4a626690e5133a1c44248d4c';

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = cityInputEl.value.trim();
  
    if (city) {
      getCurrentCond(city);
        console.log('OK');

    } else {
      alert('Please try entering your city name again');
    }
};

// var getCurrentCond = function (city) {
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiId ;
  
//     fetch(apiUrl)
//       .then(function (response) {
//         if (response.ok) {
//           response.json().then(function (data) {
//             consolearRespuesta(data);
//           });
          
//         } else {
//           alert('Error: ' + response.statusText);
//         }
//       })
//       .catch(function (error) {
//         alert('Unable to connect to OpenWeather');
//       });
// };

// var consolearRespuesta = function (data) {
//     console.log(getCurrentCond);
// }
//   }


function getCurrentCond(city) {
    var requestUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiId ;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // // Use the console to examine the response
        console.log(data);
        
        currentIconEl.setAttribute('src', "http://openweathermap.org/img/wn/" + data.weather[0].icon +".png")
        var todayDate = moment.unix(data.dt).format("MMM Do, YYYY");
        currentTitleEl.textContent = city + ' ' + todayDate;
        currentTempEl.textContent = 'Temp: ' +data.main.temp + '°C';
        currentWindEl.textContent = 'Wind: ' +data.wind.speed + 'km/h';
        currentHumidityEl.textContent = 'Humidity: ' +data.main.humidity + '%';

        var lat = data.coord.lat;
        var lon = data.coord.lon;

        secondAPI(lat,lon);
      });    
}

function secondAPI(lat , lon) {
    var requestSecondUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=hourly,minutely&units=metric&appid=" +apiId;

    fetch(requestSecondUrl)
    .then(function(secondResponse) {
        return secondResponse.json();
    })
    .then(function(secondData){
        console.log(secondData);
        currentUVIEl.textContent = 'UV Index: ' +secondData.current.uvi;

    })


}

cityInputBtnEl.addEventListener('submit', formSubmitHandler);