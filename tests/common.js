const config = require('../config');

process.env.NODE_ENV = 'test';
process.env.DATABASE = config.db.test;

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest-as-promised')(Promise);
const app = require('../app');
const request = supertest.agent(app);
const Numeral = require('../models/numeral');
const Comment = require('../models/comment');
const Entry = require('../models/entry');

Object.assign(global, {
  chai,
  expect,
  supertest,
  app,
  request,
  Numeral,
  Comment,
  Entry
});
