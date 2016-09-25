const test = require('ava');
const DeviceApi = require('../lib').DeviceApi;
const nock = require('nock');

const host = 'zway';
const url = 'http://'+host+':8083';

const data = require('./data.json');

test('should load all data on refresh', t => {
  var deviceApi = new DeviceApi(host);

  var fakeApi = nock(url, { allowUnmocked: false })
    .get('/ZWaveAPI/Data/0')
      .reply(200, data)
    .get('/ZWaveAPI/Data/'+data.updateTime)
      .reply(200, {updateTime:data.updateTime+1});

  return deviceApi.refresh()
  .then(() => {
    if (!fakeApi.isDone()) throw new Error('NOT DONE');
  });
});
