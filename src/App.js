// App.js
import React, { useEffect, useState, useRef, useCallback } from "react";
import WeatherForm from "./Components/WeatherForm";
import WeatherDetails from "./Components/WeatherDetails";
import WeatherDetailsTwo from "./Components/WeatherDetailsTwo";
import Forecast from "./Components/Forecast";
import { MDBRow, MDBBtn, MDBCol, MDBContainer } from "mdb-react-ui-kit";

const App = React.memo(() => {
  const [city, setCity] = useState("Ranchi");
  const [forecast, setForecast] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const weatherDataCache = useRef({}); // Use ref for caching

  const fetchData = useCallback(async () => {
    if (city.trim() !== "") {
      try {
        const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        console.log("API key: ", apiKey);

        // Check cache first
        if (
          weatherDataCache.current[city] &&
          weatherDataCache.current[city][unit]
        ) {
          setWeatherData(weatherDataCache.current[city][unit]);
        } else {
          // Fetch current weather data
          const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
          const currentResponse = await fetch(currentWeatherUrl);
          const currentData = await currentResponse.json();
          setWeatherData(currentData);

          // Fetch 5-day forecast data
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
          const forecastResponse = await fetch(forecastUrl);
          const forecastData = await forecastResponse.json();

          // Aggregate forecast data for each day
          const aggregatedForecast = {};

          forecastData.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0];

            if (!aggregatedForecast[date]) {
              aggregatedForecast[date] = {
                date,
                tempSum: 0,
                tempCount: 0,
                description: "",
                img: "",
              };
            }

            const iconSuffix = "d";
            aggregatedForecast[date].description = item.weather[0].description;
            aggregatedForecast[date].img =
              item.weather[0].icon.slice(0, -1) + iconSuffix;
            aggregatedForecast[date].tempSum += item.main.temp;
            aggregatedForecast[date].tempCount += 1;
          });

          // Calculate average temperature for each day
          const finalForecast = Object.values(aggregatedForecast).map(
            (day) => ({
              date: day.date,
              temp: (day.tempSum / day.tempCount).toFixed(2), // Average temperature
              description: day.description,
              img: day.img,
            })
          );

          // Use finalForecast for your component state or wherever you need it
          setForecast(finalForecast);

          // Update cache
          if (!weatherDataCache.current[city]) {
            weatherDataCache.current[city] = {};
          }
          weatherDataCache.current[city][unit] = currentData;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setWeatherData(null);
        setForecast(null);
      }
    }
  }, [city, unit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCityChange = useCallback((newCity) => {
    setCity(newCity);
  }, []);

  const handleUnitToggle = useCallback(() => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  }, []);

  return (
    <MDBContainer className="app">
      <MDBRow>
        <WeatherForm
          onCityChange={handleCityChange}
          handleUnitToggle={handleUnitToggle}
        />
      </MDBRow>
      <MDBRow>
        {weatherData && forecast && (
          <>
            <MDBCol className="vh -100 " md="6">
              <WeatherDetails data={weatherData} unit={unit} />
            </MDBCol>
            <MDBCol md="6">
              <div className="pb-2">
                <WeatherDetailsTwo
                  data={weatherData}
                  onUnitToggle={handleUnitToggle}
                  unit={unit}
                />
              </div>
            </MDBCol>
            <Forecast 
            data={forecast} 
            unit={unit} />
          </>
        )}
      </MDBRow>
    </MDBContainer>
  );
});

export default App;
