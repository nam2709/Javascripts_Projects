import React from 'react';
// seacrhfield,
const SearchBox = ({ searchChange}) => {
    return (
        <div className='pa2'>
            <input onChange={searchChange} className='pa3 ba b--green bg-lightest-blue' type="search" placeholder='seacrh robots' />
        </div>
    );
}

export default SearchBox