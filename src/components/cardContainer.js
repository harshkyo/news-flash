import Card from "./card";
import "./cardContainer.css";
import React from "react";
import { useEffect, useState } from "react";
import jsonObject from "../dummydata.json"; //when api limit reaches this dummy data is taken insted
import axios from "axios";

function CardContainer({ query, setCardCount }) {
  //loader
  const [loader, setLoader] = useState(false);

  //observer
  const [observerTarget, setObserverTarget] = useState(false);

  const [queryData, setQueryData] = useState(query);
  const [cardData, setCardData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [firstData, setFirstData] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [nothingFound, setNothingFound] = useState(false);

  //load more content button states
  const [newContentVisibility, setNewContentVisibility] = useState("none");
  const [buttonClicked, setButtonClicked] = useState(false);

  //new version of same data
  const [newCardData, setNewCardData] = useState([]);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    if (totalPages !== 0) {
      let callback = (entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting) {
            document.querySelector(".load-more-btn").click();
            console.log("called");
          }
        }
        );
      };
      let options = {
        root: document.querySelector("#container-container"),
        rootMargin: "0px",
        threshold: 1,
      };

      let observer = new IntersectionObserver(callback, options);

      let target = document.querySelector(".observer-target");
      if (target !== null && pageNumber < totalPages) {
        observer.observe(target);
      }
    }
  }, [observerTarget]);

  useEffect(() => {
    const loading = document.querySelector(".loading");
    const button = document.querySelector(".load-more-btn");
    if (loader) {
      loading.style.setProperty("display", `block`);
    } else {
      loading.style.setProperty("display", `none`);
      if (button) button.style.setProperty("display", `block`);
    }
  }, [loader]);

  useEffect(() => {
    if (query !== "" && query === queryData) {
      fetchResult(false);
    }
    if (query !== queryData && query !== "") {
      const button = document.querySelector(".load-more-btn");
      if(button !== null) button.style.setProperty("display", `none`);
      setLoader(true);
      setCardData([]);
      fetchResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [query, pageNumber]);

  useEffect(() => {
    var interval;
    if(firstData != ""){
      interval = setInterval(() => {
      // fetchNewVersion();
    }, 10000);}
    return () => clearInterval(interval);
  }, [firstData]);

  useEffect(() => {
    if (buttonClicked) {
      const button = document.querySelector(".load-more-btn");
      button.style.setProperty("display", `none`);
      setCardData([]);
      setLoader(true);
      setButtonClicked(false);
      setTimeout(() => {
        setCardData(newCardData);
        setCount(newCount);
        setPageNumber(1);
        setLoader(false);
      }, 500);
    }
  }, [buttonClicked]);

  React.useEffect(() => {
    setCardCount(count);
  }, [cardData]);

  const fetchResult = async (isNew) => {
    setLoader(true);
    setNothingFound(false);
    const url = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/search",
      params: {
        q: query,
        lang: "en",
        page: isNew ? 1 : pageNumber,
        page_size: 10,
      },
      headers: {
        "x-api-key": "qL9K79p7jLJzSscZ6MM5_qWyjtyw0Pn_VKl_ROyLWwQ",
      },
    };
    await axios(url)
      .then((result) => {
        if (result.data.total_hits !== 0)
          setFirstData(result.data.articles[0]._id);
        setQueryData(query);
        setCount(result.data.total_hits);
        setNothingFound(result.data.total_hits === 0);
        setTotalPages(result.data.total_pages);
        isNew ? setPageNumber(1) : setPageNumber(pageNumber);
        result.data.total_pages !== 0
          ? isNew
            ? setCardData(result.data.articles)
            : setCardData([...cardData, ...result.data.articles])
          : setCardData([]);
        setLoader(false);
        setTimeout(() => {
          result.data.total_hits === 0
            ? setObserverTarget(false)
            : setObserverTarget(true);
        }, 2000);
      })
      .catch((error) => {
        // setCardData(jsonObject.articles);
        // setCardCount(1);
      });
  };

  const fetchNewVersion = () => {
    if (firstData !== "" && queryData !== "") {
      const url = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search",
        params: {
          q: query,
          lang: "en",
          page: 1,
          page_size: 10,
        },
        headers: {
          "x-api-key": "qL9K79p7jLJzSscZ6MM5_qWyjtyw0Pn_VKl_ROyLWwQ",
        },
      };
      axios(url)
        .then((result) => {
          if (
            result.data.total_hits !== 0 &&
            firstData !== result.data.articles[0]._id
          ) {
            setNewContentVisibility("block");
            console.log("clicked");
            setFirstData(result.data.articles[0]._id);
            setQueryData(query);
            setNewCount(result.data.total_hits);
            setNewCardData(result.data.articles);
            setTimeout(() => {
              result.data.total_hits === 0
                ? setObserverTarget(false)
                : setObserverTarget(true);
            }, 2000);
          }
        })
        .catch((error) => {
          // setCardData(jsonObject.articles);
          // setCount(10);
          // console.log(error);
        });
    }
  };

  const switchWithLoader = () => {
    const button = document.querySelector(".load-more-btn");
    button.style.setProperty("display", `none`);
    if(pageNumber <= totalPages) setLoader(true);
  };

  return (
    <div className="container-container">
      {nothingFound && <div className="no-result">NO Result Found!!</div>}
      <button
        id="newContentbtn"
        onClick={() => {
          setButtonClicked(true);
          setNewContentVisibility("none");
        }}
        style={{ display: newContentVisibility }}
      >
        Load new News
      </button>
      <div id="card-container">
        {cardData !== [] &&
          cardData.map((article, index) => {
            return <Card article={article} key={index} />;
          })}
      </div>
      {count !== 0 && observerTarget && <div className="observer-target"></div>}
      <div className="loading"></div>
      {count !== 0 && pageNumber !== totalPages && (
        <button
          className="load-more-btn"
          onClick={() => {
            switchWithLoader();
            setPageNumber(pageNumber + 1);
          }}
        >
          Load more
        </button>
      )}
      {pageNumber === totalPages && count !== 0 && !loader && (
        <div className="no-more-news">NO More News!</div>
      )}
    </div>
  );
}

export default CardContainer;
