import React, { useEffect } from 'react';
import classes from './Search.module.scss';

function Search({handleSearch}) {
    const [value,setValue] = React.useState("");

    useEffect(()=>{
        const timerid = setTimeout(()=>{
            
        }, 300);

        return ()=> clearTimeout(timerid);
    },[value]);

    function handleValueChange(e){ 
        const eventVal = e.target.value;
        setValue(eventVal);
    }

    return (<div>
            <div className={classes.wrapper}>
            {/* This needds to be placed in its own search component */}
            <input type="text" placeholder="Search..."  value={value} onChange={handleValueChange}/> 
        </div>
        <div>
            <div>Show search suggestions</div>
        </div>
    </div>);
}

export default Search;