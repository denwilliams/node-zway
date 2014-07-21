var http = require('http');
var Device = require('./type/device');

module.exports = exports = 

function (ip) {
	var port = 8083;
	var baseUrl = 'http://'+ip+':'+port+'/JS/Run/zway.';
	this.device = function(deviceId) {
		return new Device(baseUri)
		httpGet(baseUri + 'devices['+deviceId+']');
	};
}

function httpGet(url, cb) {
	http.get(url, function(res) {
		console.log('STATUS: ' + res.statusCode);
  		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
	    	console.log('BODY: ' + chunk);
	    	cb(null,chunk);
		});
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	  cb(e);
	});
}
