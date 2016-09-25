exports.create = function(rootUrl) {
  var fakeApi = nock('http://zway', {allowUnmocked: true})
    .get('/').reply(200, '');

  return fakeApi;
};
