module.exports = exports = Device;

function Device(base, deviceId) {
	this.url = base.url += 'devices['+deviceId+']';
}

Device.prototype.battery = function() {
	return this._class('battery');
};

Device.prototype._class = function(type) {
	var Ctor = require('../class/'+type);
	return new Ctor(this);
};
