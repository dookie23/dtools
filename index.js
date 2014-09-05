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
    }

}
