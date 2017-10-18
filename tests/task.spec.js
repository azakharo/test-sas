'use strict';

const settings = require('./settings');
const chai = settings.chai;
const server = settings.server;
const auth = require('./auth');


describe('tasks', () => {

  let authToken = null;
  let mediaID = null;
  let taskID = null;
  let taskEtag = null;

  before(() => {
    return auth.login()
      .then((token) => {
        authToken = token;
      })
      .then(() => {
        return chai.request(server)
          .get('/api/media')
          .set('Authorization', `Bearer ${authToken}`)
          .then((res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.be.least(1);
            mediaID = res.body[0].id;
          });
      });
  });

  describe('/POST task', () => {
    it('it should POST a new task', () => {
      return chai.request(server)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          media: `${mediaID}`
        })
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('_id');
          taskID = res.body['_id'];
          taskEtag = res.body['_etag'];
        });
    });
  });

  describe('/GET task list', () => {
    it('it should GET all tasks', () => {
      return chai.request(server)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('data');
          let data = res.body.data;
          data.should.be.a('array');
          data.length.should.be.least(1);
        });
    });
  });

  describe('/GET task by ID', () => {
    it('it should GET task by ID', () => {
      return chai.request(server)
        .get('/api/tasks/' + taskID)
        .set('Authorization', `Bearer ${authToken}`)
        .then(res => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('media');
          res.body.should.have.property('state');
          res.body.should.have.property('creator');
        });
    });
  });

  describe('/DELETE task', () => {
    it('it should DELETE task by ID', () => {
      return chai.request(server)
        .delete('/api/tasks/' + taskID)
        .set('Authorization', `Bearer ${authToken}`)
        .set('If-Match', taskEtag)
        .then(res => {
          res.should.have.status(204);
        });
    });
  });
});
