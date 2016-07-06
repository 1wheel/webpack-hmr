require("./style.css");

var draw = require("./draw.js");

module.exports = null;

if(module.hot) {
  module.hot.accept();

  module.hot.dispose(function() { });
}