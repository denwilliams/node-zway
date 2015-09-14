var Q = require('q'),
  util = require('util'),
  chalk = require('chalk'),
  commandClasses = require('./commandclasses'),
  cc = commandClasses.ids,
  ccNames = commandClasses.names;
  webRequest = require('./utils/webrequest');

var EventEmitter2 = require('eventemitter2').EventEmitter2;
var alarmTypes = require('./alarm/types');
var Device = require('./device');
var dataParser = require('./dataparser');

var debug = console.log.bind(console);
debug = function() {};

module.exports = exports = DeviceApi;

function DeviceApi(host, port) {
  port = port || 8083;
  
  this._dataUrl = 'http://'+host+':'+port+'/ZWaveAPI/Data/';
  this._runUrl = 'http://'+host+':'+port+'/ZWaveAPI/Run/';
  this._jsRunUrl = 'http://'+host+':'+port+'/JS/Run/zway.';

  //this._data = null;
  this._timestamp = 0;
  this._evt = new EventEmitter2({
    wildcard: true,
    maxListeners: 20
  });
  
  //Object.defineProperty(this, '_data', {get: function() {return data;}});
  //Object.defineProperty(this, '_dataUrl', {get: function() {return dataUrl;}});

  this._deviceData = null;

  // this.sensors = {};
  // this.locks = {};
  // this.switches = {};

  // Object.defineProperty(this,'devices',{
  //   get: function() {
  //     return _devices;
  //   }
  // });

  // Object.defineProperty(this,'locks',{
  //   get: function() {
  //     var locks = [];
  //     for (var i in _devices) {
  //       if (_devices[i].DoorLock) locks.push(_devices[i].DoorLock);
  //     }
  //     return locks;
  //   }
  // });
  
  // this.device = function(deviceId) {
  //   return new Device(baseUri);
  //   // webRequest.get(baseUri + 'devices['+deviceId+']');
  // };


  // var functions = {
  //   SensorBinary: function(deviceId, data) {
  //     this.id = deviceId;
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
  //   },
  //   SensorMultilevel: function(deviceId, data) {
  //     var self = this;

  //     this.id = deviceId;

  //     var sensorData = data.devices[deviceId].instances[0].commandClasses[49].data;
  //     // console.log(sensorData);

  //     for (var index in sensorData) {
  //       var sensor = sensorData[index];
  //       if (sensor && sensor.sensorTypeString) {
  //         addSensor(index);
  //       }
  //     }

  //     function addSensor(index) {
  //       var sensor = data.devices[deviceId].instances[0].commandClasses[49].data[index];
  //       // console.log(index);
  //       // console.log(sensor);
  //       var type = sensor.sensorTypeString.value;
  //       //console.log(type);
  //       var o = {type: type};
  //       self[type] = o;
  //       Object.defineProperty(o, 'value', {
  //         get: function () {
  //           // sensor data may have been replaced... grab latest
  //           var sensor = data.devices[deviceId].instances[0].commandClasses[49].data[index];
  //           return sensor.val.value;
  //         },
  //         enumerable: true
  //       });
  //       Object.defineProperty(o, 'displayValue', {
  //         get: function () {
  //           // sensor data may have been replaced... grab latest
  //           var sensor = data.devices[deviceId].instances[0].commandClasses[49].data[index];
  //           return sensor.val.value + sensor.scaleString.value;
  //         },
  //         enumerable: true
  //       });
  //     }

  //     this.refresh = function() {
  //       webRequest.get(getUrl(deviceId, 'SensorMultilevel', 'Get()'), function(data) {
  //         //console.log(data);
  //       });
  //     };
  //   },
  //   SwitchBinary: function(deviceId, data) {
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
  //   },
  //   DoorLock: function(deviceId, data) {
  //     this.id = deviceId;
  //     Object.defineProperty(this, 'status', {
  //       get: function () {
  //         //console.log(deviceId, data.devices[deviceId]);
  //         switch (data.devices[deviceId].instances[0].commandClasses[98].data.mode.value) {
  //           case 255:
  //             return 'locked';
  //           case 0:
  //             return 'unlocked';
  //           default:
  //             return 'unknown';
  //         }
  //       }, enumerable: true
  //     });
  //     this.refresh = function() {
  //       webRequest.get(getUrl(deviceId, 'DoorLock', 'Get()'));
  //     };
  //     this.lock = function() {
  //       webRequest.get(getUrl(deviceId, 'DoorLock', 'Set(255)'));
  //     };
  //     this.unlock = function() {
  //       webRequest.get(getUrl(deviceId, 'DoorLock', 'Set(0)'));
  //     };
  //   }
  // };

  // function mapFunctions(commandClasses, toDevice, data) {
  //   var name;
  //   for (var classId in commandClasses) {
  //     name = commandClasses[classId].name;
  //     if (functions[name]) {
  //       toDevice[name] = new functions[name](toDevice.id, data);
  //     } else {
  //       toDevice[name] = {};
  //     }
  //   }
  // }
  // function getUrl(deviceId, className, command) {
  //   return util.format('%sdevices[%s].instances[0].%s.%s', runUrl, deviceId, className, command);
  // }

}


