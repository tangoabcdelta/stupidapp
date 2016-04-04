var express = require('express');
var _ = require('lodash');
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

/* GET home page. */
router.get('/', function(req, res, next) {
  knex.select().from('sutta')
  .then(function(data){
    // console.log(data);
    res.render('index', {
      title: 'Express',
      eventlist: data,
      isLoggedIn: true,
      user: 'Lorrri'

    });
  })

});

module.exports = router;
