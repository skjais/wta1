const mysql = require('mysql');
var express = require("express");
var router = express.Router();
var multer = require('multer');



const storage = multer.memoryStorage({

    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, sb) {
        cb(null, new Date().toISOString() + file.orginalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

var obj;
router.post('/', upload.single("picurl"), function(req, res) {

    this.obj = req.body;

    console.log(req.body);
    console.log(req.file);

    var con = mysql.createConnection({

        host: "localhost",
        user: "root",
        password: "sunil2000",
        database: 'project_db'
    });

    var t1 = `create table if not exists teachers(fname varchar(300) NOT NULL,lname varchar(300) NOT NULL,
    username varchar(300) NOT NULL,password varchar(300) NOT NULL,email varchar(300) NOT NULL,dob varchar(300) NOT NULL,
    phoneno varchar(300) NOT NULL,address varchar(300) NOT NULL,zip varchar(300) NOT NULL,subject varchar(300) NOT NULL,
    qualification varchar(300) NOT NULL,experience varchar(300) NOT NULL,fee varchar(300) NOT NULL,gender varchar(300) NOT NULL,img varchar(300) NOT NULL
    ,primary key(username))`;

    var t2 = `create table if not  exists state(city varchar(300) NOT NULL,state varchar(300) NOT NULL,
    primary key(city))`;

    var t3 = `create table if not  exists city(zip varchar(300) NOT NULL,city varchar(300) NOT NULL,
    primary key(zip))`;

    var insertTeacher = "insert into teachers values ?";
    var insertCity = "insert into city values ?";
    var insertState = "insert into state values ?";

    var teacher = [
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
            this.obj.subject,
            this.obj.qualification,
            this.obj.experience,
            this.obj.fee,
            this.obj.gender,
            this.obj.img,
            req.file.path

        ]

    ];
    var state = [
        [
            this.obj.city,
            this.obj.stateName,
        ]
    ]
    var city = [
        [
            this.obj.zip,
            this.obj.city,

        ]
    ]



    con.query(t1);
    con.query(t2);
    con.query(t3);

    con.query(insertTeacher, [teacher], function(err, result) {

        if (err) res.status(404).send({ "error": "some error accured " })
        else res.status(200).send("teacher data is added successfully");
    });
    con.query(insertCity, [city]);
    con.query(insertState, [state]);


});
module.exports = router;