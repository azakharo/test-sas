'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = 'http://sas-test.corp.sarov-itc.ru';

// Init
chai.should();
chai.use(chaiHttp);
console.log('SETTINGS!!!!!!!!!!!!!!!!!!');

module.exports = {
  chai: chai,
  server: server
};
