import React from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.fetchData(searchQuery);
  };

  return (
    <div className="searchBar">
      <div className="mainTitle">
        THE Weather App
      </div>
      
      <form onSubmit={submitHandler}>
        <label>Enter City Name: </label>
        <input
          type="text"
          className="searchInput"
          placeholder="eg.London"
          onChange={handleChange}
        ></input>
        <button type="submit" className="searchBtn">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;