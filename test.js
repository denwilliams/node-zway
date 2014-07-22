var ZWay = require('./zway');
var zway = new ZWay('hostname');

var x = zway.deviceApi().device(3).battery();
x.value(function(err,value) {
	console.log(value);
});
