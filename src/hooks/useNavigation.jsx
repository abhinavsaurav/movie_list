import { useContext } from "react";
import NavigationContext from "../contexts/Navigation/NavigationContext";

export const useNavigation = function(){
    return useContext(NavigationContext);
}