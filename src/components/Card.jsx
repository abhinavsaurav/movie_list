import { SINGLE_MOVIE_PAGE_PATH } from "../constants/constants";
import { useNavigation } from "../hooks/useNavigation";
import classes from "./Card.module.scss";

function Card({ Title: title, Poster: poster, imdbID }) {
  const {navigateTo} = useNavigation();

  return (
    <div className={classes.card} onClick={()=>{
      const path = `${SINGLE_MOVIE_PAGE_PATH}/${imdbID}`;
      navigateTo(path);
    }}>
      <div className={classes.border}>
        <div className={classes["image-wrapper"]}>
          <img src={poster} alt={`Picture of ${title}`} />
        </div>
        <div className={classes.body}>{title}</div>
      </div>
    </div>
  );
}

export default Card;
