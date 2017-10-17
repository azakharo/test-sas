'use strict';

const settings = require('./settings');
const chai = settings.chai;
const server = settings.server;
const auth = require('./auth');


describe('media', () => {

  let authToken = null;

  before(() => {
    return auth.login().then((token) => {
      authToken = token;
    });
  });

  beforeEach(() => {
    return console.log('beforeEach');
  });

  describe('/GET media list', () => {
    it('it should GET all the media files', () => {
      return chai.request(server)
        .get('/api/media')
        .set('Authorization', `Bearer ${authToken}`)
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
        });
    });
  });
  // describe('/POST book', () => {
  //   it('it should not POST a thing without name field', () => {
  //     return chai.request(server)
  //       .post('/api/things')
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .send({})
  //       .catch((err) => {
  //         err.should.have.status(400);
  //         err.should.have.property('response');
  //         err.response.should.have.property('text');
  //         err.response.text.should.be.a('string');
  //         err.response.text.should.eql('name is missing');
  //       });
  //   });
  //   it('it should POST a thing', () => {
  //     const thing = {
  //       name: 'a thing'
  //     };
  //     return chai.request(server)
  //       .post('/api/things')
  //       .set('Authorization', `Bearer ${authToken}`)
  //       .send(thing)
  //       .then((res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.an('object');
  //         res.body.should.have.property('name');
  //       });
  //   });
  // });
  // describe('/GET/:id thing', () => {
  //   it('it should GET a thing by the given id', () => {
  //     const thing = new Thing({name: 'a new thing'});
  //     return thing.save()
  //       .then(savedThing => {
  //         return chai.request(server)
  //           .get('/api/things/' + savedThing._id)
  //           .then(res => {
  //             res.should.have.status(200);
  //             res.body.should.be.a('object');
  //             res.body.should.have.property('name');
  //             res.body.name.should.equal('a new thing');
  //           });
  //       });
  //   });
  // });
  // describe('/PUT/:id thing', () => {
  //   it('it should UPDATE a thing given the id', () => {
  //     const thing = new Thing({name: 'a new thing'});
  //     return thing.save()
  //       .then(thingCreated => {
  //         return chai.request(server)
  //           .put('/api/things/' + thingCreated._id)
  //           .set('Authorization', `Bearer ${authToken}`)
  //           .send({name: 'modified thing'})
  //           .then(res => {
  //             res.should.have.status(200);
  //             res.body.should.be.a('object');
  //             res.body.should.have.property('name').equal('modified thing');
  //           });
  //     });
  //   });
  // });
  // describe('/DELETE/:id thing', () => {
  //   it('it should DELETE a thing given the id', () => {
  //     const thing = new Thing({name: 'a new thing'});
  //     return thing.save()
  //       .then(newThing => {
  //         return chai.request(server)
  //           .delete('/api/things/' + newThing._id)
  //           .set('Authorization', `Bearer ${authToken}`)
  //           .then(res => {
  //             res.should.have.status(200);
  //             res.should.have.property('text');
  //             res.text.should.be.a('string');
  //             res.text.should.equal('OK');
  //           });
  //       });
  //   });
  // });
});
