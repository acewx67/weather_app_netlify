import "./App.css";
import SearchBar from "./components/SearchBar";
import DisplayData from "./components/DisplayData";
import { useState } from "react";
import axios from "axios";
import SearchHistoryCol from "./components/SearchHistoryCol";

function App() {
  const obj = {hyd : 10,goa : 1};
  console.log(obj.hyd);
  



  const [data, setData] = useState({
    cityName: "",
    countryName: "",
    lat: "",
    lon: "",
  });
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState(null);

  function fetchData(searchQuery) {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&appid=ae77d8547f03cb282b301821239c39c1`;

    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        editData(response);
      })
      .catch((error) => {
        alert("Please enter a valid city");
        console.log("error in retreiving lat,lon data", error);
      });
  }
  function editData(response) {
    let temp = {
      ...data,
      cityName: response.data[0].name,
      countryName: response.data[0].country,
      lat: response.data[0].lat,
      lon: response.data[0].lon,
    };
    setData(temp);
    store(response.data[0].name);
    getWeatherData(temp.lat, temp.lon);
  }
  function getWeatherData(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae77d8547f03cb282b301821239c39c1&units=metric`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data,"response");
        setWeatherData(response.data);
        // console.log("weather data log");
      })
      .catch((error) => console.log("error in retreiving weather data", error));
  }
  function store(cityName) {
    if (!searchHistory) {
      let t = [];
      t.push(cityName);
      setSearchHistory(t);
    } else {
      if (searchHistory.indexOf(cityName) !== -1) {
        let t = searchHistory;
        console.log(t);
        t.splice(searchHistory.indexOf(cityName), 1);
        console.log(t);
        t.unshift(cityName);
        console.log(t);
        setSearchHistory(t);
      } else {
        let t = searchHistory;
        t.unshift(cityName);
        setSearchHistory(t);
      }
    }
  }

  return (
    <div className="App">
      <SearchBar
        fetchData={fetchData}
      />
      <div className="col">
        <DisplayData
          data={data}
          setData={setData}
          setWeatherData={setWeatherData}
          weatherData={weatherData}
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
        />
        
        {weatherData ? <SearchHistoryCol searchHistory={searchHistory} fetchData={fetchData} /> : null}
      </div>
      
    </div>
  );
}

export default App;
