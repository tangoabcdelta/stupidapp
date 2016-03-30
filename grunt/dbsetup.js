var _ = require('lodash');
var path = require("path");
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    // user     : 'deveedutta',
    user     : 'root',
    password : '',
    database : 'new_schema'
    // ,
    // debug    : true
  }
});


var data_for_sutta = require( path.join(__dirname, "../dbfixtures/events.js") );
var data_for_bhutta = require( path.join(__dirname, "../dbfixtures/events.js") );


var config = {
  tables: ["sutta", "bhutta", "agarbatti"],
  configs: []
  logQueries: true,
  ifNotExistsOverride: true,
}


var msg = "";





// knex.select().from('sutta')
// .then(function(data){
//   data = JSON.stringify(data);
//   console.log( data );
//   grunt.log.writeln('All done!');
//   done();
// });




var fields = Object.keys( sampledata[0] );
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
    .insert( sampledata )
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







// module.exports = function ( grunt ) {
//   grunt.registerTask('dbsetup', function( targetEnvironment ) {


//     var done = this.async();
//     done();

//   });
// }