// ---- METHODS ----

DeviceApi.prototype._getUrl = function(deviceId, className, command) {
  return util.format('%sdevices[%s].instances[0].commandClasses[%s].%s', this._runUrl, deviceId, className, command);
};

DeviceApi.prototype.runCommand = function(deviceId, className, command, maxRetries, retryCount) {
  var self = this;
  var url = self._getUrl(deviceId, className, command);
  return webRequest.get(url)
  .fail(function(err) {
    console.error('Error running command:'+err);
    if (retryCount < maxRetries) {
      return self.runCommand(deviceId, className, command, maxRetries, retryCount || 1);
    } else {
      console.error('Max retried reached');
      throw err;
    }
  })
  .then(function(response) {
    debug('Response: ', response);
  });
};

DeviceApi.prototype.poll = function(interval) {
  var self = this;
  var isRefreshing = false;
  if (!interval) interval = 1000;

  self._timer = setInterval(function() {

    if (isRefreshing) {
      // skip this cycle
      return;
    }

    isRefreshing = true;
    self.refresh()
      .fail(function(err) {
        console.error(err.stack, err);
      })
      .then(function() {
        isRefreshing = false;
      })
      .done();


  }, interval);
};

DeviceApi.prototype.getDeviceInfo = function(deviceId, commandClass) {
  var data = this._deviceData.devices[deviceId];
  if (!commandClass || !data) return data || {};
  return data[commandClass] || {};
};

DeviceApi.prototype.getDevice = function(id, commandClasses) {
  return new Device(this, id, commandClasses);
};

DeviceApi.prototype.on = function(device, commandClass, eventId, cb) {
  this._evt.on([String(device), String(commandClass), String(eventId)], cb);
};

DeviceApi.prototype.onAny = function(cb) {
  this._evt.onAny(cb);
};

DeviceApi.prototype.emit = function(device, commandClass, eventId, data) {
  var evtData = {
    device: device,
    class: commandClass,
    className: ccNames[commandClass],
    event: eventId,
    data: data
  };
  var evt = [String(device), String(commandClass), String(eventId)];
  debug(chalk.yellow('Emitting'), evt, evtData);
  this._evt.emit(evt, evtData);
};

DeviceApi.prototype._emit = function(keyStr, data) {
  var evtKey = this._parseKey(keyStr);
  this.emit(evtKey.deviceId, evtKey.commandClass, evtKey.eventId, data);
};

DeviceApi.prototype._parseKey = function(keyStr) {
  // console.log('_parseKey',keyStr);
  var evtKey = {};
  // devices.7.instances.0.commandClasses.32.data...
  var keys = keyStr.split('.');
  var idStart = 0;
  
  if (keys[0] === 'devices') {
    evtKey.deviceId = keys[1];
    idStart = 3;
  }

  if (keys.length > 5 && keys[4] === 'commandClasses') {
    evtKey.commandClass = keys[5];
    idStart = 7;
  }

  evtKey.eventId = keys.splice(idStart).join('.');

  return evtKey;
};

/**
 * Loads device data for all devices from the API
 * @return {[type]} [description]
 */
DeviceApi.prototype.load = function() {
  debug('Loading...');
  var self = this;
  return webRequest.get(self._dataUrl + 0)
  .then(function(response) {
    debug('Response: ', response);
    debug(response);
    self._parseLoadedData(response);
    //console.log(response);
    //processResponse(data);
    return self._deviceData;
  });
};

/**
 * Parses the device data loaded from the API
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
DeviceApi.prototype._parseLoadedData = function(data) {
  // TODO: parse through data and intercept values
  this._deviceData = dataParser.parse(data);
  this._timestamp = data.updateTime;
  // console.log('_deviceData', this._deviceData);
};

/**
 * If device data hasn't been loaded, then loads it
 * @return {[type]} [description]
 */
DeviceApi.prototype._loadIfRequired = function() {
  if (this._deviceData) {
    return Q.resolve(this._deviceData);
  }
  return this.load();
};

DeviceApi.prototype.refresh = function() {
  var self = this;
  return self._loadIfRequired()
  .then(function() {
    return webRequest.get(self._dataUrl + self._timestamp);
  })
  .then(function(response) {
    self._timestamp = response.updateTime;
    //self._data = response;
    //console.log(response);
    //processResponse(data);
    return self._parseChanges(response);
  });
};

