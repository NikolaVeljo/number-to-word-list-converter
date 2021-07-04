const processNumbers = ( req, res ) => {
    const result  = req.body;

    res.status(200).json( result );
}

module.exports = { processNumbers }