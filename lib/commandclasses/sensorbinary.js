const EventEmitter = require('events').EventEmitter;
const generic = require('./generic');

const CLASS_NAME = 'SensorBinary';
const CLASS_ID = require('./ids')[CLASS_NAME];

exports.id = CLASS_ID;
exports.name = CLASS_NAME;

exports.create = (deviceApi, deviceId) => {
  const result = generic.create(CLASS_ID, deviceApi, deviceId);
  const evt = new EventEmitter();
  deviceApi.on(deviceId, CLASS_ID, '*', e => {
    // the event is the sensor ID
    const id = e.event;
    if (isNaN(id)) return;
    evt.emit('change', mapSensor(id, e.data));
  });
  result.getItems = () => {
    const info = deviceApi.getDeviceInfo(deviceId, CLASS_ID);
    return Object.keys(info)
      .filter(key => !isNaN(key))
      .map(key => mapSensor(key, info[key]));
  };
  result.onChange = evt.on.bind(evt, 'change');
  return result;
};

function mapSensor(id, data) {
  return {
    id: id,
    type: data.sensorTypeString,
    level: data.level
  };
}


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