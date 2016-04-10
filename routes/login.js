var crypto = require("crypto-js");
var _ = require('lodash');
var express = require('express');
var session = require("express-session");
var router = express.Router();
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

/* Handle POST: Math the user name and password. */
router.post('/', function(req, res, next) {
  var username = req.body['username'];
  var password = req.body['password'];

  knex.select()
  .from('sample_users')
  .where({
    user_first_name: username
  })
  .then(function(data){
    // yanked from
    // http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/
    var errorStr = "Invalid Username or Password. Please signup if you donot have an account.";
    if(data.length == 0){
      throw errorStr;
      return;
    }
    var data = data[0];
    if(data.password != password){
      throw errorStr;
      return;
    }


    'session' in res
      ?
        res.session.cuser = username
      : 
        req.session.cuser = username;

    var encryptedContent = "foo";

    var _responseData = _.extend({},{
      "user_first_name": data['user_first_name']
    })
    res.cookie('s', '1', { httpOnly: true, secure: false, maxAge: 900000, path: '/' });
    res.cookie('cuser', username, { httpOnly: true, secure: false, maxAge: 900000, path: '/' });
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(_responseData));
  })
  .catch(function(e){
    res.clearCookie('s', { path: '/' });
    res.clearCookie('cuser', { path: '/' });
    res.writeHead(403, {"Content-Type": "application/json"});
    res.end(JSON.stringify(e));
  });
});

module.exports = router;
