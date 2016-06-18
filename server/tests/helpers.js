const supertest = require('supertest-as-promised')(Promise);
const app = require('../app');
const request = supertest.agent(app);

function sendGet(path, cb) {
  request
    .get(path)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(cb);
}

function sendPost(path, data, cb) {
  request
    .post(path)
    .set('Accept', 'application/json')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(cb);
}

function sendPut(path, data, cb) {
  request
    .put(path)
    .set('Accept', 'application/json')
    .send(data)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(cb);
}

function sendDelete(path, cb) {
  request
    .delete(path)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(cb);
}

module.exports = Object.freeze({
  sendGet,
  sendPost,
  sendPut,
  sendDelete
});
