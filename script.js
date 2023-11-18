$(document).ready(function() {
  $('form').submit(function(e) {
     e.preventDefault();
     const destination = $('#destination').val();
     const start_date = $('#start_date').val();
     const end_date = $('#end_date').val();
           
     // Call API to generate travel plans based on user inputs
     generateTravelPlans(destination, start_date, end_date);
           
     // Call weather API with destination to get weather forecast
     $.ajax({
      url: 'https://api.weatherapi.com/v1/forecast.json',
      type: 'GET',
      data: {
          key: '1b020e45a13184e01b8a77c233057aa4', // Replace with your actual API key
          q: destination,
          days: 7
      },
      dataType: 'json',
      success: function(response) {
          const forecast = response.forecast.forecastday;
          displayWeatherForecast(forecast);
      },
      error: function(error) {
          console.error('Error fetching weather data:', error);
      }
  });
  

     // You can add more functionalities here, such as packing list and accommodation suggestions
     generatePackingList();
     getAccommodationSuggestions(destination);
  });

  function generateTravelPlans(destination, start_date, end_date) {
     // Implement logic to generate travel plans based on user inputs
     // This is a placeholder, you can replace it with your actual logic
     console.log(`Generating travel plans for ${destination} from ${start_date} to ${end_date}`);
  }

  function generatePackingList() {
     // Implement logic to generate and display the packing list
     // This is a placeholder, you can replace it with your actual logic
     console.log('Generating packing list');
  }

  function getAccommodationSuggestions(destination) {
     // Implement logic to fetch and display accommodation suggestions
     // This is a placeholder, you can replace it with your actual logic
     console.log(`Fetching accommodation suggestions for ${destination}`);
  }

  function displayWeatherForecast(forecast) {
     const weatherDiv = $('#weather');
     weatherDiv.empty();
     
     forecast.forEach(function(day) {
        const date = day.date;
        const weatherInfo = day.day.condition.text;
        const maxTemp = day.day.maxtemp_c;
        const minTemp = day.day.mintemp_c;
        
        const dayDiv = $('<div>').addClass('weather-day');
        const dateP = $('<p>').text(date);
        const weatherInfoP = $('<p>').text(weatherInfo);
        const tempP = $('<p>').text('Temperature: ' + minTemp + '°C - ' + maxTemp + '°C');
        
        dayDiv.append(dateP, weatherInfoP, tempP);
        weatherDiv.append(dayDiv);
     });
  }
});
