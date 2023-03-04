import React from "react";
// import {useState} from "react";
import SearchHistoryCol from "./SearchHistoryCol";
function DisplayData(props) {
  const data = props.weatherData;



  return (
    <div className="displayWrapper">
      <div className="mainBox">
        {data !== null && display(data)}
      </div>
    </div>
  );
}

const display = (data) => {
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("default");
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("default");
  const img_url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const description = data.weather[0].description.charAt(0).toUpperCase() 
  + data.weather[0].description.substring(1);
  return (
    <div>
      <h2>
        {data.name},{data.sys.country}
      </h2>
      <div>
        <div>
            <img className="weatherImage" src={img_url} alt="weather icon" />
        </div>
        
        <span className="weatherDescription">{description}</span>
        <br/>
        High : {data.main.temp_max}&deg;C Temp :{data.main.temp}&deg;C
        Low :{data.main.temp_min}&deg;C
        <br />
        Humidity : {data.main.humidity}%
        <br />
        Sunrise time : {sunrise}
        <br/>
        Sunset time : {sunset}
      </div>
    </div>
  );
};

export default DisplayData;
