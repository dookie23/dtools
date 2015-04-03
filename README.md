dtools
======

A set of useful tools.

## Installation
	
	npm install dookie-tools --save

## Usage
	
	var dtools = require('dookie-tools');

	dtools.randomInt(1,14);
	dtools.completeZerosLeft(2,4);
	dtools.numberArray(2013,3,true);
	dtools.friendlyDateRepresentation("2014-10-23");
	dtools.jsonKeyCharReplacing(inputJSON, searchValue, newValue, true);
	dtools.cleanArray(inputArray);
	dtools.finStringInArray(searchString, inputArray, true);

## Tests

	npm test

## Release history

* 0.0.1 Initial release
* 0.0.2 Added numberArray function
* 0.0.3 Added friendlyDateRepresentation function
** 0.0.3a Changes in friendlyDateRepresentation
* 0.0.4 Added jsonKeyCharReplacing function
* 0.0.5 Added cleanArray function
* 0.0.6 Added findStringInArray function

