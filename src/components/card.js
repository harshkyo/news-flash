import "./card.css";

function Card({article}) {
  return (
    <div className="card">
        <img src={article.urlToImage} alt="" className="cardImage"/>
        <div className="content">
          <div className="newsTitle">
            <h3 className="title">{article.title}</h3>
            <span className="author">By <strong>{article.author}</strong>, published on {article.publishedAt}</span>
          </div>
          <div className="newsBody"><p>
            {article.description}<a href={article.url} target="_blank" style={{textDecoration:"none",}}>Read&nbsp;More</a></p></div>
        </div>
    </div>
  );
}
export default Card;
