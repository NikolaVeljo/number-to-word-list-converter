const { validateReceivedValue, findWords } = require('../functions/functions.js')
const NodeCache = require( "node-cache" );

const resultsCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const data = { words: [], message:'' }

const processNumbers = ( req, res ) => {
    const { numbers }  = req.body;

    const { message } = validateReceivedValue( numbers );

    if ( message ) {
        data.words = [];
        data.message = message
        res.status(400).json( data );
    } else {
        let findedWords;

        if ( resultsCache.get( `${numbers}`) ) {

            findedWords = resultsCache.get( `${numbers}`)

        } else {
            findedWords = findWords( numbers );
            resultsCache.set( `${numbers}`, findedWords, 10000 );
        }

        if ( findedWords.length !== 0){
            data.message = 'Result';
        } else {
            data.message = 'We could not find any word in our dictionary that is mattching you pattern!';
        }

        data.words = findedWords;

        res.status(200).json( data );
    }

}

module.exports = { processNumbers }