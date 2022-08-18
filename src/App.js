import newspapericon from "./images/newspaper-icon.svg";
import Searchbar from "./components/searchbar";
import CardContainer from "./components/cardContainer";
import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";

function App() {
  const [containerHaveCards, setContainerHaveCards] = useState(false);
  const [query, setQuery] = useState("");
  // const [resultCount, setResultCount] = useState(0);
  const [scrollVisibility, setScrollVisibility] = useState("hidden");

  //This function handles visibility of go to top button.
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 500) {
      setScrollVisibility("visible");
    } else {
      setScrollVisibility("hidden");
    }
  };

  //This hook handles the event listener for handleScroll function
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //This hook moves search bar up if cards are loaded in container
  useEffect(() => {
    if (containerHaveCards === true) containerUp();
  }, [containerHaveCards]);

  var setSearchQuery = (queryData) => {
    setQuery(queryData);
  };

  var setCardCount = (cardCount) => {
    setContainerHaveCards(cardCount === 0 ? false : true);
    // setResultCount(cardCount);
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
      <button
        id="goTOTop"
        style={{
          visibility: scrollVisibility,
          transition: "visibility 0ms ease-in",
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        TOP
      </button>
      <header id="title">
        <img src={newspapericon} alt="News flash icon" />
        <h1>News Flash</h1>
      </header>
      <div id="container">
        <Searchbar
          // containerUp={containerUp}
          containerDown={containerDown}
          containerHaveCards={containerHaveCards}
          setSearchQuery={setSearchQuery}
          // resultCount={resultCount}
        />
        <CardContainer query={query} setCardCount={setCardCount} />
      </div>
    </div>
  );
}

export default App;
