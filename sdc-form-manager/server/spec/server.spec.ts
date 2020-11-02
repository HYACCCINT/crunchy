import server from '../src/server'
import {} from 'jasmine'
import request from 'supertest'
import {database} from '../src/database'





describe('form', async function() {
    let originalTimeout: number;

    beforeEach(function (done) {
        database.use();
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000000000;
    });
    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
      });

    it('posting', async function(done) {
        const form = await request(server).post('/api/form').send({id:"test1", input:{id:"test1",procedureID:"777.000", docType:"SDCForm"}})
        expect(form.status).toEqual(200)
        console.log(form.status,"???")
        done();

    });

});

// const endpoint = 'http://localhost:5000/api/form';
// beforeEach(function (done) {
//     serverInstance = server.run(done);
// });

// afterEach(function (done) {
//     serverInstance.close(done);
// });
// describe('loading express', function () {

//     it('responds to /', function testSlash(done) {
//     request(server)
//       .get('/api/form', )
//       .expect(200, done);
//     });
//   });
    // describe('form', () => {
    //   it('posting form', (done) => {
    //     request(server)
    //         .post('/api/form')
    //         .send({id:'test11', input:{id:"test11", name:"ewrwerew"}})
    //         .expect(200)
    //         .expect('Content-Type', 'application/json')
    //         .end((error) => (error) ? done.fail(error) : done());
    //   });
    // });

