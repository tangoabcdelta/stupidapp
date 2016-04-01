var _ = require('lodash');
var path = require("path");
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'new_schema'
  }
});


var data_for_user_table = require( path.join(__dirname, "../dbfixtures/sample_users.js") );
console.log("reading from:", path.join(__dirname, "../dbfixtures/sample_users.js"));
var config = {
  tableName: "sample_users",
  sampledata: data_for_user_table,
  logQueries: true,
  ifNotExistsOverride: true,
}


var fields = Object.keys( config.sampledata[0] );
console.log("fields:", fields);

  knex.schema
  .createTableIfNotExists( config.tableName, function (table) {
    _.each( fields, function( item ){
      table.string( item );
      console.log( "field-name:", item );
    })
  })
  .then(function(){
    knex( config.tableName )
    .insert( config.sampledata )
    .then(function(data){
      data = JSON.stringify(data);
      console.log( data );
    },
    function(error){
      console.log( error );
    })
    .finally(function(){
      process.exit();
    });
  });
