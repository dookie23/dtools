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


describe('randomInt', function() {
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


describe('numberArray', function() {
  it('generates the array [2013,2014,2015]', function() {
    out = dtools.numberArray(2013,3);
    out[0].should.equal(2013);
    out[1].should.equal(2014);
    out[2].should.equal(2015);
  });

  it('generates the array [2015,2014,2013]', function() {
    out = dtools.numberArray(2013,3, true);
    out[0].should.equal(2015);
    out[1].should.equal(2014);
    out[2].should.equal(2013);
  });

  it('generates an array of 100 consecutive numbers', function() {
    out = dtools.numberArray(1,100);
    out.length.should.equal(100);
  });
});

describe('friendlyDateRepresentation', function() {
  it('today - minutes', function() {
    var d1 = new Date();
    var d2 = new Date(d1.getTime() - (60*1000*30));
    out = dtools.friendlyDateRepresentation(d2.toISOString());
    out.should.contain("Hace 30 minutos");
  });

  it('today - hours', function() {
    var d1 = new Date();
    var d2 = new Date(d1.getTime() - (60*1000*70));
    out = dtools.friendlyDateRepresentation(d2.toISOString());
    out.should.contain("Hace 1 hora");
  });

  it('yesterday', function() {
    out = dtools.friendlyDateRepresentation(new Date(new Date().getTime() - 3600 * 1000 * 24).toString());
    out.should.contain("Ayer");
  });

  it('yesterday (negation)', function() {
    out = dtools.friendlyDateRepresentation(new Date(new Date().getTime() - 3600 * 1000 * 24 * 3).toString());
    out.should.not.contain("Ayer");
  });

  it('a day', function() {
    out = dtools.friendlyDateRepresentation("2001-01-10");
    out.should.contain("10/01 a las 00:00");
  });

  it('other day', function() {
    out = dtools.friendlyDateRepresentation("2001-01-24T23:15:00.000Z");
    out.should.contain("24/01 a las 23:15");
  });

});

