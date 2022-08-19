import Card from "./card";
import "./cardContainer.css";
import React from "react";
import { useEffect, useState } from "react";
import jsonObject from "../dummydata.json";
import axios from "axios";

function CardContainer({ query, setCardCount }) {
  const [cardData, setCardData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [firstData, setFirstData] = useState("");
  const [queryData, setQueryData] = useState(query);
  const [newContentVisibility, setNewContentVisibility] = useState("none");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [count, setCount] = useState(0);
  // const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    // console.log(query);
    if (query != "" && query === queryData) {
      // console.log("clicked");
      fetchResult(false);
    }
    if (query != queryData && query != "") {
      fetchResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [query, pageNumber]);

  useEffect(() => {
    const interval = setInterval(() => {
      // fetchNewVersion();
      // console.log("api called");
    }, 10000);
    return () => clearInterval(interval);
  }, [firstData]);

  React.useEffect(() => {
    setCardCount(count);
  }, [cardData]);

  // useEffect(() => {
  // }, [firstData]);

  const fetchNewVersion = () => {
    if (firstData != "" && queryData != "") {
      // fetch(
      //   "https://newsapi.org/v2/everything?q=home&apiKey=5aa1253602fa4f2b985f8bb0909d788d&pageSize=10&page=1"
      //   // +
      //     // pageNumber
      // )
      //   .then((response) => response.json())
      //   .then((result) => {
      //     const data = result;
      //     if (data.totalResults != 0 && firstData != data.articles[0].url) {
      //       const position = window.pageYOffset;
      //       if(position != 0) setNewContentVisibility("block");
      //       if (buttonClicked || position == 0) {
      //         setFirstData(data.articles[0].url);
      //         setCardData(data.articles);
      //         setQueryData(query);
      //         window.scrollTo({ top: 0, behavior: "smooth" });
      //         setButtonClicked(false);
      //         setCount(data.totalResults);
      //       }
      //     }
      //   })
      const url = {
        method: "GET",
        url: "https://api.newscatcherapi.com/v2/search",
        params: {
          q: query,
          lang: "en",
          page: pageNumber,
          page_size: 10,
        },
        headers: {
          "x-api-key": "q4ru5xDKXVoHlJQlACMBoH17MjtBb48hM-k2VH_1t-A",
        },
      };
      axios(url)
        .then((result) => {
          if (
            result.data.total_hits != 0 &&
            firstData != result.data.articles[0]._id
          ) {
            setFirstData(result.data.articles[0]._id);
            setQueryData(query);
            const position = window.pageYOffset;
            if (position != 0) setNewContentVisibility("block");
            if (buttonClicked || position == 0) {
              setCount(result.data.total_hits);
              setCardData(result.data.articles);
              window.scrollTo({ top: 0, behavior: "smooth" });
              setButtonClicked(false);
            }
          }
        })
        .catch((error) => {
          setCardData(jsonObject.articles);
          setCount(10);
          // console.log(error);
        });
    }
  };

  const fetchResult = async (isNew) => {
    // await fetch("https://api.newscatcherapi.com/v2/search?q=" + query + "&lang=en&page-size=10&page=" + pageNumber,{headers: {
    //   'x-api-key' : 'q4ru5xDKXVoHlJQlACMBoH17MjtBb48hM-k2VH_1t-A',
    // }})
    const url = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/search",
      params: {
        q: query,
        lang: "en",
        page: pageNumber,
        page_size: 10,
      },
      headers: {
        "x-api-key": "q4ru5xDKXVoHlJQlACMBoH17MjtBb48hM-k2VH_1t-A",
      },
    };
    await axios(url)
      .then((result) => {
        if (result.data.total_hits != 0)
          setFirstData(result.data.articles[0]._id);
        setQueryData(query);
        setCount(result.data.total_hits);
        // console.log(result.data.total_hits);
        // console.log(result.data);
        result.data.total_pages !== 0 ? isNew
          ? setCardData(result.data.articles)
          : setCardData([...cardData, ...result.data.articles]) : setCardData([]);
      })
      // await fetch(
      //   "https://newsapi.org/v2/everything?q=" +
      //     query +
      //     "&apiKey=fc0cb9d6c6c54c67bf03cd47e76cf813&pageSize=10&page=" +
      //     pageNumber
      // )
      // .then((response) => response.json())
      // .then((result) => {
      //   const data = result;
      //   console.log(data);
      //   // console.log(data.totalResults);
      //   if (data.totalResults != 0) setFirstData(data.articles[0].url);
      //   setQueryData(query);
      //   setCount(data.totalResults);
      //   isNew
      //     ? setCardData(data.articles)
      //     : setCardData([...cardData, ...data.articles]);
      // })
      .catch((error) => {
        setCardData(jsonObject.articles);
        setCardCount(0);
        // console.log(error);
      });

    // const response = await fetch(
    //   "https://newsapi.org/v2/everything?q=" +
    //     query +
    //     "&apiKey=fc0cb9d6c6c54c67bf03cd47e76cf813&pageSize=10&page=" +
    //     pageNumber
    // );
    // const data = await response.json();
    // if (data.totalResults != 0) setFirstData(data.articles[0].url);
    // setQueryData(query);
    // setCount(data.totalResults);
    // isNew
    //   ? setCardData(data.articles)
    //   : setCardData([...cardData, ...data.articles]);
  };
  return (
    <div>
      <button
        id="newContent"
        onClick={() => {
          setNewContentVisibility("none");
          setButtonClicked(true);
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
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        ></button>
      </div>
      {/* <div>{count === lastIndex - 1 && count != 0 ? "NO More News!" : ""}</div> */}
    </div>
  );
}

export default CardContainer;
