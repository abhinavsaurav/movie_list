import { useEffect } from "react";
import { useNavigation } from "../../hooks/useNavigation";

function Route({routePath, children}) {
    const { path } = useNavigation();

    if(path.startsWith(routePath)){
        window.history.pushState({}, '', path);
        return children;
    }
    return <></>;
}

export default Route;