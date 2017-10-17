'use strict';

const settings = require('./settings');
const chai = settings.chai;
const server = settings.server;

exports.login = () => {
  return chai.request(server)
    .post('/auth/login')
    .send({
      username: 'admin',
      password: 'admin'
    })
    .then((res) => {
      res.should.have.status(200);
      res.should.be.text; // Unfortunately, this is true :(
      const body = JSON.parse(res.text);
      body.should.be.an('object');
      body.should.have.property('token');
      return body.token;
    });
};
