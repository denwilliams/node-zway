const test = require('ava');
const helper = require('./_helper');
const commandClasses = helper.commandClasses;
const newDeviceApi = helper.newDeviceApi;
const nock = helper.nock;

const data = require('./data.json');

test('should return #DoorLock and #98 when getting a lock device', t => {
  const deviceApi = newDeviceApi();
  const device = deviceApi.getDevice(100, commandClasses.ids.DoorLock);

  t.truthy(device.DoorLock);
  t.truthy(device[98]);
  t.deepEqual(device[98], device.DoorLock);
});

test('should set command class 98 to 255 when locking', t => {
  const deviceApi = newDeviceApi();
  const device = deviceApi.getDevice(101, commandClasses.ids.DoorLock);

  const fakeApi = nock()
    .get('/ZWaveAPI/Run/devices[101].instances[0].commandClasses[98].Set(255)')
    .reply(200, 'null');

  return device.DoorLock.lock()
  .then(() => {
    if (!fakeApi.isDone()) throw new Error('NOT DONE');
  });
});

test('should set command class 98 to 0 when unlocking', t => {
  const deviceApi = newDeviceApi();
  const device = deviceApi.getDevice(102, commandClasses.ids.DoorLock);

  const fakeApi = nock()
    .get('/ZWaveAPI/Run/devices[102].instances[0].commandClasses[98].Set(0)')
    .reply(200, 'null');

  return device[98].unlock()
  .then(() => {
    if (!fakeApi.isDone()) throw new Error('NOT DONE');
  });
});

test('should fire mode events when lock status changes', t => {
  t.plan(1);
  const deviceApi = newDeviceApi();
  const device = deviceApi.getDevice(5, commandClasses.ids.DoorLock);
  const value = { value: 1, type: 'int', invalidateTime: 1425120258, updateTime: 1440536422 };

  var fakeApi = nock()
    .get('/ZWaveAPI/Data/0')
      .reply(200, data)
    .get('/ZWaveAPI/Data/' + data.updateTime)
      .reply(200, { updateTime: data.updateTime + 1, 'devices.5.instances.0.commandClasses.98.data.mode': value });

  device.on('mode', (e) => {
    t.pass();
  });

  return deviceApi.refresh()
  .then(() => {
    if (!fakeApi.isDone()) throw new Error('NOT DONE');
  });
});
