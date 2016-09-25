const lib = require('..');
const DeviceApi = lib.DeviceApi;
const commandClasses = lib.commandClasses;
const nock = require('nock');

const HOST = 'zway';
const URL = `http://${HOST}:8083`;

module.exports = {
  DeviceApi,
  commandClasses,
  newDeviceApi: () => new DeviceApi(HOST),
  nock: () => nock(URL, {allowUnmocked: false})
};
