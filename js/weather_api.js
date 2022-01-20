const getWeatherData = () => {
  url =
    "https://api.openweathermap.org/data/2.5/weather?q=riga&units=metric&appid=7be7f38ea1b053ac5c7204087606465c";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      const weatherResponse = JSON.parse(xhr.response);

      // Data From Response
      const real_temp_icon = findElementByID("real-temp-icon");
      const feels_like_icon = findElementByID("feels-like-icon");
      
      const real_temp = converTemperatureNumber(weatherResponse.main.temp);
      const feel_temp = converTemperatureNumber(weatherResponse.main.feels_like);
      const sunrise_time = getTimeFromNumber(weatherResponse.sys.sunrise);
      const sunset_time = getTimeFromNumber(weatherResponse.sys.sunset);
      const humidity = weatherResponse.main.humidity;
      const pressure = weatherResponse.main.pressure;
      const wind_speed = weatherResponse.wind.speed;
      const clouds = weatherResponse.clouds.all;
      const weather_icon = weatherResponse.weather[0].icon;

      setTemperatureIcon(real_temp, real_temp_icon);
      setTemperatureIcon(feel_temp, feels_like_icon);

      // Data in HTML
      let weather = {
        title_id: findElementByID(weather_paramsID.title),
        title_value: weatherResponse.name + ", " + weatherResponse.sys.country,
        date_id: findElementByID(weather_paramsID.date),
        date_value: convertDate(Date.now()),
        temperature_id: findElementByID(weather_paramsID.temperature),
        temperature_value: generateWeatherTitlesWithClass("Temperature", real_temp, " °C"),
        temperature_feels_id: findElementByID(weather_paramsID.temperature_feels),
        temperature_feels_value: generateWeatherTitlesWithClass("Feels like", feel_temp, " °C"),
        icon_id: findElementByID(weather_paramsID.icon),
        icon_value: generateOpenWeatherIconUrl(weather_icon),
        sunrise_id: findElementByID(weather_paramsID.sunrise),
        sunrise_value: generateWeatherTitlesWithClass("Sunrise", sunrise_time),
        sunset_id: findElementByID(weather_paramsID.sunset),
        sunset_value: generateWeatherTitlesWithClass("Sunset", sunset_time),
        humidity_id: findElementByID(weather_paramsID.humidity),
        humidity_value: generateWeatherTitlesWithClass("Humidity", humidity),
        pressure_id: findElementByID(weather_paramsID.pressure),
        pressure_value: generateWeatherTitlesWithClass("Pressure", pressure, " hPa"),
        wind_speed_id: findElementByID(weather_paramsID.wind_speed),
        wind_speed_value: generateWeatherTitlesWithClass("Wind Speed", wind_speed, " m/s"),
        cloudiness_id: findElementByID(weather_paramsID.cloudiness),
        cloudiness_value: generateWeatherTitlesWithClass("Cloudiness", clouds, "%"),
      };
      

      weather.title_id.innerHTML = weather.title_value;
      weather.date_id.innerHTML = weather.date_value;
      weather.temperature_id.innerHTML = weather.temperature_value;
      weather.temperature_feels_id.innerHTML = weather.temperature_feels_value;
      weather.sunrise_id.innerHTML = weather.sunrise_value;
      weather.sunset_id.innerHTML = weather.sunset_value;
      weather.humidity_id.innerHTML = weather.humidity_value;
      weather.pressure_id.innerHTML = weather.pressure_value;
      weather.wind_speed_id.innerHTML = weather.wind_speed_value;
      weather.cloudiness_id.innerHTML = weather.cloudiness_value;
      weather.icon_id.src = weather.icon_value;
      
    }
  };
  xhr.send();
};