DeviceApi.prototype._parseChanges = function(changes) {
  var self = this;
  var keys = Object.keys(changes);
  keys.forEach(function(key) {
    if (key === 'updateTime') return;
    //console.log(key);
    self._parseChange(key, changes[key]);
  });
  return changes;
};

DeviceApi.prototype._parseChange = function(key, change) {
  dataParser.mergeInto(this._deviceData, key, change);
  this._emit(key, dataParser.parseValue(change));
// //  console.log(chalk.blue(key), change);
//   var keyParts = key.split('.');
//   //console.log(chalk.green(keyParts));
//   if (keyParts[0] !== 'devices') return;
//   var deviceId = keyParts[1];

//   if (keyParts[2] === 'data') {
//     return this._parseDeviceData(deviceId, keyParts.slice(3, keyParts.length), change);
//   }

//   if (keyParts[2] !== 'instances') return;
//   var instanceId = keyParts[3];

//   if (keyParts[4] !== 'commandClasses') return;
//   var classId = Number(keyParts[5]);
//   return this._parseCommandClassData(deviceId, classId, keyParts.slice(6, keyParts.length), change);
};

DeviceApi.prototype._parseDeviceData = function(deviceId, keyData, value) {
  //console.log(deviceId, keyData, value);

  var devices = this._deviceData;
  if (!devices[deviceId]) {
    devices[deviceId] = {};
  }

  if (keyData.length !== 1) {
    debug(chalk.red('Unexpected keydata length'), keyData);
    return;
  }
  var val = this._parseValue(value);
  devices[deviceId][keyData[0]] = val;
  debug(chalk.cyan('Parsing device data'), deviceId, keyData[0], val);

  //console.log(chalk.red('Devices'), devices);
};

DeviceApi.prototype._parseCommandClassData = function(deviceId, commandClass, keyData, value) {
  var devices = this._deviceData;
  if (!devices[deviceId]) {
    devices[deviceId] = {};
  }

  if (keyData[0] !== 'data') {
    debug(chalk.red('Unexpected key'), keyData[0]);
    return;
  }

  // if (keyData[1] === 'V1event') {
  //   return this._parseEvent(deviceId, commandClass, keyData, value);
  // }

  // if (commandClass == 112) {
  //   return this._parseConfig(deviceId, commandClass, keyData, value);
  // }

  var key = keyData[1];
  var val = this._parseValue(value);

  debug(chalk.green('CommandClassData'), deviceId,commandClass, key, val);
  
  // todo: dont attach directly to object... create sub-objects per type
  devices[deviceId][key] = val;
  this.emit(deviceId, commandClass, key, val);

  //console.log(chalk.red('Devices'), devices);
};

DeviceApi.prototype._parseConfig = function(deviceId, commandClass, keyData, value) {
  if (keyData[0] !== 'data') {
    debug(chalk.red('Unexpected event key'), keyData[0]);
    return;
  }

  var configParam = keyData[1];

  var val = this._parseValue(value.val);
  var size = this._parseValue(value.size);

  var data = {
    val: val,
    size: size
  };

  debug(chalk.cyan('Parsing config'), deviceId, commandClass, configParam, data);

  this.emit(deviceId, commandClass, configParam, data);
};

DeviceApi.prototype._parseEvent = function(deviceId, commandClass, keyData, value) {
  if (keyData[0] !== 'data') {
    debug(chalk.red('Unexpected event key'), keyData[0]);
    return;
  }

  var evt = keyData[1];

  var alarmType = this._parseValue(value.alarmType);
  var level = this._parseValue(value.level);

  var evtData = {
    alarmType: alarmType,
    alarmTypeName: alarmTypes[alarmType],
    level: level
  };

  debug(chalk.cyan('Parsing event'), deviceId, commandClass, evt, evtData);

  this.emit(deviceId, commandClass, evt, evtData);
};

DeviceApi.prototype._parseValue = function(data) {
  return dataParser.parseValue(data);
};

// DeviceApi.prototype.refreshSince = function(timestamp) {
//   var self = this;
//   return webRequest.get(self._dataUrl + timestamp)
//   .then(function(response) {
//     console.log(response);
//     return response;
//   });
// };

// DeviceApi.prototype.getTimestamp = function() {
//   return new Date().getTime();
// };

// DeviceApi.prototype._processResponse = function(data) {
//   var self = this;
//   var data = self._data;
//   var dev;
//   for (var deviceId in data.devices) {
//     dev = data.devices[deviceId];
//     var device = {};
//     device = {
//       id: deviceId,
//       type: dev.data.deviceTypeString.value,
//       vendor: dev.data.vendorString.value
//     };
//     mapFunctions(dev.instances['0'].commandClasses, device, data);
//     _devices[deviceId] = device;
//   }
// };
