'use strict';

var should = require('chai').should();
var expect = require('chai').expect;
var dtools = require('../dtools');

describe('#completeZerosLeft', function() {
    it('converts 2 in 4 characters string', function() {
        var out = dtools.completeZerosLeft(2, 4)
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
        var out = dtools.randomInt(0, 10);
        out.should.least(0);
        out.should.most(10);
    });

    it('generates an integer in range [2,4]', function() {
        var out = dtools.randomInt(2, 4);
        out.should.least(2);
        out.should.most(4);
    });
});

describe('numberArray', function() {
    it('generates the array [2013,2014,2015]', function() {
        var out = dtools.numberArray(2013, 3);
        out[0].should.equal(2013);
        out[1].should.equal(2014);
        out[2].should.equal(2015);
    });

    it('generates the array [2015,2014,2013]', function() {
        var out = dtools.numberArray(2013, 3, true);
        out[0].should.equal(2015);
        out[1].should.equal(2014);
        out[2].should.equal(2013);
    });

    it('generates an array of 100 consecutive numbers', function() {
        var out = dtools.numberArray(1, 100);
        out.length.should.equal(100);
    });
});

describe('friendlyDateRepresentation', function() {
    it('today - minutes', function() {
        var d1 = new Date();
        var d2 = new Date(d1.getTime() - (60 * 1000 * 30));
        var out = dtools.friendlyDateRepresentation(d2.toISOString());
        out.should.contain('Hace 30 minutos');
    });

    it('today - hours', function() {
        var d1 = new Date();
        var d2 = new Date(d1.getTime() - (60 * 1000 * 60));
        var out = dtools.friendlyDateRepresentation(d2.toISOString());
        out.should.contain('Hace 1 hora');
    });

    it('yesterday', function() {
        var out = dtools.friendlyDateRepresentation(new Date(new Date().getTime() - 3600 * 1000 * 24).toString());
        out.should.contain('Ayer');
    });

    it('yesterday (negation)', function() {
        var out = dtools.friendlyDateRepresentation(new Date(new Date().getTime() - 3600 * 1000 * 24 * 3).toString());
        out.should.not.contain('Ayer');
    });

    it('a day', function() {
        var out = dtools.friendlyDateRepresentation('2001-01-10');
        out.should.contain('10 de Enero');
    });

    it('other day', function() {
        var out = dtools.friendlyDateRepresentation('2001-01-24T23:15:00.000Z');
        out.should.contain('24 de Enero');
    });

});

describe('jsonKeyCharReplacing', function() {

    var testJSON = {};

    beforeEach(function(done) {
        testJSON = {
            'test.con': [],
            'test2.con': {
                'test3.con': [{
                    'test4.con': 'hello'
                }],
                'test5.con': 'hello.man'
            },
            'test6.con': 'hi.',
            'test7con': {
                'test8con': [{
                    'test9.con': 'hello'
                }],
                'test.10.con': 'hello.man'
            }
        };
        done();
    });

    it('replace - first level keys', function() {
        var out = dtools.jsonKeyCharReplacing(testJSON, '\.', '_', false);
        out.test2_con['test5.con'].should.be.equal('hello.man');
        out.test6_con.should.be.equal('hi.');
    });

    it('replace - all keys', function() {
        var out = dtools.jsonKeyCharReplacing(testJSON, '\.', '_', true);
        out.test2_con['test5_con'].should.be.equal('hello.man');
        out.test2_con.test3_con[0]['test4_con'].should.be.equal('hello');
        out.test7con.test8con[0]['test9_con'].should.be.equal('hello');
        out.test7con.test_10_con.should.be.equal('hello.man');
    });
});

describe('cleanArray', function() {

    var testArray = [];

    beforeEach(function(done) {
        testArray = ['Local', '', '', 'Visitante', '', '', ''];
        done();
    });

    it('clean array basic', function() {
        var out = dtools.cleanArray(testArray);
        out.length.should.be.equal(2);
        out[0].should.be.equal('Local');
        out[1].should.be.equal('Visitante');
    });

    it('clean array custom blank element', function() {
        var out = dtools.cleanArray(testArray, 'Local');
        out.length.should.be.equal(1);
        out[0].should.be.equal('Visitante');
    });

});

describe('findStringInArray', function() {

    var testArray = [];

    beforeEach(function(done) {
        testArray = ['Local', '', '', 'Visitante y más', '', '', ''];
        done();
    });

    it('findStringInArray (no stricted)', function() {
        var out = dtools.findStringInArray('Visitante', testArray, false);
        out.should.be.equal(true);
        out = dtools.findStringInArray('Local', testArray, false);
        out.should.be.equal(true);
    });

    it('findStringInArray (stricted)', function() {
        var out = dtools.findStringInArray('Visitante', testArray, true);
        out.should.be.equal(false);
        out = dtools.findStringInArray('Local', testArray, true);
        out.should.be.equal(true);
    });

});

describe('milisecondsToTime', function() {

    it('seconds', function() {
        var out = dtools.milisecondsToTime(3012);
        out.should.be.equal('3s');
    });

    it('minutes', function() {
        var out = dtools.milisecondsToTime(123012);
        out.should.be.equal('2m 3s');
    });

    it('hours', function() {
        var out = dtools.milisecondsToTime(12123012);
        out.should.be.equal('3h 22m 3s');
    });

});

