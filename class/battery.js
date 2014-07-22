module.exports = exports = Battery;

var util = require('util');
var Component = require('../component');

function Battery(base) {
	this.url = base.url += '.Battery';
}

util.inherits(Battery,Component);
