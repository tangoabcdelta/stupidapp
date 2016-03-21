var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'deveedutta',
    password : '',
    database : 'sattabazi'
    // ,
    // debug    : true
  }
});

/* Handle POST: Math the user name and password. */
router.post('/', function(req, res, next) {
  var userid = req.body['userid'];
  var pwd = req.body['pwd'];

  knex.select().from('satta').where({
    user_id: userid,
    user_password: pwd
  })
  .then(function(data){
    console.log( "=============" );
    data = JSON.stringify(data);
    console.log( data );
    res.send('respond with a resource' + data);
  });
});

module.exports = router;
