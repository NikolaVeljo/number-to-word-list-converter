const { keyboard, words } = require('../data/data.js');

const validateReceivedValue = ( input ) => {

    if( input.includes( '0' ) || input.includes( '1' ) ){
        return new Error( `Numbers 0 and 1 don't have letters choose another!` );
    }

    let number = Number( input );

    if(number.length <= 1){
        return new Error( 'You must provide more than one number!' );
    }

    if( Math.sign( number ) === -1 ){
        return new Error( 'Must provide a positive number!' );
    }
  
    if( isNaN( number ) ) {
        return new Error( 'Must provide a number!' );
    }
  
    if( !Number.isInteger( number ) ) {
        return new Error('Must provide a whole number!');
    }
  
    if( !Number.isSafeInteger( number ) ) {
        return new Error('You have exceeded the maximum safe Integer value!');
    }

    return { message: '' };
}

const findAllCombinations = ( packs, numbersIndex, letterIndex, word, wordList ) => {

  let newWord = word + packs[numbersIndex][letterIndex];

    if ( letterIndex > 0 ) {
        findAllCombinations( packs, numbersIndex, letterIndex - 1, word, wordList );
    }

    if ( numbersIndex < packs.length - 1 ) {
        findAllCombinations( packs, numbersIndex + 1, packs[numbersIndex + 1].length - 1, newWord, wordList );
    }

    if ( newWord.length < packs.length ) {
        return;
    }

    wordList.push( newWord );
}

const findWords = ( input ) => {

  let wordList = [];
  
  let packs = input.split('').map( ( n ) => keyboard[n] );

  findAllCombinations( packs, 0, packs[0].length - 1, '', wordList );

  let wordsFromDictionary = [];
  
    wordList.forEach( ( word ) => {

        if ( words[word] ) {
          wordsFromDictionary.push( words[word] );
        }

    });

  return wordsFromDictionary;
}

module.exports = {
  validateReceivedValue,
  findWords
}

