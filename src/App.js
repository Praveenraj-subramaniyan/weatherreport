import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  
  const [countriesData, setcountriesData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
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
      setshowWeatherReport((prevShowWeatherReport) => ({
        [country]: true
      }));
  }

  return (
    <div className="container">
      <div className="row">
        {countriesData.map((country) => (
          <div className="col-sm-4">
            <div className="card firstCard whiteColour">
              <div className="card-header bg-dark ">
                <h1 className="text-center card-title  " id="title">
                  {country.name.common}
                </h1>
              </div>
              <div className="card-body  ">
                <img
                  className="card-img"
                  src={country.flags.png}
                  alt="Card image"
                />
                <br />
                <br />
                <p>Capital: {country.capital}</p>
                <p>Region: {country.region}</p>
                <p>Country Code: {country.cca3}</p>
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
                      <h3>Weather Report</h3>
                      {/* <p>Current temperature: {weatherData.weather["0"].main.temp} K</p> */}
                      <p>Weather: {weatherData.weather["0"].main}</p>
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
