var http = require('http');

module.exports = exports = Device;

function Device(baseUrl, deviceId) {
	this.url = baseUrl + 'devices['+deviceId+']';
}


Device.prototype.get = function(callback) {
	httpGet(this.url+'.instances[0].commandClasses', callback);
};

Device.prototype.data = function(callback) {
	httpGet(this.url+'.data', callback);
};

Device.prototype.value = function(callback) {
	httpGet(this.url+'.data.last.value', callback);
};

Device.prototype.sensor = function(name) {
	var ctor = require('./'+name);
	return new ctor(this);
};

function httpGet(url, cb) {
	http.get(url, function(res) {
		var json = '';
		console.log('STATUS: ' + res.statusCode);
  		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res
		.on('data', function (chunk) {
	    	//console.log('BODY: ' + chunk);
	    	json += chunk;
		})
		.on('end', function () {
	    	cb(null,JSON.parse(json));
		});
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	  cb(e);
	});
}
