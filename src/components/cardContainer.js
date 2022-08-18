import Card from "./card";
import "./cardContainer.css";
import React from "react";
import { useEffect, useState } from "react";
import jsonObject from "../dummydata.json";

function CardContainer({ query, setCardCount }) {
  const [cardData, setCardData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [firstData, setFirstData] = useState("");
  const [queryData, setQueryData] = useState(query);
  const [newContentVisibility, setNewContentVisibility] = useState("none");
  // const [count, setCount] = useState(0);
  // const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    if (query != "" && query === queryData) {
      fetchResult(false);
    }
    if (query != queryData) {
      fetchResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [query, pageNumber]);

  useEffect(() => {
    const interval = setInterval(() => {
      // fetchNewVersion();
      // console.log("api called");
    }, 30000);
    return () => clearInterval(interval);
  }, [firstData]);

  // React.useEffect(() => {
  //   // setCardCount(count);
  // }, [cardData]);

  // useEffect(() => {
  // }, [firstData]);

  const fetchNewVersion = () => {
    if (firstData != "") {
      fetch(
        "https://newsapi.org/v2/everything?q=" +
          query +
          "&apiKey=5aa1253602fa4f2b985f8bb0909d788d&pageSize=10&page=" +
          pageNumber
      )
        .then((response) => response.json())
        .then((result) => {
          const data = result;
          if (data.totalResults != 0 && firstData != data.articles[0].url) {
            setNewContentVisibility("block");
            setFirstData(data.articles[0].url);
            setCardData(data.articles);
            setQueryData(query);
            window.scrollTo({ top: 0, behavior: "smooth" });
            // setCount(data.totalResults);
          }
        })
        .catch((error) => {
          setCardData(jsonObject.articles);
          // console.log(error);
        });
    }
  };

  const fetchResult = async (isNew) => {
    await fetch(
      "https://newsapi.org/v2/everything?q=" +
        query +
        "&apiKey=5aa1253602fa4f2b985f8bb0909d788d&pageSize=10&page=" +
        pageNumber
    )
      .then((response) => response.json())
      .then((result) => {
        const data = result;
        // console.log(data.totalResults);
        if (data.totalResults != 0) setFirstData(data.articles[0].url);
        setQueryData(query);
        // setCount(data.totalResults);
        test = 1;
        isNew
          ? setCardData(data.articles)
          : setCardData([...cardData, ...data.articles]);
      })
      .catch((error) => {
        setCardData(jsonObject.articles);
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
      <button id="newContent" onClick={() => setNewContentVisibility("none")} style={{display:newContentVisibility,}}>Load new News</button>
      <div id="card-container">
        {cardData != [] &&
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
