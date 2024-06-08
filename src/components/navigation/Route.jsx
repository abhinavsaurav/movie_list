import { useNavigation } from "../../hooks/useNavigation";

function Route({routePath, children}) {
    const { path } = useNavigation();

    if(path == routePath){
        return children;
    }
    return <></>;
}

export default Route;