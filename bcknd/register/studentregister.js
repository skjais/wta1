const mysql = require('mysql');
var express = require("express");
var router = express.Router();
var multer = require('multer');
var upload = multer();

var obj;
router.post('/', upload.single("picurl"), function(req, res) {

    console.log(req.body);
    console.log(req.file);

    this.obj = req.body;

    var con = mysql.createConnection({

        host: "localhost",
        user: "root",
        password: "sunil2000",
        database: 'project_db'
    });


    var t1 = `create table if not exists students(fname varchar(300) NOT NULL,lname varchar(300) NOT NULL,
              username varchar(300) NOT NULL,password varchar(300) NOT NULL,email varchar(300) NOT NULL,dob varchar(300) NOT NULL,
              phoneno varchar(300) NOT NULL,address varchar(300) NOT NULL,zip varchar(300) NOT NULL,gender varchar(300) NOT NULL,img blob NOT NULL,
              PRIMARY KEY (username),FOREIGN KEY (zip) REFERENCES city(zip))`;

    var t2 = `create table if not  exists state(city varchar(300) NOT NULL,state varchar(300) NOT NULL,
              PRIMARY KEY (city))`;

    var t3 = `create table if not  exists city(zip varchar(300) NOT NULL,city varchar(300) NOT NULL,
              PRIMARY KEY (zip),FOREIGN KEY (city) REFERENCES state(city))`;

    var insertStudent = "insert into students values ?";
    var insertCity = "insert into city values ?";
    var insertState = "insert into state values ?";

    var student = [
        [
            this.obj.fname,
            this.obj.lname,
            this.obj.username,
            this.obj.password,
            this.obj.email,
            this.obj.dob,
            this.obj.phoneNumber,
            this.obj.address,
            this.obj.zip,
            this.obj.gender,
            req.file.buffer

        ]

    ];
    var state = [
        [
            this.obj.city,
            this.obj.stateName,
        ]
    ]
    var city = [
        [this.obj.zip,
            this.obj.city,

        ]
    ]

    console.log(student);


    con.query(t1);
    con.query(t2);
    con.query(t3);


    con.query(insertStudent, [student], function(err, result) {
        console.log(err);

        if (err) res.status(404).send("the error during insertion")

        else {
            res.status(200).send("student added successfully");
        }


    });
    con.query(insertCity, [city]);

    con.query(insertState, [state]);




});
module.exports = router;