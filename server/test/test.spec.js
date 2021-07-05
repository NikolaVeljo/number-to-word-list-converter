const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const {app , stop} = require('../app.js');
const { validateReceivedValue, findWords } = require('../functions/functions.js')


chai.use(chaiHttp);

describe('API testing', () => {

    describe('/POST post-numbers', () => {
    
        it('it should post-numbers and return status 200', ( done ) => {

            let data = {
                numbers: '23'
            }

            chai.request( app )
                .post( '/api/post-numbers' )
                .send( data )
                .end( ( err, res ) => {
                    expect( res.status ).to.equal( 200 );
                    done();
            });

        });

        it('it should return status 400 and Must provide a number', ( done ) => {

            let data = {
                numbers: 'sdfgsdfg'
            }

            chai.request( app )
                .post( '/api/post-numbers' )
                .send( data ) 
                .end( ( err, res ) => {
                    expect( res.status ).to.equal( 400 );
                    expect( res.body.message ).to.equal( 'Must provide a number!' );
                    done();
            });

        });

        it('it should return status 400 and Must provide a positive number', ( done ) => {

            let data = {
                numbers: '-23'
            }

            chai.request(app)
                .post( '/api/post-numbers' )
                .send( data )
                .end( ( err, res ) => {
                    expect( res.status ).to.equal( 400 );
                    expect( res.body.message ).to.equal( 'Must provide a positive number!' );
                    done();
            })

        });

    });

    describe('/GET post-numbers', () => {
    
        it('it should get an error message ', ( done ) => {
            chai.request( app )
                .get( '/api/post-numbers' )
                .end( ( err, res ) => {
                    expect( res.status ).to.equal( 404 );
                done();
            });
        });
    
    });

});


describe('Function findWords testing', () => {

    it('Should return array with 2 elmenets', ( done ) => {
        const result = findWords( '7277687' );

        expect(result).to.be.a( 'array' );
        expect(result.length).to.be.equal( 2 );
        expect(result).to.include( 'parrots' );
        done();
    });

    it('Should return empty array', ( done ) => {
        const result = findWords( '233445533123' );

        expect(result).to.be.a( 'array' );
        expect(result.length).to.be.equal( 0 );

        done();
    });
});


describe('Function validateRecievedValue testing', () => {

    it('Should error ', ( done ) => {
        const result = validateReceivedValue( '-234234' );
             
        expect(result.message).to.equal( 'Must provide a positive number!' );
        expect(result.name).to.equal( 'Error' )
        
        done();
    });

    it('Should error ', ( done ) => {
        const result = validateReceivedValue( '3456345.634563456234' );
             
        expect(result.message).to.equal( 'Must provide a whole number!' );
        expect(result.name).to.equal( 'Error' );
        
        done();
    });

    it('Should return message with 0 length', ( done ) => {
        const result = validateReceivedValue( '2333' );

        expect(result).to.be.an( 'object' );
        expect(result.message.length).to.be.equal( 0 );

        done();
    });

});


after( () => {
    stop();
});