import React, { Fragment }from 'react';
import './CustomKey.css';


const CustomKey = (props) => {

    const { number, letters } = props;

    return (
        <Fragment>
            <div className="single-key-number">
                {number}
            </div>

            <div className="single-key-letters">
                {letters.join('').toUpperCase()}
            </div>     
        </Fragment>
    )
}


export default CustomKey;
