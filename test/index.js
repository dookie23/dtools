var should = require('chai').should(),
    dtools = require('../index');

describe('#completeZerosLeft', function() {
  it('converts 2 in 4 characters string', function() {
  	out = dtools.completeZerosLeft(2,4)
  	out.should.be.a('string');
    out.should.equal('0002');
    out.should.have.length(4);
  });

  it('converts 24 in 3 characters string', function() {
    dtools.completeZerosLeft(24,3).should.equal('024');
  });
});


describe('#randomInt', function() {
  it('generates an integer in range [0,10]', function() {
    out = dtools.randomInt(0,10);
    out.should.least(0);
    out.should.most(10);
  });

  it('generates an integer in range [2,4]', function() {
    out = dtools.randomInt(2,4);
    out.should.least(2);
    out.should.most(4);
  });
});