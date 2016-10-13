const got = require('got');
const promise = require('../promise');
const debug = require('../debug');
const basicAuthToken = require('basic-auth-token');

exports.get = (url, user, pass) => {
	return got.get(url, getOptions(user, pass))
	.then(response => response.body)
	.catch(error => {
		throw new Error((error.response && error.response.body) || error.message);
	});
};

function getOptions(user, pass) {
	const token = basicAuthToken(user, pass);
	return {
		headers: {
			authorization: 'Basic ' + token,
			accept: 'application/json'
		},
		json: true
	};
}