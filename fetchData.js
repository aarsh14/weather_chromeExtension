const API_key = " "     //add API key from openweather

window.onload = function () {
  var startPos;

  var geoSuccess = function (position) {
    startPos = position;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${startPos.coords.latitude}&lon=${startPos.coords.longitude}&appid=${API_key}`    
    )
      .then((data) => data.json())

      .then((jsonData) => {
        /*console.log(jsonData.name);
    console.log(jsonData.main.feels_like);
    console.log(jsonData.main.temp);
    console.log(jsonData.weather[0].description);
    */
        fetch(
          `https://openweathermap.org/img/wn/${jsonData.weather[0].icon}@2x.png`
        )
          .then((res) => res.blob())
          .then((result) => {
            const tempCelsius = jsonData.main.temp - 273.15;
            const feelsLikeCelsius = jsonData.main.feels_like - 273.15;

            document.getElementById("text_location").innerHTML = jsonData.name;
            document.getElementById("text_location_country").innerHTML =
              jsonData.sys.country;
            document.getElementById("text_temp").innerHTML =
              tempCelsius.toFixed(1); // Display temperature rounded to one decimal place
            document.getElementById("text_feelslike").innerHTML =
              feelsLikeCelsius.toFixed(1); // Display feels like temperature rounded to one decimal place

            document.getElementById("text_desc").innerHTML =
              jsonData.weather[0].description;

            const imageObjectURL = URL.createObjectURL(result);
            document.getElementById("icon").src = imageObjectURL;
          });
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
