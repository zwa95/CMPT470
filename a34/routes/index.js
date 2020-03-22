var express = require('express');
var router = express.Router();
var path = require('path');
var pubpath = path.join(__dirname + '/../public');
var mysql = require('mysql');
const uuid = require('uuid');
var db = mysql.createConnection({
  host: '0.0.0.0',
  user: 'remote',
  password: 'remote',
  database: 'cmpt470'
});
db.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(pubpath + '/index.html'));
});
router.get('/show', function (req, res, next) {
  res.sendFile(path.join(pubpath + '/show.html'));
});

router.post('/create', function (req, res) {
  var uid = '\'' + uuid.v4() + '\''; // generate unique uid
  var name = '\'' + req.body.name + '\'';
  var email = '\'' + req.body.email + '\'';
  var age = req.body.age;
  var gpa = req.body.gpa;
  var query = "INSERT INTO users (uid,name,email,age,gpa) VALUES (" + uid + "," + name + "," + email + "," + age + "," + gpa + ")";
  console.log(query);
  db.query(query, function (err, result) {
    if (err) res.status(400).send(err);
    console.log("User added");
    res.status(200).send(result);
  });
});

router.post('/list', function (req, res) {
  var query = "SELECT * FROM users";
  console.log(query);
  db.query(query, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).send(result);
  });
});

router.post('/search', function (req, res) {
  var uid = '\'' + req.body.uid + '\'';
  var query = "SELECT * FROM users WHERE uid = " + uid + ";";
  console.log(query);
  db.query(query, function (err, result) {
    if (err) res.status(400).send(err);;
    res.status(200).send(result);
  });
});

router.post('/update', function (req, res) {
  var uid = '\'' + req.body.uid + '\'';
  var name = '\'' + req.body.name + '\'';
  var email = '\'' + req.body.email + '\'';
  var age = req.body.age;
  var gpa = req.body.gpa;
  var query = `UPDATE users SET name = ${name},email=${email},age=${age},gpa=${gpa} WHERE uid=${uid}`;
  console.log(query);
  db.query(query, function (err, result) {
    if (err) res.status(400).send(err);
    console.log(result);
    res.status(200).send(result);
  });
});

router.post('/delete', function (req, res) {
  var uid = '\'' + req.body.uid + '\'';
  var query = `DELETE FROM users WHERE uid = ${uid}`;
  console.log(query);
  db.query(query, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
