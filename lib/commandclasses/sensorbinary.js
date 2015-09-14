var generic = require('./generic');

var CLASS_ID = 48;
var CLASS_NAME = 'SensorBinary';

exports.id = CLASS_ID;
exports.name = CLASS_NAME;

exports.create = function (deviceApi, deviceId) {
  var result = generic.create(CLASS_ID, deviceApi, deviceId);
  result.lock = function() {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(255)');
  };
  result.unlock = function() {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Set(0)');
  };
  result.toggleLock = function() {
    // todo: read current state
    // deviceApi.getDeviceInfo(deviceId, CLASS_ID);
    deviceApi.runCommand(deviceId, CLASS_ID, 'level', 255);
  };
  result.isLocked = function() {
    return 255 == deviceApi.getDeviceInfo(deviceId, CLASS_ID).level;
  };

  return result;
};


  // this.id = deviceId;
  //     Object.defineProperty(this, 'value', {
  //       get: function () {
  //         var sensorData = data.devices[deviceId].instances[0].commandClasses[cc.SensorBinary].data;
  //         //var count = Object.keys(sensorData).length;
  //         //console.log(sensorData);
  //         var switchStatus = sensorData['1'].level.value;
  //         return switchStatus;
  //       },
  //       enumerable: true
  //     });
  //     Object.defineProperty(this, 'type', {
  //       get: function () {
  //         var sensorData = data.devices[deviceId].instances[0].commandClasses[cc.SensorBinary].data;
  //         //var count = Object.keys(sensorData).length;
  //         //console.log(sensorData);
  //         var switchStatus = sensorData['1'].sensorTypeString.value;
  //         return switchStatus;
  //       },
  //       enumerable: true
  //     });
  //     this.refresh = function() {
  //       webRequest.get(getUrl(deviceId, 'SensorBinary', 'Get()'));
  //     };