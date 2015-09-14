var http = require('http');
var Q = require('q');

var debug = console.log.bind(console);
// debug = function() {};

function get(url, cb) {
	
	// if no callback is supplied use promise
	if (!cb) {
		return Q.nfcall(get, url);
	}

	// debug('URL:',url);

	//console.log(url);
	http.get(url, function(res) {
		var json = '';

		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			// debug('data:',url);
			json += chunk;
		})
		.on('end', function () {
			// debug('end:',url);
			// console.log(json);
			if (cb) cb(null, JSON.parse(json));
		})
		.on('error', function (err) {
			console.error(err);
		});

	})
	.on('error', function(e) {
		console.log("Got error: " + e.message);
		if (cb) cb(e);
	});
}

exports.get = get;
