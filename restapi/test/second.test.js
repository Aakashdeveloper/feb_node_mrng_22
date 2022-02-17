let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Rest Api',() => {
    it('should return status 200 for users',(done) => {
       chai.request(`http://localhost:6800`)
       .get('/users')
       .then((res) => {
           expect(res).to.have.status(200)
           done()
       })
       .catch((err) => {
           throw err
       })
    }),
    it('should return status 404 for user',(done) => {
        chai.request(`http://localhost:6800`)
        .get('/user')
        .then((res) => {
            expect(res).to.have.status(404)
            done()
        })
        .catch((err) => {
            throw err
        })
    }),
    it('should return status 200 for add User',(done) => {
        chai.request(`http://localhost:6800`)
        .post('/addUser')
        .send({"name":"TestUser","isActive":true})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw err
        })
    })

})