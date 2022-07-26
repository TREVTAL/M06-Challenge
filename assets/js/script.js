var cityInputEl = document.querySelector('#cityInput');
var cityInputBtnEl = document.querySelector('#city-input');
var currentTitleEl = document.getElementById('currentTitle');
var currentIconEl = document.getElementById('currentIcon');
var currentTempEl = document.getElementById('currentTemp');
var currentWindEl = document.getElementById('currentWind');
var currentHumidityEl = document.getElementById('currentHumidity');
var currentUVIEl = document.getElementById('currentUVI');

// setup vars for forecast
var date1El = document.getElementById('date1');
var icon1El = document.getElementById('icon1');
var temp1El = document.getElementById('temp1');
var wind1El = document.getElementById('wind1');
var hum1El = document.getElementById('hum1');

var date2El = document.getElementById('date2');
var icon2El = document.getElementById('icon2');
var temp2El = document.getElementById('temp2');
var wind2El = document.getElementById('wind2');
var hum2El = document.getElementById('hum2');

var date3El = document.getElementById('date3');
var icon3El = document.getElementById('icon3');
var temp3El = document.getElementById('temp3');
var wind3El = document.getElementById('wind3');
var hum3El = document.getElementById('hum3');

var date4El = document.getElementById('date4');
var icon4El = document.getElementById('icon4');
var temp4El = document.getElementById('temp4');
var wind4El = document.getElementById('wind4');
var hum4El = document.getElementById('hum4');

var date5El = document.getElementById('date5');
var icon5El = document.getElementById('icon5');
var temp5El = document.getElementById('temp5');
var wind5El = document.getElementById('wind5');
var hum5El = document.getElementById('hum5');

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
        //Ifs for UVIndex go here
        if (secondData.current.uvi < 2) {
            currentUVIEl.setAttribute('class' , 'badge badge-success')
        } else if (secondData.current.uvi > 8) {
            currentUVIEl.setAttribute('class' , 'badge badge-danger')
        } else { currentUVIEl.setAttribute('class' , 'badge badge-warning') }


        console.log(secondData.daily[0]);
        console.log(secondData.daily[0].temp.day);
        console.log(secondData.daily[0].wind_speed);
        console.log(secondData.daily[0].weather[0].icon);
        console.log(secondData.daily[0].humidity);
        
        
        var dateMom1 = moment.unix(secondData.daily[1].dt).format("MMM/D/YYYY");
        console.log(dateMom1);
        date1El.textContent = dateMom1;
        icon1El.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[1].weather[0].icon +".png");
        temp1El.textContent = 'Temp:' + secondData.daily[1].temp.day + '°C'; 
        wind1El.textContent = 'Wind: ' + secondData.daily[1].wind_speed + 'km/h';
        hum1El.textContent = 'Humidity: ' +secondData.daily[1].humidity +'%';

        var dateMom2 = moment.unix(secondData.daily[2].dt).format("MMM/D/YYYY");
        console.log(dateMom2);
        date2El.textContent = dateMom2;
        icon2El.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[2].weather[0].icon +".png");
        temp2El.textContent = 'Temp:' + secondData.daily[2].temp.day + '°C'; 
        wind2El.textContent = 'Wind: ' + secondData.daily[2].wind_speed + 'km/h';
        hum2El.textContent = 'Humidity: ' +secondData.daily[2].humidity +'%';

        var dateMom3 = moment.unix(secondData.daily[3].dt).format("MMM/D/YYYY");
        console.log(dateMom3);
        date3El.textContent = dateMom3;
        icon3El.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[3].weather[0].icon +".png");
        temp3El.textContent = 'Temp:' + secondData.daily[3].temp.day + '°C'; 
        wind3El.textContent = 'Wind: ' + secondData.daily[3].wind_speed + 'km/h';
        hum3El.textContent = 'Humidity: ' +secondData.daily[3].humidity +'%';
        
        var dateMom4 = moment.unix(secondData.daily[4].dt).format("MMM/D/YYYY");
        console.log(dateMom4);
        date4El.textContent = dateMom4;
        icon4El.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[4].weather[0].icon +".png");
        temp4El.textContent = 'Temp:' + secondData.daily[4].temp.day + '°C'; 
        wind4El.textContent = 'Wind: ' + secondData.daily[4].wind_speed + 'km/h';
        hum4El.textContent = 'Humidity: ' +secondData.daily[4].humidity +'%';

        var dateMom5 = moment.unix(secondData.daily[5].dt).format("MMM/D/YYYY");
        console.log(dateMom5);
        date5El.textContent = dateMom5;
        icon5El.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[5].weather[0].icon +".png");
        temp5El.textContent = 'Temp:' + secondData.daily[5].temp.day + '°C'; 
        wind5El.textContent = 'Wind: ' + secondData.daily[5].wind_speed + 'km/h';
        hum5El.textContent = 'Humidity: ' +secondData.daily[5].humidity +'%';
    
    })


}

cityInputBtnEl.addEventListener('submit', formSubmitHandler);