// const http = require('http');
const got = require('got');
const promise = require('../promise');
const debug = require('../debug');
const basicAuthToken = require('basic-auth-token');

exports.get = (url, user, pass) => {
	const token = basicAuthToken(user, pass);
	const opts = {
		headers: {
			authorization: 'Basic ' + token,
			accept: 'application/json'
		},
		json: true
	};
	return got.get(url, opts)
	.then(response => {
		// console.log(response.body);
		return response.body;
		//=> '<!doctype html> ...'
	})
	.catch(error => {
		// console.log(error.response.body);
		throw new Error(error.response.body);
		//=> 'Internal server error ...'
	});

	// http.get(url, (res) => {
	// 	var json = '';

	// 	res.setEncoding('utf8');
	// 	res.on('data', (chunk) => {
	// 		// debug('data:',url);
	// 		json += chunk;
	// 	})
	// 	.on('end', () => {
	// 		// debug('end:',url);
	// 		cb(null, JSON.parse(json));
	// 	})
	// 	.on('error', (err) => {
	// 		// console.error(err);
	// 		cb(err);
	// 	});
	// })
	// .on('error', (err) => {
	// 	// console.log("Got error: " + err.message);
	// 	cb(err);
	// });
};
