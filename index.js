var zway = module.exports = require('./lib');
console.log(zway.device(3).sensor('sensorbinary').url);
zway.device(3).sensor('sensorbinary').data(function(err,data) {
	console.log(data);
});

// zway.device(3).get(function(err,data) {
// 	console.log(data);
// });

