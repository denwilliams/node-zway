exports.create = function(rootUrl) {
  var fakeApi = nock('http://zway', {allowUnmocked: true})
    .get('/').reply(200, '');

  return fakeApi;
};


// request('http://api.example.com/musics', function(error, response) {
//   expect(musicList.isDone()).to.eql(true);
//   done();
// });
