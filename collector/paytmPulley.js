var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'new_schema'
  }
});
var request = require("request");

var config = {
  tableName: "paytmConfiguration",
  baseUrl: "https://catalog.paytm.com"
};

var options = {
  method: "GET",
  url: "http://catalog.paytm.com/v1/mobile/flyouts",
  headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, sdch",
    "Accept-Language": "en-US,en;q=0.8",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Cookie": "tvc_vid=81458986925260; Nprd=1|1461688402603; LastPID=27102379|1461688402608; _gat=1; _dc_gtm_UA-36768858-14=1; _gat_UA-36768858-14=1; _vz=viz_b7b78115fff83; _ga=GA1.2.329606080.1458986926",
    "Host": "catalog.paytm.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36"
  },
  formData: {},
  qs: {
    "channel": "web",
    "version": 1
  }
}

function fetchConfig(){
  var body = '';
  request( options )
  .on("response", function(response){

  })
  .on('data', function (chunk) {
    body += chunk;
  })
  .on('end', function (chunk) {
    console.log(body);
  })
  .on("error", function(err){
    console.log(err);
  });

  // knex.schema
  // .createTableIfNotExists( config.tableName, function (table) {
  //   _.each( fields, function( item ){
  //     table.string( item );
  //     console.log( "field-name:", item );
  //   })
  // })
  // .then(function(){
  //   knex( config.tableName )
  //   .insert( sampledata )
  //   .then(function(data){
  //     data = JSON.stringify(data);
  //     console.log( data );
  //   },
  //   function(error){
  //     console.log( error );
  //   })
  //   .finally(function(){
  //     process.exit();
  //   });
  // });

}

fetchConfig();

module.exports = {
  fetchConfig: fetchConfig
}