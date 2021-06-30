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

var Key = "0c6c7c6766f0c82e84b46a07f2439d14";
var cityName = document.querySelector("#city-name");
var searchBtn = document.querySelector("button");
var clearHistory = document.querySelector("#clear-history");
var cityHistory = document.querySelector("#city-history");
var formEl = document.querySelector('form');
var  temperature = document.querySelector('#temperature');

var searchFormEl = document.querySelector('#city-history');
var requestUrl = 'https://api.github.com/repos/twitter/chill/issues?per_page=5';
var paragraph = document.querySelector('p');







function renderButton(e) {
    e.preventDefault();   
    console.log("I'm working")
    
}

searchBtn.addEventListener('click', renderButton);

function getApi() {
    var requestUrl = 'https://api.github.com/users?per_page=5';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //Using console.log to examine the data
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          //Creating a h3 element and a p element
          var userName = document.createElement('h3');
          var userUrl = document.createElement('p');
  
          //Setting the text of the h3 element and p element.
          userName.textContent = data[i].login;
          userUrl.textContent = data[i].url;
  
          //Appending the dynamically generated html to the div associated with the id="users"
          //Append will attach the element as the bottom most child.
          cityName.append(userName);
          temperature.append(userUrl);
        }
      });
  }
  searchBtn.addEventListener('click', getApi);