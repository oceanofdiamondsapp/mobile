/*
| --------------------------------------------------------------------------------
| Stone Description
| --------------------------------------------------------------------------------
|
| Format a stone value (primary key in MySQL) to the text description.
|
*/

filters.filter('stoneDesc', ['STONES',
    function(STONES) {
        return function(id) {
            return STONES[id].description;
        };
    }
]);

/*
| --------------------------------------------------------------------------------
| Metal Description
| --------------------------------------------------------------------------------
|
| Format a metal value (primary key in MySQL) to the text description.
|
*/

filters.filter('metalDesc', ['METALS',
    function(METALS) {
        return function(id) {
            return METALS[id].description;
        };
    }
]);
