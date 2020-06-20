const mysql = require('mysql');
var express = require("express");
var router = express.Router();

router.post('/', function(req, res) {
    console.log(req.body);

    var con = mysql.createConnection({

        host: "localhost",
        user: "root",
        password: "sunil2000",
        database: 'project_db'
    });

    var t1 = "select * from teachers ";

    con.query(t1, function(err, result) {
        if (err) {
            res.status(404).send("error in mysql");
            console.log(err);
        } else {


            res.status(200).send(result);
            console.log(result);

        }


    });
});

module.exports = router;