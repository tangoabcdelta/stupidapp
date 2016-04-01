var express = require('express');
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
    console.log( "=============" );
    data = JSON.stringify(data);
    console.log( data );
    res.send('respond with a resource' + data);
  });
});

module.exports = router;
