/**
 * Created by ericanderson on 1/24/16.
 */
var express = require('express');
var pg = require('pg');

var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sql_weekend';

router.get('/:id/:dateStart/:dateEnd', function(request, response){
    var results = [];

    //grab parameters of GET request in url
    var id = request.params.id;
    var dateStart = request.params.dateStart;
    var dateEnd = request.params.dateEnd;

    //convert to ISODate for SQL query
    dateStart = new Date(dateStart).toISOString();
    dateEnd = new Date(dateEnd).toISOString();

    //open connection to database
    pg.connect(connectionString, function(err, client, done){
        //handle errors
        if(err){
            console.log(err);
        }

        //select orders for selected user within the date range, along with associated address information
        var query = client.query('SELECT users.name, addresses.*, orders.* FROM orders JOIN addresses ON addresses.address_id = orders.ship_address_id JOIN users ON users.id = addresses.user_id WHERE orders.user_id = $1 AND order_date > $2 AND order_date < $3;', [id, dateStart, dateEnd]);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function() {
            client.end();
            return response.json(results);
        });
    });
});

module.exports = router;