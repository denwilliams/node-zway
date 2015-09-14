var fs = require('fs');
var ids = require('./ids');
var names = require('./names');
var genericClass = require('./generic');

var name, lname, fname, module, id;

exports.ids = ids;
exports.names = names;

for (name in ids) {
  id = ids[name];
  lname = name.toLowerCase();
  fname = __dirname + '/' + lname + '.js';
  if (fs.existsSync(fname)) {
    module = require(fname);
  } else {
    // create a generic handler
    module = {create: genericClass.create.bind(genericClass, id)};
  }
  exports[name] = module.create;
  exports[id] = module.create;
}

//exports.DoorLock = require('./doorlock');
