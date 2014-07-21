var util = require('util');
var Device = require('./device');

module.exports = exports = SubDevice;

function SubDevice(device, index) {
	this.url = device.url + '.data['+index+']';
}

util.inherits(SubDevice, Device);
