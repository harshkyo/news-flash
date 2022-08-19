import React from "react";
import { useEffect, useState } from "react";
import searchicon from "./../images/icons8-search.svg";
import closeicon from "./../images/icons8-close.svg";
import "./searchbar.css";

function Searchbar({
  containerDown,
  containerHaveCards,
  setSearchQuery,
  setUseSearchParam,
  useSearchParam,
  // resultCount,
}) {
  const [query, setQuery] = useState("");
  // const [savedQuery, setSavedQuery] = useState("");
  const [closeVisibility, setCloseVisibility] = useState("none");
  useEffect(() => {
    if (query === "") {
      setCloseVisibility("none");
    } else {
      setCloseVisibility("block");
    }
  }, [query]);

  useEffect(() => {
    if (containerHaveCards === false) containerDown();
  }, [containerHaveCards]);

  function URLify(string) {
    return string.trim().replace(/\s/g, '%20');
  }

  return (
    // <div>
    <div id="search">
      <input
        type="text"
        name="search"
        id="searchfield"
        spellCheck="false"
        value={query || useSearchParam.get("q")}
        onChange={(e) => {
          setQuery(e.target.value);
          setUseSearchParam({ q: URLify(e.target.value) });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            document.getElementById("searchbtn").click();
          }
        }}
        onFocus={() => {
          if (query != "") {
            setCloseVisibility("block");
            // if (containerHaveCards === false) containerDown();
          }
        }}
        onBlur={() => {
          if (containerHaveCards === false) containerDown();
        }}
      />
      <a
        id="clearbox"
        onClick={() => {
          setQuery("");
          setUseSearchParam({q: ""});
          document.getElementById("searchfield").focus();
        }}
        style={{
          display: closeVisibility,
        }}
      >
        <img src={closeicon} />
      </a>
      <button
        id="searchbtn"
        onClick={() => {
          setQuery(query.trim());
          setSearchQuery(query.trim());
          // setSavedQuery(query.trim());
          setUseSearchParam({ q: URLify(query.trim()) });
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
