import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "7b31f14eda13532f62bfd0617bf416a8",
  base: "https://api.openweathermap.org/data/2.5/",
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [inputString, setInputString] = useState("");
  const [searchString, setSearchString] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [weatherInfo, setWeatherInfo] = useState({
    tempature: "N/N",
    weather: "N/N",
    temp_min: "N/N",
  });

  const [cityInfo, setCityInfo] = useState({
    cityName: "",
    date: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchString(inputString);
  };

  useEffect(() => {
    const getAPIWeather = async () => {
      try {
        let response = await fetch(
          `${api.base}weather?q=${searchString}&units=metric&APPID=${api.key}`
        );
        if (response.ok) {
          let data = await response.json();
          // console.log(data);
          return data;
        }
        setNotificationText(response.statusText);
        return {};
      } catch (error) {
        return {};
      }
    };

    const showInfoToPage = async () => {
      if (searchString) {
        setNotificationText("Loading...");
        let result = await getAPIWeather();
        if (JSON.stringify(result) !== "{}") {
          const time = new Date();
          setNotificationText("");
          setWeatherInfo({
            ...weatherInfo,
            tempature: `${result["main"]["temp"]}`,
            weather: `${result["weather"][0]["main"]}`,
            temp_min: `${result["main"]["temp_min"]}`,
          });
          setCityInfo({
            ...cityInfo,
            cityName: `${result.name}`,
            date: `${days[time.getDay()]} ${time.getDate()} ${
              months[time.getMonth()]
            } ${time.getFullYear()}`,
          });
        } else {
          setCityInfo({
            ...cityInfo,
            cityName: "",
            date: "",
          });
          setWeatherInfo({
            ...weatherInfo,
            tempature: "N/N",
            weather: "N/N",
            temp_min: "N/N",
          });
        }
      }
    };

    showInfoToPage();
  }, [searchString]);

  return (
    <div className="main-contain">
      <div className="project-container">
        <header>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              type="text"
              autoComplete="off"
              className="search-input"
              value={inputString}
              onChange={(event) => {
                setInputString(event.target.value);
              }}
              placeholder="Search city name"
            />
            <button type="submit" style={{ display: "none" }}></button>
          </form>
        </header>
        <main>
          <div className="name-city-contain">
            <h1 className="name-city">{cityInfo.cityName}</h1>
            <p className="time-text">{cityInfo.date}</p>
          </div>
          <div className="notification-contain">
            <p className="notification-text">{notificationText}</p>
          </div>
          <div className="weather-info-contain">
            <h1 className="tempature">{weatherInfo.tempature}°c</h1>
            <h2 className="weather">{weatherInfo.weather}</h2>
            <h3 className="hi-low">
              {weatherInfo.tempature}°c/{weatherInfo.temp_min}°c
            </h3>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
