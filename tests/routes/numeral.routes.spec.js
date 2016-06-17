/* eslint no-undef: 0*/
/* eslint no-unused-expressions: 0*/
/* eslint no-unused-vars: 0*/
const utils = require('../utils');
const {
  sendGet,
  sendPost,
  sendPut,
  sendDelete
} = require('../helpers.js');

function createNumeral(num) {
  return Numeral.create({
    value: num
  });
}

function handleErr(err) {
  expect(err).to.be.null;
}

function expectSuccess(res) {
  expect(res.body).to.have.property('success');
  expect(res.body.success).to.equal(true);
}

describe('Numeral Routes', () => {
  describe('GET /numerals', () => {
    it('should return a 404 if there are no numerals', done => {
      request
        .get('/numerals')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          handleErr(err);

          done();
        });
    });

    it('should return all the numbers', done => {
      const createNumerals = [1, 2, 3, 4, 5, 6, 7, 8].map(val => createNumeral(val));
      const properties = ['id', 'value', 'createdAt', 'updatedAt'];

      Promise.all(createNumerals)
        .then(() => {
          sendGet('/numerals', (err, res) => {
            handleErr(err);
            expectSuccess(res);
            expect(res.body).to.have.property('numerals');
            expect(res.body.numerals.length).to.equal(8);
            const numeral = res.body.numerals[0];

            properties.forEach(prop => {
              expect(numeral).to.have.property(prop);
            });
            expect(numeral).to.not.have.property('entries');
            expect(numeral).to.not.have.property('comments');

            done();
          });
        })
        .catch(handleErr);
    });

    it('should return a single result of a query for a specific number', done => {
      const createNumerals = [1, 2, 3, 4, 5, 6, 7, 8, 216].map(val => createNumeral(val));
      const properties = ['id', 'value', 'createdAt', 'updatedAt', 'entries', 'comments'];
      const value = 216;

      Promise.all(createNumerals)
        .then(numerals => {
          sendGet(`/numerals?value=${value}`, (err, res) => {
            handleErr(err);
            expectSuccess(res);

            expect(res.body).to.have.property('numeral');

            properties.forEach(prop => {
              expect(res.body.numeral).to.have.property(prop);
            });
            expect(res.body.numeral.value).to.equal(value);

            done();
          });
        })
        .catch(handleErr);
    });
  });

  describe('POST /numerals', () => {
    it('should create a new numeral entry', done => {
      const data = {
        value: 1
      };

      sendPost('/numerals', data, (err, res) => {
        handleErr(err);
        expectSuccess(res);
        expect(res.body).to.have.property('numeral');
        expect(res.body.numeral).to.have.property('value');
        expect(res.body.numeral).to.have.property('id');
        expect(res.body.numeral).to.have.property('entries');
        expect(res.body.numeral).to.have.property('comments');
        expect(res.body.numeral.value).to.equal(1);
        expect(res.body.numeral.entries.length).to.equal(0);
        expect(res.body.numeral.entries.length).to.equal(0);

        done();
      });
    });
  });

  describe('GET /numeral/:numeral_id', () => {
    it('should return a specific numeral', done => {
      const val = 200;
      const properties = [
        'id',
        'value',
        'entries',
        'updatedAt',
        'createdAt',
        'comments'
      ];

      createNumeral(val)
        .then(numeral => {
          sendGet(`/numerals/${numeral.id}`, (err, res) => {
            handleErr(err);
            expectSuccess(res);
            expect(res.body).to.have.property('numeral');

            properties.forEach(prop => {
              expect(res.body.numeral).to.have.property(prop);
            });

            expect(res.body.numeral.value).to.equal(val);
            done();
          });
        });
    });
  });

  describe('PUT /numerals/:numeral_id', () => {
    it('should update a numeral', done => {
      const val = 418;
      const data = {
        value: 419
      };
      const properties = [
        'id',
        'value',
        'entries',
        'updatedAt',
        'createdAt',
        'comments'
      ];

      createNumeral(val)
        .then(numeral => {
          sendPut(`/numerals/${numeral.id}`, data, (err, res) => {
            handleErr(err);
            expectSuccess(res);
            expect(res.body).to.have.property('numeral');

            properties.forEach(prop => {
              expect(res.body.numeral).to.have.property(prop);
            });

            expect(res.body.numeral.id).to.equal(numeral.id);
            expect(res.body.numeral.value).to.equal(data.value);
            expect(res.body.numeral.createdAt).to.not.equal(res.body.updatedAt);

            done();
          });
        });
    });
  });

  describe('DELETE /numerals/:numerals_id', () => {
    it('should delete a numeral', done => {
      const value = 53;

      createNumeral(value)
        .then(numeral => {
          sendGet(`/numerals/${numeral.id}`, (err, res) => {
            handleErr(err);
            expect(res.body.numeral.value).to.equal(value);

            sendDelete(`/numerals/${numeral.id}`, (deleteErr, deleteRes) => {
              handleErr(deleteErr);

              expect(deleteRes.body).to.have.property('success');
              expect(deleteRes.body.success).to.equal(true);

              request
                .get(`/numerals/${numeral.id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .end(getErr => {
                  handleErr(getErr);

                  done();
                });
            });
          });
        });
    });
  });

  describe('POST /numerals/:numeral_id/comments', () => {
    it('should attach a comment to a specific numeral', done => {
      const data = {
        content: '2 + 1 + 6 = 9'
      };

      const properties = ['id', 'typeId', 'type', 'owner', 'content', 'createdAt', 'updatedAt'];

      createNumeral(216)
        .then(numeral => {
          sendPost(`/numerals/${numeral.id}/comments`, data, (err, res) => {
            console.log(res.body);
            handleErr(err);
            expectSuccess(res);

            expect(res.body).to.have.property('comment');
            properties.forEach(prop => {
              expect(res.body.comment).to.have.property(prop);
            });

            expect(res.body.comment.type).to.equal('numeral');
            expect(res.body.comment.typeId).to.equal(numeral.id);
            expect(res.body.comment.content).to.equal(data.content);

            done();
          });
        })
        .catch(handleErr);
    });
  });
});
