
import { act, useEffect, useState } from "react";
import NavigationContext from "./NavigationContext";
import { MOVIE_LIST_PAGE_PATH } from "../../constants/constants";

// eslint-disable-next-line react/prop-types
function NavigationProvider({children}) {
    const [path, navigateTo] = useState(window.location.pathname);
    // const [activeData, setSinglePageData] = useState(null);

    useEffect(() => {
        const handlePopState = () => {
            navigateTo(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // useEffect(() => {
    //     window.history.pushState({}, '', path);
    // }, [path]);

    const value = {
        path,
        navigateTo,
        // activeData,
        // setSinglePageData,
    }

    return (<NavigationContext.Provider value={value}>
        {children}
    </NavigationContext.Provider>) ;
}

export default NavigationProvider;