function ExampleModel(message) {
  this.message = message;
  this.User = require('./example.data.model.js');
}

var model = ExampleModel.prototype;

model.toJSON = function * () {
    return this;
};

model.addUser = function * (data) {
  var status, body;

  try {
    yield this.User.findOrCreate({
      where : {
        $or : {
          email : data.email,
          username : data.username
        }
      },
      defaults : {
        first_name : data.first_name,
        last_name : data.last_name,
        email : data.email,
        username : data.username
      }
    }).spread(function(user, created) {
      if(created) {
        status = 201;
        body = "User created!";
      } else {
        status = 400;
        body = "User already exists!";
      }
    });
  } catch (err) {
    status = 409;
    error = err;
  } finally {
    return { status : status, body : body};
  }
};

module.exports = ExampleModel;