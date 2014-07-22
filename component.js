module.exports = exports = Component;

var Q = require('q'),
	http = require('http');

function Component() {

}

Component.prototype.value = function(callback) {
	this._get(this.url + '.data.last.value', callback)
};

Component.prototype.data = function(callback) {
	this._get(this.url + '.data', callback)
};

Component.prototype._get = function(url, callback) {
	console.log(url);

	if (callback) {
		return httpGet(url,callback);
	} else {
		return Q.ncall(httpGet);
	}
};

function httpGet(url, callback) {

}
