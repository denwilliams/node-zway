require('should');
var DeviceApi = require('../lib').DeviceApi;
var nock = require('nock');

var host = 'zway';
var url = 'http://'+host+':8083';
var data = require('./data.json');

module.exports = function() {

  it('should load all data on refresh', function (done) {
    var deviceApi = new DeviceApi(host);

    var fakeApi = nock(url, {allowUnmocked: false})
      .get('/ZWaveAPI/Data/0')
        .reply(200, data)
      .get('/ZWaveAPI/Data/'+data.updateTime)
        .reply(200, {updateTime:data.updateTime+1})
        ;

    deviceApi.refresh()
    .then(function() {
      console.log(fakeApi.isDone());
      if (fakeApi.isDone()) done();
      else done(new Error('NOT DONE'));
    })
    .fail(function(err) {
      done(err);
    });
  });

  it('should', function (done) {

    var deviceApi = new DeviceApi(host);

    var fakeApi = nock(url, {allowUnmocked: false})
      .get('/ZWaveAPI/Run/devices[5].instances[0].commandClasses[98].Set(255)')
        .reply(200, 'null');

    var device = deviceApi.getDevice(5, 98);
    device['DoorLock'].lock()
      .then(function () {
        console.log(fakeApi.isDone());
        if (fakeApi.isDone()) done();
        else done(new Error('NOT DONE'));
      })
      .fail(function(err) {
        console.error(err.stack);
      });

  });

};
