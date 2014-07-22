module.exports = exports = DeviceApi;

var util = require('util'),
	Device = require('../device'),
	Component = require('../component');

function DeviceApi(zway) {
	this.url = zway.url + '/zway/run/';
}

util.inherits(DeviceApi,Component);

DeviceApi.prototype.allData = function(callback) {
	return this._get(this.url + '/Data/0', callback);
};

DeviceApi.prototype.device = function(number) {
	return new Device(this,number);
};
