exports.get = get;
exports.set = set;
var def = {
  "MONGODB_URL":"mongodb://127.0.0.1:27017/rhmhcp_dev"
};

var dynamic = {

};

function get(key) {
  return typeof dynamic[key] !== "undefined" ? dynamic[key] : typeof process.env[key] !== "undefined" ? process.env[key] : def[key];
}
function set(key, val) {
  dynamic[key] = val;
}