var chai = require('chai');
var chaiHttp = require('chai-http');
var User = require('../models/users.js');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);



it('should add a SINGLE user on / POST', function(done) {
  chai.request(server)
  .post('/')
  .send({'name': 'Java', 'age': 22, 'gender': 'Female', 'quote': 'hello', 
    'image': '/home/photos/me.jpg', 
    'answer1': 'PC', 
    'answer2': 'iOS', 
    'answer3': 'React', 
    'answer4': 'mySQL', 
    'answer5': 'Node.js', 
    'answer6': 'Front-End', 
    'matchpoints': 0
  })

  .end(function(err, res){
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('SUCCESS');
    res.body.SUCCESS.should.be.a('object');
    res.body.SUCCESS.should.have.property('name');
    res.body.SUCCESS.should.have.property('age');
    res.body.SUCCESS.name.should.equal('Java');
    res.body.SUCCESS.age.should.equal(22);
    done();
  });
});