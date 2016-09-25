if (global.Promise) exports.Promise = global.Promise;
const promise = exports;
promise.register = (Promise) => {
  exports.Promise = Promise;
};
promise.new = (fn) => new exports.Promise(fn);
promise.try = (fn) => {
  return exports.Promise.resolve().then(fn);
};
promise.value = (value) => {
  return exports.Promise.resolve(value);
};
promise.call = (fn, arg) => {
  return promise.new((resolve, reject) => {
    fn.call(null, arg, (err, res) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};
