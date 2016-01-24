/**
 * Created by ericanderson on 1/24/16.
 */
var express = require('express');
var pg = require('pg');

var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sql_weekend';

router.get('/:id/:dateStart/:dateEnd', function(request, response){
    var results = [];
    var id = request.params.id;

    var dateStart = request.params.dateStart;
    var dateEnd = request.params.dateEnd;

    console.log(dateStart);
    console.log(dateEnd);

    pg.connect(connectionString, function(err, client, done){
        //handle erros
        if(err){
            console.log(err);
        }

        var query = client.query('SELECT users.name, addresses.*, orders.* FROM orders JOIN addresses ON addresses.address_id = orders.ship_address_id JOIN users ON users.id = addresses.user_id WHERE orders.user_id = $1', [id]);

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