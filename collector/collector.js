var request = require("request");


request
.get("http://ip.jsontest.com/")
.on("end", function(){

});

var fs = require('fs')
, path = require('path')
, certFile = path.resolve(__dirname, 'ssl/client.crt')
, keyFile = path.resolve(__dirname, 'ssl/client.key')
, caFile = path.resolve(__dirname, 'ssl/ca.cert.pem')
, request = require('request');
var options = {
  url: 'https://api.some-server.com/',
  cert: fs.readFileSync(certFile),
  key: fs.readFileSync(keyFile),
}

request(options, callback)