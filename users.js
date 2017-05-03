var express = require('express');
var router = express.Router();
var _ = require('underscore');
var pg = require("pg");

//Setup the Connection to PostgreSQL database
var user = 'postgres',
    password = '12345',
    port = 5432,
    host = "localhost";
var connectionString = "pg://" + user + ":" + password + "@" + host + ":" + port + "/monDb";
var db = new pg.Client(connectionString);
db.connect(function(err, data) {
    if (err) {
        console.log('Ther was a error connecting to databse :: ' + err);
        process.exit(-1);
    } else {
        console.log('connected to monDb database');
    }
});
/*--------- API CREATION ---------*/ 

db.<collectionName>.find({
    <fieldName>: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [<longitude>, <latitude>]
            },
            $minDistance: <distance in metres>,
            $maxDistance: <distance in metres>
        }
    }
}).pretty()

db.userData.find({
    location: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [77.64115449999997, 12.9718915]
            },
            $maxDistance: 2000
        }
    }
}).pretty()

function fetchNearestuser(db, coordinates, callback) {
    db.collection('userData').createIndex({
        "location": "2dsphere"
    }, function() {
        db.collection("userData").find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: 2000
                }
            }
        }).toArray(function(err, results) {
            if(err) {
                console.log(err)
            }else {
                callback(results);
            }
        });
    });
}
exports.fetchNearestuser = fetchNearestuser;

var dbOperations = require('./db-operations');
function initialize(app, db) {
    // '/user ?lat=12.9718915&&lng=77.64115449999997'
    app.get('/user', function(req, res){
        //Convert the query strings into Numbers
        var latitude = Number(req.query.lat);
        var longitude = Number(req.query.lng);
        dbOperations.fetchNearestuser(db, [longitude,latitude], function(results){
        //return the results back to the client in the form of JSON
            res.json({
                user: results
            });
        });  
    });
}
exports.initialize = initialize;
