import server from '../src/server'
import {} from 'jasmine'
import request from 'supertest'
// import {database} from '../src/database'

describe('form', function() {
    it('getting', function(done) {
        request(server)
        .get('/apitest/form')
        .expect([{id:"test1", procedureID:"777.000", docType:"SDCForm"}])
        .expect(200, done);
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

