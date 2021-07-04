import React, { Fragment, useState, useEffect }  from 'react';
import './Main.css'


const Main = () => {
    
    const [ numbers , setNumbers ] = useState([]);
    
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

    const handleNumbersClicked = (number) => {
        setNumbers(prevState => [...prevState , number] );
    }

    const handleNumberDelete = () => {
        setNumbers( prevState => prevState.filter( ( _ , index) => index !== prevState.length - 1 ) );
    }

    useEffect(() => {

        document.querySelector('.keyboard-input').value = [numbers.join('')];

    },[numbers]);


    return (
        <Fragment>
            
            <div className='mobile enable-cursor' >
                
                <div className='screen-wrapper'>
                    <div> Output from API call : {numbers.join('')} </div>
                </div>

                <div className='keyboard-wrapper'>
                    <div className='keyboard-input-wrapper'>
                        <input className='keyboard-input enable-cursor' disabled/>
                        <button className='button enable-cursor' onClick={handleNumberDelete}>&#8592;</button>
                    </div>

                    {keyboard.length && keyboard.map(  ( singleKey, index ) => <div className={`single-key-wrapper-${index} flex-align active-color disable-select`} key={index} onClick={() => handleNumbersClicked(index)} >
                            <div  className='single-key-number'> {index} </div>
                            <div className='single-key-letters'> {singleKey.join('')}</div>
                    </div>) }
                </div>

            </div>
            
        </Fragment>
    );
}


export default Main;
