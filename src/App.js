import newspapericon from "./images/newspaper-icon.svg";
import Searchbar from "./components/searchbar";
import StatusTile from "./components/updateStatusTile";
import CardContainer from "./components/cardContainer";
import "./App.css";
import React from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";

function App() {
  const [containerHaveCards, setContainerHaveCards] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [scrollVisibility, setScrollVisibility] = React.useState("hidden");

  const handleScroll = () => {
    const position = window.pageYOffset;
    // console.log(position);
    if (position > 500) {
      setScrollVisibility("visible");
    }
    else {
      setScrollVisibility("hidden");
    }
    // const bottom = window.scroll
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if(containerHaveCards === true) containerUp();
  }, [containerHaveCards]);

  var setSearchQuery = (queryData) => {
    setQuery(queryData);
  };

  var setCardCount = (cardCount) => {
    setContainerHaveCards(cardCount === 0 ? false : true);
  };

  var containerUp = () => {
    document.getElementById("container").style.top = "0%";
  };

  var containerDown = () => {
    document.getElementById("container").style.position = "relative";
    document.getElementById("container").style.top = "25%";
  };

  return (
    <div className="App">
      <button id="goTOTop" style={{visibility:scrollVisibility,transition:"visibility 0ms ease-in"}} onClick={() => {window.scrollTo(0,0)}}>TOP</button>
      <header id="title">
        <img src={newspapericon} alt="News flash icon" />
        <h1>News Flash</h1>
      </header>
      <div id="container">
        <StatusTile />
        <Searchbar
          // containerUp={containerUp}
          containerDown={containerDown}
          containerHaveCards={containerHaveCards}
          setSearchQuery={setSearchQuery}
        />
        <CardContainer query={query} setCardCount={setCardCount} />
      </div>
    </div>
  );
}

export default App;
