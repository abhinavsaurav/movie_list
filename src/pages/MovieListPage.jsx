// import React from 'react';

import { useCallback, useEffect, useRef } from "react";
import Card from "../components/Card";
import classes from "./MovieListPage.module.scss";
import Loader from "../components/Loader";

function MovieListPage({ data, setPage, isLoading }) {

  const observer = useRef(null);

  const lastObserverRef = useCallback((node)=>{
    // console.log("-->",node);
    if(!node)return;
    if(isLoading)return;
    if(observer.current)observer.current.disconnect();
    observer.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting){
        setPage(prev=>prev+1);
      }
    },{
      threshold: 1,
    });
    observer.current.observe(node);
  },[isLoading, setPage]); 
  
  return (
    <div className="common-padding">
      <div className={classes.container}>
        <div className={classes["child-container"]}>
            {data.map((datum, index) => {
              return (
                <div key={`${datum.imdbID}-${index}`} ref={index === (data.length -4)? lastObserverRef : null} className={classes.card}>
                  <Card key={datum.imdbID} {...datum} />
                </div>
              );
            }
            )}
        </div>
      </div>
      {isLoading && <Loader /> }
    </div>
  );
}

export default MovieListPage;
