import { MOVIE_LIST_PAGE_PATH } from "../constants/constants";
import { useNavigation } from "../hooks/useNavigation";
import classes from "./Header.module.scss";
import Search from "./movie-list-page/Search";

function Header() {
  const {path, navigateTo } = useNavigation();

  return (
    <div>
      
    <header className={classes.header}>
      <div className={classes["site-logo"]}>Movie List</div>
      <a className={classes["home-link"]} onClick={()=>{
        navigateTo(MOVIE_LIST_PAGE_PATH);
      }}>Home</a>
    </header>
    {path === '/' && <Search />}
    </div>
  );
}

export default Header;
