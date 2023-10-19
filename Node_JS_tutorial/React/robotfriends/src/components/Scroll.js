import React from 'react';
// children
const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll', border: '5px solid black', height: '60vh'}}>
            {props.children}
        </div>
    );
};

export default Scroll;

