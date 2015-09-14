exports.create = function(commandClass, deviceApi, deviceId) {
  return {
    on: function(eventId, cb) {
      deviceApi.on(deviceId, commandClass, eventId, cb);
    },
    get: function(key) {
      return deviceApi.getDeviceInfo(deviceId, commandClass)[key];
    }
  };
};
