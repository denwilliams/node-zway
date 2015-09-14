var debug = console.log.bind(console);
debug = function() {};


/**
 * Parses a value from 
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
function parseValue(value) {
  if (value === null) return null;
  if (value === undefined) return undefined;

  if (typeof value !== 'object' || !value.type) {
    //console.log('NOT OBJECT');
    return value;
  }

//  console.log(value.type);
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
}

function parse(data) {
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
}

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

var NOT_IN_ARRAY = -1;
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

function construct(keyStr, value) {
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
}

function mergeInto(data, keyStr, value) {
  // console.log('data', data);
  // console.log('keyStr', keyStr);
  // console.log('value', value);

  value = parseValue(value);

  var origKeys = keyStr.split('.');
  var key;
  var keys = [];

  for (var i = 0; i < origKeys.length; i++) {
    key = origKeys[i];
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
  keys.forEach(function (key) {
    // console.log(key);
    curr = curr[key];
  });
  // console.log(curr, key);
  curr[lastKey] = value;
  // console.log(curr, key);
  // console.log(data.devices[5]);
  return data;
}

exports.parse = parse;
exports.parseValue = parseValue;
exports.mergeInto = mergeInto;
exports.construct = construct;
