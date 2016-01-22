var express= require('express');
var pg = require('pg');

var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sql_weekend';

router.get('/', function(request, response){
    var results = [];

    pg.connect(connectionString, function(err, client, done){
       //handle erros
        if(err){
            console.log(err);
        }

        var query = client.query('SELECT * FROM users ORDER BY id ASC');

        query.on('row', function(row){
           results.push(row);
        });

        query.on('end', function() {
           client.end();
            return response.json(results);
        });
    });
});

router.get('/:id', function(request, response){
    var results = [];
    var id = request.params.id;

    pg.connect(connectionString, function(err, client, done){
        //handle erros
        if(err){
            console.log(err);
        }

        var query = client.query('SELECT * FROM addresses WHERE user_id = $1', [id]);

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