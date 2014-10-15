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

        var getMonth = function(month) {
            if (month == 1) return "Enero";
            if (month == 2) return "Febrero";
            if (month == 3) return "Marzo";
            if (month == 4) return "Abril";
            if (month == 5) return "Mayo";
            if (month == 6) return "Junio";
            if (month == 7) return "Julio";
            if (month == 8) return "Agosto";
            if (month == 9) return "Septiembre";
            if (month == 10) return "Octubre";
            if (month == 11) return "Noviembre";
            if (month == 12) return "Diciembre";
        };

        var getDay = function(dateP) {
            return dateP.toISOString().split("T")[0].substr(8,2) + " de " + getMonth(parseInt(dateP.toISOString().split("T")[0].substr(5,2)));
        }

        if ((now.getTime() - d.getTime()) <= aDay) {
            if (now.getHours() == d.getHours()) {
                var diff = now.getMinutes() - d.getMinutes();
                if (diff > 1) return "Hace " + diff + " minutos";
                else return "Hace " + diff + " minuto";
            }
            else if ((now.getHours() == (d.getHours() + 1)) && (d.getMinutes() > now.getMinutes())) return "Hace " + (now.getMinutes() + (60 - d.getMinutes())) + " minutos";
            else {
                var diff = now.getHours() - d.getHours();
                if (diff > 1) return "Hace " + diff + " horas"
                else return "Hace " + diff + " hora";
            }
        }
        else if (yesterday.getDate() == d.getDate()) return "Ayer, a las "+getTime(d);
        else return getDay(d);
    }


}
