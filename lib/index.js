var Device = require('./type/device');

exports.device = function(deviceId) {
	return new Device(baseUri + apiPath, deviceId);
};


var baseUri = 'http://192.168.0.40:8083';
var apiPath = '/ZWaveAPI/Run/';
//var apiPath = '/JS/Run/zway.';