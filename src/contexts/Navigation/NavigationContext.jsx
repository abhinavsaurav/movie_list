import React from 'react';
import { MOVIE_LIST_PAGE_PATH } from '../../constants/constants';

const NavigationContext = React.createContext({
    path: MOVIE_LIST_PAGE_PATH,
    navigateTo: (prev)=> {},
});

export default NavigationContext;