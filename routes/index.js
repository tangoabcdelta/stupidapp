var express = require('express');
var _ = require('lodash');
var router = express.Router();
//keep the comments intact
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    // user     : 'deveedutta',
    user     : 'root',
    password : '',
    // database : 'sattabazi'
    database : 'new_schema'
    // ,
    // debug    : true
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("req.session", req.session);
  var headers = _.get(req, "headers");
  var username = _.get(req, "cookies.cuser");
  console.log("req.cookies", req.cookies);
  console.log("username", username);
  // yanked from: https://github.com/expressjs/cookie-parser
  // curl http://127.0.0.1:3000 --cookie "Cho=Kim;Greet=Hello"

  if(!username){
    res.render('index', {
      title: 'Express',
      eventlist: [],
      isLoggedIn: false
    });
  } else {
    knex.select()
    .from('sample_users')
    .where("user_first_name", username)
    .then(function(data){
      console.log("foo");
      if(data.length <= 0) return;
      knex
      .select()
      .from('sutta')
      .then(function(data){
        res.render('index', {
          title: 'Express',
          eventlist: data,
          isLoggedIn: true,
          user: username
        });  
      })
      
    })  
  }
});

module.exports = router;
