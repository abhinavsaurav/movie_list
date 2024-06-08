import React from 'react';
import { MOVIE_LIST_PAGE_PATH } from '../../constants/constants';

const NavigationContext = React.createContext({
    currentActivePage: MOVIE_LIST_PAGE_PATH,
});

export default NavigationContext;