const searchInput = document.querySelector('.search input');
    const searchBtn = document.querySelector('.search p');

    async function getWeather(city) {
      var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d35b0e3cd544aabac6fcf6e06e063547&&units=metric`);
      var data = await res.json();
      console.log(data);
      console.log("Cloud percentage",data.clouds.all)
      document.querySelector('.celcius').innerHTML = Math.round(data.main.temp) + "°c";
      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.humidityP').innerHTML = Math.round(data.main.humidity) + "%";
      document.querySelector('.windS').innerHTML = Math.round(data.wind.speed) + "Km/h";
      

    }

    searchBtn.addEventListener('click', () => {
      getWeather(searchInput.value);
    })
    searchInput.addEventListener('keydown', (event) => {
        if (event.keyCode == 13)
          getWeather(searchInput.value);
      })


      function showAlert() {
        // Display the alert message
        document.getElementById('alert-message').style.display = 'block';
      }
      
      function closeAlert() {
        // Hide the alert message
        document.getElementById('alert-message').style.display = 'none';
      }
      
      // You could also use JavaScript to automatically show the alert based on weather conditions
      // For instance, if the weather condition is a "Severe Thunderstorm":
      // You can trigger showAlert when certain weather data is retrieved (e.g., from an API).