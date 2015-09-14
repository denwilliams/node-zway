var classDefinitions = require('./commandclasses');

// console.log(classDefinitions);

function Device(deviceApi, id, commandClasses) {
  var self = this;

  this._api = deviceApi;
  this._id = id;
  commandClasses = commandClasses || [];
  if (!Array.isArray(commandClasses)) {
    commandClasses = [commandClasses];
  }
  this._commandClasses = commandClasses;

  this._commandClasses.forEach(function(cls) {
    var className = classDefinitions.names[cls];
    var classDefinition = classDefinitions[cls];
    if (classDefinition) {
      self[cls] = self[className] = classDefinition(deviceApi, id);
    }
  });
}

Device.prototype.on = function(eventId, cb) {
  this._api.on(this._id, '*', eventId, cb);
};

module.exports = exports = Device;
