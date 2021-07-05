import React, { Fragment, useState, useEffect }  from 'react';
import axios from 'axios';
import './Main.css';
import CustomKey from '../CustomKey/CustomKey';
import Results from '../Results/Results';


const Main = () => {
    
    const [ numbers , setNumbers ] = useState([]);
    const [ result , setResult ] = useState([]);
    const [ message , setMessage ] = useState([]);

    const keyboard = [
        /* 0 */ [''],
        /* 1 */ [''],
        /* 2 */ ['a', 'b', 'c'],
        /* 3 */ ['d', 'e', 'f'],
        /* 4 */ ['g', 'h', 'i'],
        /* 5 */ ['j', 'k', 'l'],
        /* 6 */ ['m', 'n', 'o'],
        /* 7 */ ['p', 'q', 'r', 's'],
        /* 8 */ ['t', 'u', 'v'],
        /* 9 */ ['w', 'x', 'y', 'z'],
    ];

    const postNumbers = async ( numbers )=> {

        try {

            const response  = await axios.post(`http://localhost:8888/api/post-numbers`,  { numbers } );                    
            const { words , message } = response.data;
                
            setResult( words );
            setMessage( message );
                
        } catch ( e ) {
            e.response ? setResult( e.response.data.words ) : setResult([]);
            e.response ? setMessage( e.response.data.message ) : setMessage( e.message ) 
        }
    }

    const handleNumbersClicked = ( number ) => {
        setNumbers( prevState => [ ...prevState , number ] );
    }

    const handleNumberDelete = () => {
        setNumbers( prevState => prevState.filter( ( _ , index ) => index !== prevState.length - 1 ) );
    }

    useEffect(() => {

        document.querySelector( '.keyboard-input' ).value = [numbers.join('')];
        const timeout = setTimeout(() =>  postNumbers( numbers.join('')), 500 );
        return () => { clearTimeout(timeout); };

    },[numbers]);


    return (
        <Fragment>
            
            <div className='mobile enable-cursor' >
                
                <div className='screen-wrapper'>
                    <Results result={result} message={message}/>
                </div>

                <div className='keyboard-wrapper'>
                    <div className='keyboard-input-wrapper'>
                        <input className='keyboard-input enable-cursor' disabled/>
                        <button className='button enable-cursor' onClick={handleNumberDelete}>&#8592;</button>
                    </div>

                    {keyboard.length && keyboard.map(  ( singleKey, index ) => <div className={`single-key-wrapper-${index} flex-align active-color disable-select`} key={index} onClick={() => handleNumbersClicked(index)} >
                            <CustomKey number={index} letters={singleKey} />
                    </div>) }
                </div>

            </div>
            
        </Fragment>
    );
}


export default Main;
