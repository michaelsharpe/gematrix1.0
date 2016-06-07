process.env.NODE_ENV = 'test';
process.env.DATABASE = 'mongodb://root@localhost:27017/gematrix';

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest-as-promised')(Promise);
const app = require('../../server/app');
const request = supertest.agent(global.app);

Object.assign(global, {
  chai,
  expect,
  supertest,
  app,
  request
});
