const { validateReceivedValue, findWords } = require('../functions/functions.js')

const data = { words: [], message:'' }

const processNumbers = ( req, res ) => {
    const { numbers }  = req.body;

    const { message } = validateReceivedValue( numbers );

    if ( message ) {
        data.words = [];
        data.message = message
        res.status(400).json( data );
    } else {
        const findedWords = findWords( numbers );

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