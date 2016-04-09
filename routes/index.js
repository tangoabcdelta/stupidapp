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
  var fallbackUser = _.get(req, "cookies.user");
  var user = _.get(req, "session.user", fallbackUser);
  if(!user){
    res.render('index', {
      title: 'Express',
      eventlist: [],
      isLoggedIn: false
    });
  } else {
    knex.select()
    .from('sample_users')
    .where("user_first_name", user)
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
          user: user
        });  
      })
      
    })  
  }
});

module.exports = router;
