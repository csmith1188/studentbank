const express = require('express');
const router = require('express').Router();
const app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Bank.db');

//db.close();
const path = require('path');

const ejs = require('ejs');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')

router.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'))

app.get('/teacher', function(req, res) {
  res.render('pages/teacheraccess')
});

app.get('/', function(req, res) {
  res.render('pages/or')
});

app.get('/studentlogin', function(req, res) {
  res.render('pages/studentlogin')
});

app.get('/studentaccess', function(req, res) {
  res.render('pages/studentaccess')
});

app.get('/studenttransfer', function(req, res) {
  res.render('pages/studenttransfer')
});

app.get('/teacherlogin', function(req, res) {
  res.render('pages/teacherlogin')
});

app.get('/students', function(req, res) {
  db.all("SELECT * FROM bank", function(err, rows) {
    if (err) {
      console.log(err)
    } else if (rows) {
      console.log(rows);
      res.render('pages/students', {
        rows: rows
      })
    }
  });
});

app.get('/teachertransfer', function(req, res) {
  res.render('pages/teachertransfer')
});

var server = app.listen(5000, function() {
  var PORT = 5000
  console.log('User Conncted')
})
