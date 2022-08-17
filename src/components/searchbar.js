import React from "react";
import searchicon from "./../images/icons8-search.svg";
import "./searchbar.css";

function Searchbar({
  // containerUp,
  containerDown,
  containerHaveCards,
  setSearchQuery,
}) {
  // const inputRef = React.useRef(null);
  const [query, setQuery] = React.useState('');
  const [buttonStatus, setButtonStatus] = React.useState('');
  React.useEffect(() => {
    document.getElementById("searchbtn");
  },[containerHaveCards]);
  return (
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
        // onFocus={() => {
        //   if (containerHaveCards === true) containerUp();
        // }}
        onBlur={() => {
          if (containerHaveCards === false) containerDown();
        }}
      />
      <button
        id="searchbtn"
        onClick={() => {
          setSearchQuery(query);
        }}
      >
        <img src={searchicon} alt="search button" />
      </button>
    </div>
  );
}

export default Searchbar;
