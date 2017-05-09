const EventEmitter = require('events').EventEmitter;
const generic = require('./generic');

const CLASS_NAME = 'SensorMultilevel';
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
  }

  result.refresh = function () {
    deviceApi.runCommand(deviceId, CLASS_ID, 'Get()');
  };

  result.onChange = evt.on.bind(evt, 'change');

  return result;
};


function mapSensor(id, data) {
  return {
    id: id,
    type: data.sensorTypeString,
    scale: data.scaleString,
    value: data.val
  };
}
