import { useEffect, useState } from "react";
import "./App.css";
import SingleMoviePage from "./pages/SingleMoviePage";
import MovieListPage from "./pages/MovieListPage";
import Router from "./contexts/Navigation/NavigationProvider";
import Header from "./components/Header";
import {
  MOVIE_LIST_PAGE_PATH,
  SINGLE_MOVIE_PAGE_PATH,
} from "./constants/constants";
import Route from "./components/navigation/Route";

let apiCallCount = 0;

function App() {
  
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalSearchResult, setTotalSearchResult] = useState(null);

  async function fetchMovieData(isInitialFetch) {
    try{
      console.log("data length", data.length, totalSearchResult);
      if (isInitialFetch || (totalSearchResult!=null && data.length < totalSearchResult)) {
        setLoading(true);
        const dataFetch = await fetch(
          `https://www.omdbapi.com/?apikey=b9bd48a6&s=marvel&&page=${page}`
        );
        const dataVal = await dataFetch.json();
        if(dataVal && !dataVal["Response"]){
          alert("some error occurred refresh the page");
        }
        if (isInitialFetch) {
          setTotalSearchResult(dataVal["totalResults"]);
        }
        setLoading(false);
        setData(prev=>[...prev,...(dataVal["Search"] ?? [])]);
      }else{
        setLoading(false);
      }
    }catch(error){
      setLoading(false);
      console.error("Error occurred while fetching data");
    }
    
  }

  useEffect(() => {
    if(apiCallCount==0){
      fetchMovieData(true);
      ++apiCallCount;
    }
  }, []);

  useEffect(()=>{
    console.log("Page: ,Fetching new data", page);
    fetchMovieData();
  }, [page]);

  return (
    <>
      <div>
        <Router>
          <Header />
          <Route routePath={MOVIE_LIST_PAGE_PATH}>
            <MovieListPage data={data} setPage={setPage} isLoading={loading}/>
          </Route>
          <Route routePath={SINGLE_MOVIE_PAGE_PATH}>
            <SingleMoviePage />
          </Route>
        </Router>
      </div>
    </>
  );
}

export default App;
