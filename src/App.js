import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  
  const [countriesData, setcountriesData] = useState([]);
  const [weatherData, setWeatherData] = useState([ ]);
  const [showWeatherReport, setshowWeatherReport] = useState([]);
  useEffect(() => {
    fetchcountriesData();
  }, []);

  function fetchcountriesData() {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
        setcountriesData(data);
      })
      .catch((error) => console.log(error));
  }

  function fetchweatherData(latlng,country) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=12f4cfff5cf2766bc4f975fdc6c3b200`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => console.log(error));
      setshowWeatherReport(() => ({
        [country]: true
      }));
  }

  return (
    <div className="container">
      <h1 className="text-center"  id="title">Weather Report</h1>
      <div className="row">
        {countriesData.map((country) => (
          <div className="col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div className="card firstCard whiteColour h-100">
              <div className="card-header  ">
                <h1 className="text-center card-title bg-dark " >
                  {country.name.common}
                </h1>
                <img
                  className="card-img-top"
                  src={country.flags.png}
                  alt="Card image"
                />
              </div>
              <div className="card-body ">
                <br />
                <br />
                <div className="card-text">
                <p>Capital: {country.capital}</p>
                <p>Region: {country.region}</p>
                <p>Country Code: {country.cca3}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-light "
                  onClick={() => fetchweatherData(country.latlng,country.cca3)}
                >
                  Click for weather
                </button>
                {showWeatherReport[country.cca3] ===true &&
                  weatherData.weather &&  (
                    <div className="weatherReport">
                      <p id="weather">Weather: {weatherData.weather["0"].main}</p>
                      <p>Description: {weatherData.weather["0"].description}</p>
                      <p>Minimum Temperature: {(weatherData.main.temp_min - 273.15).toFixed(2)} &deg;C</p>
                      <p>Maximun Temperature: {(weatherData.main.temp_max - 273.15).toFixed(2)} &deg;C</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
