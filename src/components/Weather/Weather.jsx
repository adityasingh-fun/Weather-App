import React, { useEffect, useState } from "react";
import './Weather.css'

const Weather = () => {
  const [input, setInput] = useState("new delhi");
  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const getDate = () => {
    const newDate = new Date().toLocaleString("en-us", {
      month: "long",
      weekday: "long",
      day: "numeric",
      year: "numeric",
    });
    return newDate;
  };

  const handleOnclick = ()=>{
    setErrorMessage(null);
    fetchWeather()
    setInput("")
  }

  const fetchWeather = async () => {
    setErrorMessage(null)
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=e3552521755bb88724b70b3528dd59f0`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch data. Please try again");
      }
      const dataFromAPI = await response.json();
      setApiData(dataFromAPI);
      setLoading(false);
    } catch (error) {
      setErrorMessage(`Error occured! ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    setInput("");
  }, []);

  console.log(apiData);
  return (
    <div className="outside-container">
      <div className="main-container">
        <div className="search-bar">
          <input
            type="text"
            name="search-input"
            placeholder="Enter city name"
            onChange={handleOnChange}
            value={input}
          />
          <button onClick={() => handleOnclick()}>Search</button>
        </div>
        <div className="display-data">
            {
                loading ? <h1>Loading Data. Please wait!</h1>: null
            }
            {
                errorMessage? <h1> {errorMessage} </h1> : null
            }
            {
                (!loading && !errorMessage) ? 
                <>
                <div className="city-info">
            <h2>
              {apiData?.name}, {apiData?.sys?.country}
            </h2>
          </div>
          <div className="date">
            <p> <i>{getDate()}</i> </p>
          </div>
          <div className="temperature">
            <h1> Temperature: {apiData?.main?.temp}°F </h1>
          </div>
          <div className="description">
            <p>
              {apiData.weather &&
              apiData.weather[0] &&
              apiData.weather[0].description
                ? apiData.weather[0].description
                : null}
            </p>
          </div>
          <div className="speed-humidity">
            <div className="wind-speed">
              <h3> {apiData?.wind?.speed} </h3>
              <h3 className="speed">Speed</h3>
            </div>
            <div className="humidity">
              <h3> {apiData?.main?.humidity}% </h3>
              <h3 className="hum">Humidity</h3>
            </div>
          </div>
                </>
                : null
            }
          
        </div>
      </div>
    </div>
  );
};

export default Weather;
