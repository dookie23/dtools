dtools
======

A set of useful tools.

## Installation
	
	npm install dookie-tools --save

## Usage
	
	### Backend import (node.js module)

	var dtools = require('dookie-tools');

	### Frontend import (client library)

	<script src='../../bower_components/dtools/dtools.js'><script>

	### Usage

	dtools.randomInt(1,14);
	dtools.completeZerosLeft(2,4);
	dtools.numberArray(2013,3,true);
	dtools.friendlyDateRepresentation("2014-10-23");
	dtools.jsonKeyCharReplacing(inputJSON, searchValue, newValue, true);
	dtools.cleanArray(inputArray);
	dtools.findStringInArray(searchString, inputArray, true);
	dtools.milisecondsToTime(miliseconds);
	dtools.iso8601DurationtoMilliseconds(iso8601);
	dtools.replaceAll(inputString, searchString, replaceString, caseSensitive);
	dtools.isJSONObject(obj);
	dtools.isJSONArray(array);
	dtools.countJSONObjectProperties(obj);
	dtools.getRandomPropertyFromJSONObject(obj);
	dtools.plainJSONObjectToArray(obj);
	dtools.diffArrays(mainArray, secondaryArray, n)


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
* 0.0.7 Client support
* 0.1.1 Frontend-Backend version
* 0.1.2 Fixed issues in jsonKeyCharReplacing
* 0.1.3 Added iso8601DurationtoMilliseconds, replaceAll, isJSONObject, isJSONArray, countJSONObjectProperties, getRandomPropertyFromJSONObject, plainJSONObjectToArray, diffArrays
