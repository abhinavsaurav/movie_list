import { useNavigation } from "../../hooks/useNavigation";
import { MOVIE_LIST_PAGE_PATH } from "../../constants/constants";

function Route({routePath, children}) {
    const { path, navigateTo } = useNavigation();

    if(path == "/"){
        navigateTo(MOVIE_LIST_PAGE_PATH);
    }

    if(path.startsWith(routePath)){
        window.history.pushState({}, '', path);
        return children;
    }
    return <></>;
}

export default Route;