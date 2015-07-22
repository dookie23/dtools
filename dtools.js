var dtools = {};

(function(exports) {
    'use strict';

    /**
     * Complete a number with zeros in the left
     *
     * @param  {number} number Number to complete
     * @param {number} desiredLength Length of the return string
     * @return {string} String completed with zeros on the left
     */
    exports.completeZerosLeft = function(number, desiredLength) {
        var numberStr = number + '';
        var result = numberStr;
        for (var i = 0; i < (desiredLength - numberStr.length); i++) result = '0' + result;
        return result;
    };

    /**
     * Generates a random integer in the inout range
     *
     * @param {number} min Min. value
     * @param {number} max Max. value
     * @return {number} An integer from min to max
     */
    exports.randomInt = function(min, max) {
        return min + Math.round(Math.random() * (max - min));
    };

    /**
     *
     * Generates an array with consecutive numbers from start to start+n-1
     *
     * @param {number} start The first item of the array
     * @param {number} n Array length
     * @param {Boolean} desc Descendent direction
     * return {Array.<number>} An array with number items from start to start+n-1. If desc == true, the array will be sort in descendent order.
     */
    exports.numberArray = function(start, n, desc) {
        var r = [];
        for (var i = start; i < start + n; i++) {
            if (!desc) r.push(i);
            else r.unshift(i);
        }

        return r;
    };

    /**
     *
     * Formats a date in a human-friendly representation
     *
     * @param {string} date A String representing the date to format (accepts the format used in JS Date() function)
     * return {string} A human-friendly date representation (spanish)
     */
    exports.friendlyDateRepresentation = function(date) {
        var aDay = 3600 * 1000 * 24;
        var d = new Date(date);
        var now = new Date();
        var yesterday = new Date(now.getTime() - aDay);

        var getTime = function(dateP) {
            return dateP.toISOString().split('T')[1].substr(0, 5);
        };

        var getMonth = function(month) {
            if (month == 1) return 'Enero';
            if (month == 2) return 'Febrero';
            if (month == 3) return 'Marzo';
            if (month == 4) return 'Abril';
            if (month == 5) return 'Mayo';
            if (month == 6) return 'Junio';
            if (month == 7) return 'Julio';
            if (month == 8) return 'Agosto';
            if (month == 9) return 'Septiembre';
            if (month == 10) return 'Octubre';
            if (month == 11) return 'Noviembre';
            if (month == 12) return 'Diciembre';
        };

        var getDay = function(dateP) {
            return dateP.toISOString().split('T')[0].substr(8, 2) + ' de ' + getMonth(parseInt(dateP.toISOString().split('T')[0].substr(5, 2)));
        };

        if ((now.getTime() - d.getTime()) <= aDay) {

            if (now.getHours() == d.getHours()) {
                var diff = now.getMinutes() - d.getMinutes();

                if (diff > 1) return 'Hace ' + diff + ' minutos';
                else return 'Hace ' + diff + ' minuto';

            } else {

                if ((now.getHours() == (d.getHours() + 1)) && (d.getMinutes() > now.getMinutes())) {
                    return 'Hace ' + (now.getMinutes() + (60 - d.getMinutes())) + ' minutos';
                } else {
                    var diff = now.getHours() - d.getHours();
                    if (diff < 1) diff = 24 + diff;
                    if (diff > 1) return 'Hace ' + diff + ' horas'
                    else return 'Hace ' + diff + ' hora';
                }

            }

        } else if (yesterday.toDateString() == d.toDateString()) return 'Ayer, a las ' + getTime(d);
        else return getDay(d);
    };

    /**
     * Replace substrings in JSON keys
     *
     * @param {Object} obj JSON to change
     * @param {string} searchValue The value, or regular expression, that will be replaced by the new value
     * @param {string} newValue The value to replace the searchvalue with
     * @param {boolean} recursive If true, the replace is excuted in a recursive way, else only first-level keys will be replaced
     * @return {Object} A new JSON Object, where the specified key(s) has been replaced by the new value
     */
    exports.jsonKeyCharReplacing = function(obj, searchValue, newValue, recursive) {

        if (recursive == undefined) recursive = true;

        if (Object.prototype.toString.call(obj) === '[object Array]') {
            for (var i = 0; i < obj.length; i++) {
                obj[i] = exports.jsonKeyCharReplacing(obj[i], searchValue, newValue, recursive);
            }
        } else {
            for (var key in obj) {

                if (obj.hasOwnProperty(key)) {
                    var newKey = key.split(searchValue).join(newValue);

                    var type = Object.prototype.toString.call(obj[key]);
                    if (newKey !== key) {

                        if (recursive) obj[newKey] = exports.jsonKeyCharReplacing(obj[key], searchValue, newValue, recursive);
                        else obj[newKey] = obj[key];
                        delete(obj[key]);

                    } else if (type === '[object Object]' || type === '[object Array]') {
                        obj[key] = exports.jsonKeyCharReplacing(obj[key], searchValue, newValue, recursive);
                    }

                }
            }
        }

        return obj;
    };

    /**
     * Remove 'blank elements' in a string array
     *
     * @param {string} stringArray An array of string
     * @param {string=} blankString An string as blank element
     * @return {Array.<string>} An array without 'blank elements'
     */
    exports.cleanArray = function(stringArray, blankString) {
        var x = [];
        if (!blankString) blankString = '';

        for (var i = 0; i < stringArray.length; i++) {
            if (stringArray[i].replace(blankString, '').length > 0) x.push(stringArray[i]);
        }

        return x;
    };

    /**
     * Look for one string in one string array
     *
     * @param {string} searchString String to find
     * @param {Array.<string>} stringArray String array to iterate
     * @param {boolean} stricted If true, the string must be equal one array element.
     *  If false, the string must be included in one array element
     * @return {boolean} True if the input string is included
     */
    exports.findStringInArray = function(searchString, stringArray, stricted) {
        for (var i = 0; i < stringArray.length; i++) {
            if (stringArray[i].indexOf(searchString) !== -1) {
                if (!stricted) return true;
                else if (stringArray[i].length === searchString.length) return true;
            }
        }

        return false;
    };

    /**
     * Transforms miliseconds into time with format "hours minutes seconds"
     *
     * @param  {Integer} miliseconds Time in miliseconds
     * @return {String}              Time formated to string
     */
    exports.milisecondsToTime = function(miliseconds) {
        var hours = parseInt(((miliseconds / 60000) / 60).toFixed(0));
        var minutes = parseInt(Math.floor(miliseconds / 60000) % 60);
        var seconds = parseInt(((miliseconds % 60000) / 1000).toFixed(0));

        var result = String();
        if (hours) result = hours + 'h ';
        if (hours || minutes) result += minutes + 'm ';
        if (hours || minutes || seconds) result += seconds + 's';

        return result;
    };

    /**
     * Transforms an iso8601 duration value into milliseconds
     *
     * @param  {String} iso8601 Duration time in iso8601 format
     * @return {Integer}        Duration in milliseconds
     */
    exports.iso8601DurationtoMilliseconds = function(iso8601) {
        var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        var totalseconds;

        if (reptms.test(iso8601)) {
            var matches = reptms.exec(iso8601);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
        }

        return totalseconds;
    };

    /**
     * It replaces all ocurrences in a string
     *
     * @param {String} inputString Input to modify
     * @param {String} searchString String with search pattern
     * @param {String} replaceString String to replace (the search pattern)
     * @return {String} String with replaces
     */
    exports.replaceAll = function(inputString, searchString, replaceString, caseSensitive) {
        var flags = caseSensitive ? 'gi' : 'g';
        return inputString.replace(new RegExp(searchString, flags), replaceString);
    };

    /**
     * It checks that input element is a valid JSON Object
     *
     * @param {object} input Input element to check the type
     * @return {boolean} True if the input element is a valid JSON Object
     */
    exports.isJSONObject = function(obj) {
        if (typeof(obj) !== 'object') return false;
        try {
            JSON.parse(JSON.stringify(obj));
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    /**
     * It checks that input element is a valid JSON Array
     *
     * @param {object} input Input element to check the type
     * @return {boolean} True if the input element is a valid JSON Array
     */
    exports.isJSONArray = function(array) {
        if (!this.isJSONObject(array)) return false;

        try {
            if (array.length) return true;
            else return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    /**
     * It counts the number of properties in a JSON Object (no )
     *
     * @param {Object} obj Input JSON Object
     * @return {Integer} Number of properties in the input JSON Object.
     *                   -1 if input object isn't a valid JSON Object
     */
    exports.countJSONObjectProperties = function(obj) {

        if (!this.isJSONObject(obj)) return -1;
        if (this.isJSONArray(obj)) return undefined;

        var count = 0;
        for (var prop in obj) {
            count++;
        }

        return count;
    };

    /**
     * It returns a random property from an JSON Object
     *
     * @param obj JSON Object
     * @return {String} Random property from JSON Object
     */
    exports.getRandomPropertyFromJSONObject = function(obj) {
        if (!this.isJSONObject(obj)) return undefined;
        if (this.isJSONArray(obj)) return undefined;

        var x = this.countJSONObjectProperties(obj);
        var count = 0;
        var randomIndex = Math.floor(Math.random() * x);
        for (var key in obj) {
            if (count == randomIndex || count) return key;
            count += 1;
        }
        return undefined;
    };

    /**
     * It return an array with the values associated to the first level keys in the input JSON Object.
     * This object must be 'plain' (i.e. the same type for all values associated to the keys)
     *
     * @param {Object} obj JSON Object with first-level keys
     * @return {Array<Object>} Array including the values associated to the first level keys
     */
    exports.plainJSONObjectToArray = function(obj) {
        if (!this.isJSONObject(obj)) return undefined;
        if (this.isJSONArray(obj)) return undefined;
        var x = [];

        try {
            var type = 'string';
            var count = 0;
            for (var key in obj) {
                if (count == 0) type = typeof(obj[key]);
                count++;
                if (typeof(obj[key]) !== type) return undefined;
                x.push(obj[key]);
            }
            return x;
        } catch (err) {
            return undefined;
        }
    };

    /**
     * It returns the 'array difference' 
     *
     * @param {Array} mainArray Main array 
     * @param {Array} diffArray The elements of this array will be extracted from main array
     * @param {Integer} n (Optional) Maximum number of elements to return
     * @return {Array} Array with elements included into main array but not included in diffArray
     */
    exports.diffArrays = function(mainArray, secondaryArray, n) {
        if (!this.isJSONArray(mainArray) || !this.isJSONArray(secondaryArray)) return undefined;

        var x = [];

        for (var obj1 = 0; obj1 < mainArray.length; obj1++) {
            var bEncontrado = false;

            for (var obj2 = 0; obj2 < secondaryArray.length; obj2++) {
                if (mainArray[obj1] === secondaryArray[obj2]) bEncontrado = true;
            }
            if (!bEncontrado) x.push(mainArray[obj1]);
        }

        if (!n) return x;

        if (x.length <= n) return x;

        var y = [];
        for (var i = 0; i < n; i++) {
            y.push(x[i])
        };
        return y;
    };



}(typeof exports === 'undefined' ? this.dtools = {} : exports));
