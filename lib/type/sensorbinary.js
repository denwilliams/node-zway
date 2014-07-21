var util = require('util');
var Device = require('./sensor');

module.exports = exports = SensorBinary;

function SensorBinary(device, index) {
	this.url = device.url + '.SensorBinary';
}

util.inherits(SensorBinary, Device);
