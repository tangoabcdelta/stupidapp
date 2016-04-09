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
  var userid = req.body['userid'];
  var pwd = req.body['pwd'];

  knex.select()
  .from('sample_users')
  .where({
    user_first_name: userid,
    password: pwd
  })
  .then(function(data){
    // plonked http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/
    data = JSON.stringify(data);
    console.log( data );
    req.session.user = userid;
    res.cookie('sessionid', '1', { httpOnly: true, secure: true });
    res.cookie('user', userid, { httpOnly: true, secure: true });
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(data);
  });
});

module.exports = router;
