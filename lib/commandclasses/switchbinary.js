var generic = require('./generic');

var CLASS_ID = 37;
var CLASS_NAME = 'SwitchBinary';

exports.id = CLASS_ID;
exports.name = CLASS_NAME;

exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);

  result.refresh = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.activate = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(255)');
  };

  result.deactivate = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(0)');
  };

  result.toggle = function () {
    // TODO: read current state
    var current = deviceApi.getDeviceInfo(deviceId, CLASS_ID).level;
    var newLevel = current === 255 ? 0 : 255;
    // deviceApi.getDeviceInfo(deviceId, CLASS_ID);
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set('+newLevel+')');
  };

  return result;
};

  //     this.id = deviceId;
  //     Object.defineProperty(this, 'status', {
  //       get: function () {
  //         var switchStatus = data.devices[deviceId].instances[0].commandClasses[37].data.level.value;
  //         return switchStatus;
  //       }
  //     });
  //     this.refresh = function() {
  //       webRequest.get(getUrl(deviceId, 'SwitchBinary', 'Get()'));
  //     };
  //     this.on = function() {
  //       webRequest.get(getUrl(deviceId, 'SwitchBinary', 'Set(255)'));
  //     };
  //     this.off = function() {
  //       webRequest.get(getUrl(deviceId, 'SwitchBinary', 'Set(0)'));
  //     };

