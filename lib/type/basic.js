var util = require('util');
var Device = require('./sensor');

module.exports = exports = BinarySensor;

function BinarySensor(device) {
	this.url = device.url + '.BinarySensor';
}

util.inherits(BinarySensor, Device);
