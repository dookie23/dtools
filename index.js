module.exports = {


    /**
     * Complete a number with zeros in the left
     *
     * @param  {Integer} Number to complete
     * @param {Integer} Length of the return string
     * @return {String} String completed with zeros on the left
     */
    completeZerosLeft: function(number, desiredLength) {
        var numberStr = number + "";
        var result = numberStr;
        for (var i = 0; i < (desiredLength - numberStr.length); i++) result = "0" + result;
        return result;
    },

    /**
     * Generates a random integer in the inout range
     *
     * @param {Integer} Min. value
     * @param {Integer} Max. value
     * @return {Integer} An integer from min to max
     */
    randomInt: function(min, max) {
        return min + Math.round(Math.random() * (max - min));
    },

    /**
    *
    * Generates an array with consecutive numbers from start to start+n-1
    *
    * @param {Integer} The first item of the array
    * @param {Integer} Array length
    * @param {Boolean} Descendent direction
    * return {Array} An array with number items from start to start+n-1. If desc == true, the array will be sort in descendent order.
    */
    numberArray: function(start, n, desc) {
        var r = [];
        for (var i=start;i<start+n;i++) {
            if (!desc) r.push(i);
            else r.unshift(i);
        }
        return r;
    }


}
