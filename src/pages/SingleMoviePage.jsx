import React, { useEffect, useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { API_KEY, MOVIE_LIST_PAGE_PATH } from "../constants/constants";
import classes from "./SingleMoviePage.module.scss";

function SingleMoviePage(props) {
  const { navigateTo } = useNavigation();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(()=>{
      const moviePath = window.location.pathname;
      // console.log(moviePath);
      const imdbId = moviePath.split("/")[2];
      if (!imdbId) {
        navigateTo(MOVIE_LIST_PAGE_PATH);
      } else {
        console.log("fetchMovieData");
          fetchMovieData(imdbId);
      }
    },200);

    return ()=> clearTimeout(timerId);
  }, []);

  async function fetchMovieData(id) {
    try {
      setLoading(true);
      console.log(id);
      const dataFetch = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
      );
      const dataVal = await dataFetch.json();
      if (dataVal && !dataVal["Response"]) {
        alert("some error occurred refresh the page");
        throw Error(dataVal["Error"] ?? "Error calling the api");
      }
        setMovieData(dataVal);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred while fetching data", error);
      alert(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.details}>
      <div className={classes.imgContainer}>
        <div>
          <img src={movieData?.Poster} alt={movieData?.Title} />
        </div>
      </div>
      {/* movie name */}
      <h2
        className={classes.heading}
      >{`${movieData?.Title} (${movieData?.Year})`}</h2>
      {/* Row of 3 elements */}
      <div className={classes.section}>
        <div className={classes.section2}>
          <div className={classes.heading}>Genre</div>
          <div>{movieData?.Genre}</div>
        </div>

        <div className={classes.section2}>
          <div className={classes.heading}>Running Time</div>
          <div>{movieData?.Runtime}</div>
        </div>
        <div className={classes.section2}>
          <div className={classes.heading}>Rating</div>
          <div>{movieData?.Ratings?.[0]?.Value ?? ""}</div>
        </div>
      </div>
      <div className={`${classes.section2}`}>
        <div className={classes.heading }>Plot</div>
        <div>{movieData?.Plot}</div>
      </div>
      <div className={`${classes.section2}`}>
        <div className={classes.heading }>Actors</div>
        <div>{movieData?.Actors}</div>
      </div>
    </div>
  );
}

export default SingleMoviePage;
