const express = require('express');
const router = require('express').Router();
var session = require('express-session');
const app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('logininfo.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to Database');
});

// This code needs more anime waifus

//db.close();
const path = require('path');

const ejs = require('ejs');
//Login


app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/teacherlogin', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        response.redirect('/teacheraccess');
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Database closed connection');
        });
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});

app.get('/teacheraccess', function(request, response) {
  if (request.session.loggedin) {
    response.send('Welcome back, ' + request.session.username + '!');
  } else {
    response.send('Please login to view this page!');
  }
  response.end();
});

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs')

router.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'))

app.get('/page', function(req, res) {
  res.render('pages/page')
});

app.get('/teacheraccess', function(req, res) {
  res.render('pages/teacheraccess')
});

app.get('/sendFunds', function(req, res) {
  res.render('pages/sendFunds')
});

app.get('/', function(req, res) {
  res.render('pages/studentlogin')
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
