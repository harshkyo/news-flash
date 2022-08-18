import React from "react";
import { useEffect, useState } from "react";
import searchicon from "./../images/icons8-search.svg";
import closeicon from "./../images/icons8-close.svg";
import "./searchbar.css";

function Searchbar({
  containerDown,
  containerHaveCards,
  setSearchQuery,
  // resultCount,
}) {
  const [query, setQuery] = useState('');
  const [savedQuery, setSavedQuery] = useState('');
  const [closeVisibility, setCloseVisibility] = useState("none");
  useEffect(() => {
    if(query === '') {
      setCloseVisibility("none");
    }
    else {
      setCloseVisibility("block");
    }
  },[query]);

  useEffect(() => {
    if(containerHaveCards === false) containerDown();},[containerHaveCards])
  
  return (
    // <div>
    <div id="search">
      <input
        type="text"
        name="search"
        id="searchfield"
        spellCheck="false"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            document.getElementById("searchbtn").click();
          }
        }}
        onFocus={() => {
          if(query != '') {
            setCloseVisibility("block");
            // if (containerHaveCards === false) containerDown();
          }
        }}
        onBlur={() => {
          if (containerHaveCards === false) containerDown();
        }}
      />
      <a id="clearbox" onClick={() => {
        setQuery('');
        document.getElementById('searchfield').focus();
      }}
      style={{
        display: closeVisibility,
      }}><img src={closeicon} /></a>
      <button
        id="searchbtn"
        onClick={() => {
          setQuery(query.trim());
          setSearchQuery(query.trim());
          setSavedQuery(query.trim());
          document.getElementById("searchfield").blur();
          // setCloseVisibility("none");
        }}
      >
        <img src={searchicon} alt="search button" />
      </button>
    </div>
    // {/* <div style={{textAlign: "center",}}>{containerHaveCards === false && savedQuery != "" ? "No Result Found" : ""}</div> */}
    // {/* </div> */}
  );
}

export default Searchbar;
