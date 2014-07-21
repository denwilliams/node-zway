var SubDevice = require('./subdevice');
var util = require('util');
var Device = require('./device');

module.exports = exports = Sensor;

function Sensor(device) {
	//Sensor.super_.call(this);
}

util.inherits(Sensor, Device);


Device.prototype.part = function(index) {
	return new SubDevice(this, index);
};
