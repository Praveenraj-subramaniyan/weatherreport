import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [countriesData, setcountriesData] = useState([]);
  useEffect(() => {
    fetchcountriesData();
  }, []);

  function fetchcountriesData() {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then((data) => {
        setcountriesData(data);
        // countriesData.forEach((country)=>{
        //   console.log(` ${country.latlng}`);
        // });
      })
      .catch((error) => console.log(error));
  }

    function fetchweatherData(latlng) {
      // let value=latlng.split(",")
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=12f4cfff5cf2766bc4f975fdc6c3b200`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => console.log(error));
        console.log(latlng[0]);
        console.log(latlng[1]);
    }
 

  return (
    <div className="container-fluid">
      <div className="row">
        {countriesData.map((country) => (
          <div className="col-sm-4">
            <div className="card firstCard whiteColour">
              <div className="card-header bg-dark ">
                <h4 className="card-title ">{country.name.common}</h4>
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
                <button type="button" className="btn btn-outline-light " onClick={() =>fetchweatherData(country.latlng)}>
                  Click for weather
                </button>
                {/* <div className="weatherReport ">
                  <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4"></div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
