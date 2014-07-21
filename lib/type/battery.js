var util = require('util');
var Device = require('./sensor');

module.exports = exports = Battery;

function Battery(device) {
	this.url = device.url + '.Battery';//.data';//.last.value';
	//this.url = device.url + '.instances[0].commandClasses[128].data.last.value';
}

util.inherits(Battery, Device);

Battery.prototype.refresh = function() {

};
