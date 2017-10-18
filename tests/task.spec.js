'use strict';

const settings = require('./settings');
const chai = settings.chai;
const server = settings.server;
const auth = require('./auth');


describe('media', () => {

  let authToken = null;
  let mediaID = null;
  let taskID = null;

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
        });
    });
  });

  // describe('/GET media list', () => {
  //   it('it should GET all the media files', () => {
  //     return chai.request(server)
  //       .get('/api/media')
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .then((res) => {
  //         res.should.have.status(200);
  //         res.should.be.json;
  //         res.body.should.be.a('array');
  //         res.body.length.should.be.least(1);
  //         mediaID = res.body[0].id;
  //       });
  //   });
  // });
  //
  // describe('/GET media description', () => {
  //   it('it should GET media description by the given id', () => {
  //     return chai.request(server)
  //       .get('/api/media/' + mediaID + '.json')
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .then(res => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('id');
  //         res.body.should.have.property('date_created');
  //         res.body.should.have.property('creator');
  //         res.body.should.have.property('content-type');
  //         res.body.should.have.property('title');
  //       });
  //   });
  // });
  //
  // describe('/GET media file content', () => {
  //   it('it should GET media content by the given id', () => {
  //     return chai.request(server)
  //       .get('/api/media/' + mediaID)
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .then(res => {
  //         res.should.have.status(200);
  //       });
  //   });
  // });
  //
  // describe('/DELETE media', () => {
  //   it('it should DELETE media by the given id', () => {
  //     return chai.request(server)
  //       .delete('/api/media/' + mediaID)
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .then(res => {
  //         res.should.have.status(200);
  //       });
  //   });
  // });
});
