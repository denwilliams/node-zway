module.exports = exports = ZWay;

// function getZway(host) {
// 	return new ZWay(host);
// }

function ZWay(host) {
	this.url = 'http://'+host+':8083'
}

ZWay.prototype.deviceApi = function() {
	var DevApi = require('./api/deviceapi');
	return new DevApi(this);
};