describe('iso8601DurationtoMilliseconds', function() {

    it('seconds', function() {
        var out = dtools.iso8601DurationtoMilliseconds('PT3S');
        out.should.be.equal(3000);
    });

    it('minutes', function() {
        var out = dtools.iso8601DurationtoMilliseconds('PT2M3S');
        out.should.be.equal(123000);
    });

    it('hours', function() {
        var out = dtools.iso8601DurationtoMilliseconds('PT3H22M3S');
        out.should.be.equal(12123000);
    });

});

describe('replaceAll', function() {

    it('three ocurrences uppercase and lowercase', function() {
        var out = dtools.replaceAll('The cat and the dolphin eat the fish', 'the ', '-');
        out.should.be.equal('The cat and -dolphin eat -fish');
    });

    it('three ocurrences uppercase and lowercase (empty replaceString)', function() {
        var out = dtools.replaceAll('The cat and the dolphin eat the fish', 'the ', '');
        out.should.be.equal('The cat and dolphin eat fish');
    });

    it('three ocurrences uppercase and lowercase (case sensitive)', function() {
        var out = dtools.replaceAll('The cat and the dolphin eat the fish', 'the ', '', true);
        out.should.be.equal('cat and dolphin eat fish');
    });

});

describe('isJSONObject', function() {

    var testObject1 = {};
    var testObject2 = {};

    beforeEach(function(done) {
        testObject1 = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        };
        testObject2 = {
            'key1': 'value1',
            'key2': ['value2', 'value3'],
            'key3': 'value3',
            'key4': 3
        };
        done();
    });


    it('normal result (input: JSON Object)', function() {
        var out = dtools.isJSONObject(testObject1);
        out.should.be.true;
    });

    it('normal result (input: JSON Array)', function() {
        var out = dtools.isJSONObject(testObject2['key2']);
        out.should.be.true;
    });

    it('error result (input: string)', function() {
        var out = dtools.isJSONObject(testObject2['key3']);
        out.should.be.false;
    });

    it('error result (input: number)', function() {
        var out = dtools.isJSONObject(testObject2['key4']);
        out.should.be.false;
    });

});

describe('isJSONArray', function() {

    var testObject1 = {};
    var testObject2 = {};

    beforeEach(function(done) {
        testObject1 = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        };
        testObject2 = {
            'key1': 'value1',
            'key2': ['value2', 'value3'],
            'key3': 'value3',
            'key4': 3
        };
        done();
    });

    it('normal result (input: JSON Array)', function() {
        var out = dtools.isJSONArray(testObject2['key2']);
        out.should.be.true;
    });

    it('error result (input: JSON Object)', function() {
        var out = dtools.isJSONArray(testObject1);
        out.should.be.false;
    });

});

describe('countJSONObjectProperties', function() {

    var testObject1 = {};
    var testObject2 = {};

    beforeEach(function(done) {
        testObject1 = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        };
        done();
    });


    it('normal result', function() {
        var out = dtools.countJSONObjectProperties(testObject1);
        out.should.be.equal(3);
    });

    it('error result', function() {
        var out = dtools.countJSONObjectProperties("hello!");
        out.should.be.equal(-1);
    });

});



describe('getRandomPropertyFromJSONObject', function() {

    var testObject1 = {};
    var testObject2 = {};

    beforeEach(function(done) {
        testObject1 = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        };
        done();
    });


    it('normal result', function() {
        var out = dtools.getRandomPropertyFromJSONObject(testObject1);
        out.should.be.a('string');
        out.should.have.string('key');
    });

    it('error (no JSON Object - input: string)', function() {
        var out = dtools.getRandomPropertyFromJSONObject("S");
        expect(out).to.be.undefined;
    });

    it('error (no JSON Object - input: JSON Array)', function() {
        var out = dtools.getRandomPropertyFromJSONObject(['s', 'e']);
        expect(out).to.be.undefined;
    });

});

describe('plainJSONObjectToArray', function() {

    var testObject1 = {};
    var testObject2 = {};

    beforeEach(function(done) {
        testObject1 = {
            'key1': 'value1',
            'key2': 'value2',
            'key3': 'value3'
        };
        testObject2 = {
            'key1': 'value1',
            'key2': ['value2', 'value3'],
            'key3': 'value3',
            'key4': 3
        };
        done();
    });


    it('normal result', function() {
        var out = dtools.plainJSONObjectToArray(testObject1);
        out.should.have.length(3);
        out.should.be.have.members(['value1', 'value2', 'value3']);
    });

    it('error (no plain JSON Object)', function() {
        var out = dtools.plainJSONObjectToArray(testObject2);
        expect(out).to.be.undefined;
    });

    it('error (no JSON Object - input: JSON Array)', function() {
        var out = dtools.plainJSONObjectToArray(testObject2['key2']);
        expect(out).to.be.undefined;
    });

});

describe('diffArrays', function() {

    var testObject1 = {};
    var testObject2 = {};

    beforeEach(function(done) {
        testObject2 = {
            'key1': 'value1',
            'key2': ['value2', 'value3','value4','value5','value6', 'value8', 'value7'],
            'key3': ['value2', 'value3','value5','value6','value10'],
            'key4': 3
        };
        done();
    });


    it('normal result (1)', function() {
        var out = dtools.diffArrays(testObject2['key2'], testObject2['key3']);
        out.should.have.length(3);
        out.should.be.have.members(['value4','value7','value8']);
    });

    it('normal result (2)', function() {
        var out = dtools.diffArrays(testObject2['key3'], testObject2['key2']);
        out.should.have.length(1);
        out.should.be.have.members(['value10']);
    });

    it('normal result (1 - with limit)', function() {
        var out = dtools.diffArrays(testObject2['key2'], testObject2['key3'],2);
        out.should.have.length(2);
        out.should.be.have.members(['value4','value8']);
    });


});
