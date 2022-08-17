import Card from "./card";
import "./cardContainer.css";
import React from "react";

function CardContainer({ query, setCardCount }) {
  const [cardData, setCardData] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  
  React.useEffect(() => {
    if (query != "") {
      fetchResult();
    }
  }, [query]);

  React.useEffect(() => {
    console.log(cardData.length);
    if(cardData.length === 0) {
      setCardCount(0);
    }
    else {
      setCardCount(1);
    }
  }, [cardData]);
  
  const fetchResult = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=" +
        query +
        "&apiKey=fc0cb9d6c6c54c67bf03cd47e76cf813&pageSize=10&page=" +
        pageNumber
    );
    const data = await response.json();
    setCardData(data.articles);

    // setCardData(response.json().articles);
    // await fetch(
    //   "https://newsapi.org/v2/everything?q=" +
    //     query +
    //     "&apiKey=fc0cb9d6c6c54c67bf03cd47e76cf813&pageSize=10&page=" +
    //     pageNumber
    // )
    //   .then((response) => {
    //     if (response.status === "ok") {
    //       return response;
    //     }
    //     // throw new Error("429");
    //   })
    //   .then((result) => {
    //     setCardData(result.articles);
    //   })
    //   .catch((error) => {
    //     // setCardData(jsonObject.articles);
    //   });
  };
  return (
    <div id="card-container">
      {
        cardData != [] && cardData.map((article, index) => {
          return <Card article={article} key={index} />
        })
      }
    </div>
  );
}

export default CardContainer;
