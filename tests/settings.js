'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

// Init
chai.should();
chai.use(chaiHttp);

module.exports = {
  chai: chai,
  server: 'http://sas-test.corp.sarov-itc.ru',
  user: 'zakhar',
  password: 'zakhar'
};
