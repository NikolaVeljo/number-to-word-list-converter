const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const {app , stop} = require('../app.js');


chai.use(chaiHttp);

describe('API testing', () => {

    describe('/POST testing', (done) => {
    
        it('it should post-numbers and return valid result', (done) => {

            let data = {
                numbers: '233'
            }

            chai.request(app)
                .post('/api/post-numbers')
                .send(data)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(data).to.eql(res.body);
                    done();

            });

        });

    });
    
});

after( () => {
    stop()
});