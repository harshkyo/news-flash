import "./card.css";

function Card({article}) {
  return (
    <div className="card">
        <img src={article.media} alt="" className="cardImage"/>
        <div className="content">
          <div className="newsTitle">
            <h3 className="title">{article.title}</h3>
            <span className="author">By <strong>{article.author}</strong>, published on {article.published_date}</span>
          </div>
          <div className="newsBody"><p>
            {article.summary}<a href={article.link} target="_blank" style={{textDecoration:"none",}}>Read&nbsp;More</a></p></div>
        </div>
    </div>
  );
}
export default Card;
