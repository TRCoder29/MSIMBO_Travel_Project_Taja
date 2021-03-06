var connectionString = 'mongodb://127.0.0.1:27017/travel'; // for local


if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds111562.mlab.com:11562/heroku_xhtkg1lx'; // use yours
}

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);


module.exports = db;