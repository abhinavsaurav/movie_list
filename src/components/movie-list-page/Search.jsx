import React, { useEffect, useRef, useState } from "react";
import classes from "./Search.module.scss";
import { API_KEY, SINGLE_MOVIE_PAGE_PATH } from "../../constants/constants";
import { useNavigation } from "../../hooks/useNavigation";

function Search({ handleSearch }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { navigateTo } = useNavigation();

  const fetchSuggestionData = async () => {
    console.log("fetching suggestion...");
    try {
      const dataFetch = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${value}`
      );
      const dataVal = await dataFetch.json();
      if (dataVal && dataVal["Response"] == "False") {
        setSuggestions([
          {
            Title: dataVal["Error"] ?? "Result not found or Some Error occurred",
            dontNavigate: true,
          },
        ]);
      } else {
        if (dataVal["Search"].length == 0) {
          setSuggestions([
            {
              Title: "No data found",
              dontNavigate: true,
            },
          ]);
        } else {
          setSuggestions(dataVal["Search"]);
        }
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  useEffect(() => {
    const timerid = setTimeout(() => {
      if(value.length>0){
        fetchSuggestionData();
      }
    }, 250);

    return () => clearTimeout(timerid);
  }, [value]);

  useEffect(() => {
    console.log(suggestions);
  }, [suggestions]);

  function handleValueChange(e) {
    const eventVal = e.target.value;
    setValue(eventVal);
  }

  return (
    <div className={classes["search-suggestion-wrapper"]}>
      <div className={classes.wrapper}>
        {/* This needds to be placed in its own search component */}
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleValueChange}
        />
      </div>
      <div className={classes["suggestions-container"]}>
        {(suggestions || []).slice(0,5).map((suggestion, index) => (
          <div key={`${suggestion.imdbID}-${index}`} className={classes["suggestion-item"]} onClick={(e)=>{
            console.log(e.target, suggestion);
            if(suggestion.dontNavigate){
              return;
            }

            navigateTo(`${SINGLE_MOVIE_PAGE_PATH}/${suggestion.imdbID}`);
          }}>
            {suggestion.Title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
