var generic = require('./generic');

var CLASS_ID = 98;
var CLASS_NAME = 'DoorLock';

exports.id = CLASS_ID;
exports.name = CLASS_NAME;
exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);
  
  result.lock = function() {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Set(255)');
  };
  
  result.unlock = function() {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Set(0)');
  };

  result.refresh = function() {
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.toggleLock = function() {
    // todo: read current state
    var current = deviceApi.getDeviceInfo(deviceId, CLASS_ID).mode;
    var newMode = current === 255 ? 0 : 255;
    // deviceApi.getDeviceInfo(deviceId, CLASS_ID);
    return deviceApi.runCommand(deviceId, CLASS_ID, 'Set('+newMode+')');
  };
  
  result.isLocked = function() {
    return 255 == deviceApi.getDeviceInfo(deviceId, CLASS_ID).mode;
  };

  return result;
};
