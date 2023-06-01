import React, { useState } from 'react';

const SearchArea = ({value, onChange}) => {
    return ( 
        <>
            <input 
                type='text' 
                value={value} 
                onChange={onChange}

            />
        </>
     );
}
 
export default SearchArea;