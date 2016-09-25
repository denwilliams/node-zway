'use strict';

const debug = require('./debug');
const NOT_IN_ARRAY = -1;

/**
 * Parses a value struct from Z-Way and returns a plain JS value
 * @param  {*} value [description]
 * @return {*}       [description]
 */
const parseValue = exports.parseValue = (value) => {
  if (value === null || value === undefined) return value;

  if (typeof value !== 'object' || !value.type) {
    return value;
  }

  switch (value.type) {
    case 'int':
    case 'float':
    case 'bool':
    case 'string':
    case 'binary':
      return value.value;
    case 'empty':
      // console.log(value);
      var res = mapValuesExcluding(value, ['type', 'value', 'updateTime', 'interviewCounter', 'interviewDone', 'invalidateTime', 'value']);
      if (Object.keys(res).length === 0) {
        return value.value;
      }
      return res;
      // var val = {};
      // var dataVal;
      // for (var prop in value) {
      //   dataVal = value[prop];
      //   if (typeof dataVal === 'object' && dataVal && dataVal.type) {
      //     val[prop] = parseValue(value[prop]);
      //   }
      // }
      // return val;
    default:
      return value;
  }
};

const parse = exports.parse = (data) => {
  var res = {devices:{}, controller:parseController(data.controller)};
  var devices = data.devices;
  for (var key in data.devices) {
    res.devices[key] = parseDevice(data.devices[key]);
    debug('');
    debug('');
    debug('');
    debug('');
    debug(res.devices[key]);
  }
  return res;
};

/**
 *
 * @param {*} data
 * @param {string} keyStr - dot.separated.key
 * @param {}
 */
const mergeInto = exports.mergeInto = (data, keyStr, value) => {
  // extract the actual value
  value = parseValue(value);

  const origKeys = keyStr.split('.');
  const keys = [];

  for (var i = 0; i < origKeys.length; i++) {
    let key = origKeys[i];
    if (key === 'data' || key === 'commandClasses') {
      // skip
    } else if (key === 'instances') {
      // skip this and the next
      i++;
    } else {
      // include
      keys.push(key);
    }
  }

  var lastKey = keys.splice(keys.length - 1);
  lastKey = lastKey.length === 0 ? null : lastKey[0];

  var curr = data;
  keys.forEach(key => {
    curr = curr[key];
  });
  curr[lastKey] = value;
  return data;
};

const construct = exports.construct = (keyStr, value) => {
  value = parseValue(value);
  var keys = keyStr.split('.');
  var lastKey = keys.splice(keys.length - 1);
  var newData = {};
  var curr = newData;
  keys.forEach(function (key) {
    var newObj = {};
    curr[key] = newObj;
    curr = newObj;
  });
  curr[lastKey] = value;
  return parse(newData);
};

function parseController(controller) {
  if (!controller) return undefined;
  var res = {};
  return res;

  /*

  { controller:
   { data:
      { value: null,
        type: 'empty',
        nodeId: [Object],
        homeId: [Object],
        SUCNodeId: [Object],
        isPrimary: [Object],
        isInOthersNetwork: [Object],
        isRealPrimary: [Object],
        isSUC: [Object],
        SISPresent: [Object],
        libType: [Object],
        SDK: [Object],
        ZWlibMajor: [Object],
        ZWlibMinor: [Object],
        ZWLib: [Object],
        ZWVersion: [Object],
        ZWaveChip: [Object],
        APIVersion: [Object],
        manufacturerId: [Object],
        vendor: [Object],
        manufacturerProductType: [Object],
        manufacturerProductId: [Object],
        capabilities: [Object],
        controllerState: [Object],
        nonManagmentJobs: [Object],
        lastIncludedDevice: [Object],
        lastExcludedDevice: [Object],
        secureInclusion: [Object],
        oldSerialAPIAckTimeout10ms: [Object],
        oldSerialAPIByteTimeout10ms: [Object],
        curSerialAPIAckTimeout10ms: [Object],
        curSerialAPIByteTimeout10ms: [Object],
        countJobs: [Object],
        memoryGetAddress: [Object],
        memoryGetData: [Object],
        functionClasses: [Object],
        functionClassesNames: [Object],
        softwareRevisionVersion: [Object],
        softwareRevisionId: [Object],
        softwareRevisionDate: [Object],
        uuid: [Object],
        invalidateTime: 1440305234,
        updateTime: 1440305235 } },

   */
}

function parseDevice(device) {
  // how could there be multiple instances??
  var instance = device.instances[0];

  var res = parseBasicDeviceData(device.data);
  debug(res);
  var cls, clsData;

  for (var cmdCls in instance.commandClasses) {
    cls = instance.commandClasses[cmdCls];
    clsData = parseCommandClass(cls.data);
    res[cmdCls] = clsData;
    if (cls.name) res[cls.name] = clsData;
  }

  // TODO: command class aliases
  return res;
}

function parseBasicDeviceData(data) {
  if (!data) return {};

  var keys = [
    'givenName',
    'manufacturerId',
    'vendorString',
    'manufacturerProductId',
    'manufacturerProductType',
    'deviceTypeString',
    'basicType',
    'genericType',
    'specificType',
    'isAwake',
    'isFailed',
    'isListening',
    'isRouting',
    'isVirtual',
    'keepAwake'
  ];
  return mapValues(data, keys);
  // var res = {
  //   //id : parseValue,
  //   model : instance.model,
  // };
}

function mapValues(obj, keys) {
  var res = {};
  keys.forEach(function(key) {
    res[key] = parseValue(obj[key]);
  });
  return res;
}

function mapValuesExcluding(obj, excludeKeys) {
  var res = {};
  var keys = Object.keys(obj).filter(function(key) {
    return excludeKeys.indexOf(key) === NOT_IN_ARRAY;
  });

  keys.forEach(function(key) {
    res[key] = parseValue(obj[key]);
  });

  return res;
}

function parseCommandClass(clsData) {
  //console.log('parseCommandClass', clsData);
  var res = parseValue(clsData);
  return res;
}

