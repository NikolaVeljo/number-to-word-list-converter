import React, { Fragment }from 'react';
import './Results.css';


const Results = (props) => {

    const { result, message } = props;

    return (
        <Fragment>
            <div className="result-message"> {message} </div>
                    
            <ul className="result-list">
                { result.length > 0 && result.map( ( value, index ) => { 
                return ( <li className="result-item" key={index}> {value} </li> )
                }) }
            </ul>  
        </Fragment>
    )
}


export default Results;


