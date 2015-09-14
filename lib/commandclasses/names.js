var ids = require('./ids');
var id, name;
var names = {};
for (name in ids) {
  id = ids[name];
  names[id] = name;
}

module.exports = exports = names;
