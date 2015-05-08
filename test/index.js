var should = require('chai').should(),
    dtools = require('../dtools');

describe('#completeZerosLeft', function() {
    it('converts 2 in 4 characters string', function() {
        out = dtools.completeZerosLeft(2, 4)
        out.should.be.a('string');
        out.should.equal('0002');
        out.should.have.length(4);
    });

    it('converts 24 in 3 characters string', function() {
        dtools.completeZerosLeft(24, 3).should.equal('024');
    });
});


describe('randomInt', function() {
    it('generates an integer in range [0,10]', function() {
        out = dtools.randomInt(0, 10);
        out.should.least(0);
        out.should.most(10);
    });

    it('generates an integer in range [2,4]', function() {
        out = dtools.randomInt(2, 4);
        out.should.least(2);
        out.should.most(4);
    });
});


describe('numberArray', function() {
    it('generates the array [2013,2014,2015]', function() {
        out = dtools.numberArray(2013, 3);
        out[0].should.equal(2013);
        out[1].should.equal(2014);
        out[2].should.equal(2015);
    });

    it('generates the array [2015,2014,2013]', function() {
        out = dtools.numberArray(2013, 3, true);
        out[0].should.equal(2015);
        out[1].should.equal(2014);
        out[2].should.equal(2013);
    });

    it('generates an array of 100 consecutive numbers', function() {
        out = dtools.numberArray(1, 100);
        out.length.should.equal(100);
    });
});

describe('friendlyDateRepresentation', function() {
    it('today - minutes', function() {
        var d1 = new Date();
        var d2 = new Date(d1.getTime() - (60 * 1000 * 30));
        out = dtools.friendlyDateRepresentation(d2.toISOString());
        out.should.contain("Hace 30 minutos");
    });

    it('today - hours', function() {
        var d1 = new Date();
        var d2 = new Date(d1.getTime() - (60 * 1000 * 60));
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
        out.should.contain("10 de Enero");
    });

    it('other day', function() {
        out = dtools.friendlyDateRepresentation("2001-01-24T23:15:00.000Z");
        out.should.contain("24 de Enero");
    });

});


describe('jsonKeyCharReplacing', function() {

    var testJSON = {};

    beforeEach(function(done) {
        testJSON = {
            "test.con": [],
            "test2.con": {
                "test3.con": [{
                    "test4.con": "hello"
                }],
                "test5.con": "hello.man"
            },
            "test6.con": "hi.",
            "test7con": {
                "test8con": [{
                    "test9.con": "hello"
                }],
                "test.10.con": "hello.man"
            }
        };
        done();
    });


    it('replace - first level keys', function() {
        out = dtools.jsonKeyCharReplacing(testJSON, "\.", "_", false);
        out.test2_con["test5.con"].should.be.equal("hello.man");
        out.test6_con.should.be.equal("hi.");
    });

    it('replace - all keys', function() {
        out = dtools.jsonKeyCharReplacing(testJSON, "\.", "_", true);
        out.test2_con["test5_con"].should.be.equal("hello.man");
        out.test2_con.test3_con[0]["test4_con"].should.be.equal("hello");
        out.test7con.test8con[0]["test9_con"].should.be.equal("hello");
        out.test7con.test_10_con.should.be.equal("hello.man");
    });
});



describe('cleanArray', function() {

    var testArray = [];

    beforeEach(function(done) {
        testArray = ['Local','','','Visitante','','','',];
        done();
    });


    it('clean array basic', function() {
        out = dtools.cleanArray(testArray);
        out.length.should.be.equal(2);
        out[0].should.be.equal("Local");
        out[1].should.be.equal("Visitante");
    });

        it('clean array custom blank element', function() {
        out = dtools.cleanArray(testArray, 'Local');
        out.length.should.be.equal(1);
        out[0].should.be.equal("Visitante");
    });

});




describe('findStringInArray', function() {

    var testArray = [];

    beforeEach(function(done) {
        testArray = ['Local','','','Visitante y más','','','',];
        done();
    });


    it('findStringInArray (no stricted)', function() {
        out = dtools.findStringInArray("Visitante", testArray, false);
        out.should.be.equal(true);
        out = dtools.findStringInArray("Local", testArray, false);
        out.should.be.equal(true);
    });

    it('findStringInArray (stricted)', function() {
        out = dtools.findStringInArray("Visitante", testArray, true);
        out.should.be.equal(false);
        out = dtools.findStringInArray("Local", testArray, true);
        out.should.be.equal(true);
    });


});