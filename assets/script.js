/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city*/

var API_Key = "0c6c7c6766f0c82e84b46a07f2439d14";
var cityName = document.querySelector("#city-name");
var searchBtn = document.querySelector(".btn");
var clearHistory = document.querySelector("#clear-history");
var cityHistory = document.querySelector("#city-history");
var formEl = document.querySelector('form');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var uvIndex = document.querySelector('#uv-index');
var temp = document.querySelector('#temp');
var searchFormEl = document.querySelector('#city-history');
var paragraph = document.querySelector('p');
var timeEl = document.querySelector('.time')
var dateEl = document.querySelector('.date');
var timeZoneEl = document.querySelector('.time-zone');
var todayWeather = document.querySelector('#today-weather')
var dt = new Date();



// added date to the web page
document.getElementById('date-time').innerHTML = dt.toDateString();

// Time interval function
setInterval(() => {
  var time = new Date();
  var month = time.getMonth();
  var date = time.getDate();
  var day = time.getDay();
  var hour = time.getHours();
  var hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
  var minutes = time.getMinutes();
  var ampm = hour >= 12 ? 'PM' : 'AM'

  timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

}, 1000);

var cityFormEl = $('#city-form');
var cityListEl = $('#city-list');


// funciton to handle the city input
function handleFormSubmit(event) {
  event.preventDefault();

  var cityItem = $('input[name="city-name"]').val();

  if (!cityItem) {
    console.log('No city name inputed');
    return;
  }

  var cityListItemEl = $(
    '<li class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
  );
  cityListItemEl.text(cityItem);

  // cityListItemEl.append(
  //   '<button class="btn btn-danger btn-small delete-item-btn">Remove</button'
  // );

  cityListEl.append(cityListItemEl);

  $('input[name="city-name"]').val('');
}

function handleRemoveItem(event) {

  var btnClicked = $(event.target);

  btnClicked.parent('li').remove();

}


//button test function
// function renderButton(e) {
//   e.preventDefault();
//   console.log("I'm working")
//   console.log("next step")

// }

// get weather data from the API
getWeatherData();
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);

    var { latitude, longitude } = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_Key}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        displayWeatherData(data);
      })
  })
}

// display weather elements from the API KEY
function displayWeatherData(data) {
  console.log("in displayWeatherData")
  console.log(data)
  var { current: { temp, humidity, wind_speed, uvi, timezone } } = data;
  temperature.innerHTML = temp;
  cityName.innerHTML = timezone;
  humidity.innerHTML = humidity;
  windSpeed.innerHTML = wind_speed;
  uvIndex.innerHTML = uvi;


}






// document.addEventListener('DOMContentLoaded', getWeatherData);

searchBtn.addEventListener('click', getWeatherData);
// searchBtn.addEventListener('click', renderButton);
cityListEl.on('click', '.delete-item-btn', handleRemoveItem);
cityFormEl.on('submit', handleFormSubmit);






// example on how to check api data
// https://api.openweathermap.org/data/2.5/onecall?lat=40.5&lon=74.4&exclude=hourly,minutely&units=metric&appid=0c6c7c6766f0c82e84b46a07f2439d14