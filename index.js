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
    },

    /**
    *
    * Formats a date in a human-friendly representation
    *
    * @param {String} A String representing the date to format (accepts the format used in JS Date() function)
    * return {String} A human-friendly date representation (spanish)
    */
    friendlyDateRepresentation: function(date) {
        var aDay = 3600 * 1000 * 24;
        var d = new Date(date);
        var now = new Date();
        var yesterday = new Date(now.getTime() - aDay);

        var getTime = function(dateP) {
            return dateP.toISOString().split("T")[1].substr(0,5);
        };

        var getDay = function(dateP) {
            return dateP.toISOString().split("T")[0].substr(8,2) + "/" + dateP.toISOString().split("T")[0].substr(5,2);
        }

        if ((now.getTime() - d.getTime()) <= aDay) {
            if (now.getHours() == d.getHours()) return "Hace " + (now.getMinutes() - d.getMinutes()) + " minutos";
            else if ((now.getHours() == (d.getHours() + 1)) && (d.getMinutes() > now.getMinutes())) return "Hace " + (now.getMinutes() + (60 - d.getMinutes())) + " minutos";
            else return "Hace " + (now.getHours() - d.getHours()) + " hora";
        }
        else if (yesterday.getDate() == d.getDate()) return "Ayer, a las "+getTime(d);
        else return getDay(d)+ " a las " + getTime(d);
    }


}
