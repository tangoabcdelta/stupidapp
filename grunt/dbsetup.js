var _ = require('lodash');
var path = require("path");
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


var sampleDataPath = path.join(__dirname, "../dbfixtures/events.js");
var sampledata = require(sampleDataPath);


var config = {
  tableName: "sutta",
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
.dropTableIfExists( config.tableName )
.then(function(){

  knex.schema
  .createTable( config.tableName, function (table) {
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
    });



  });

})





// module.exports = function ( grunt ) {
//   grunt.registerTask('dbsetup', function( targetEnvironment ) {


//     var done = this.async();
//     done();

//   });
// }
