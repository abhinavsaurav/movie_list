import classes from "./Card.module.scss";

function Card({ Title: title, Poster: poster }) {
  return (
    <div className={classes.card}>
      <div className={classes.border}>
        <div className={classes["image-wrapper"]}>
          <img src={poster} alt={`Picture of ${title}`} fetchPriority="low" />
        </div>
        <div className={classes.body}>{title}</div>
      </div>
    </div>
  );
}

export default Card;
