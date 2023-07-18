const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const notify = require("../configs/notify");
const system = require("../configs/system");

const schema = new Schema({
  username: String,
  email: String,
  role: String,
  password: String,
  phone: String,
  address: String,
});

// hash password
schema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

// create token
schema.methods.getSignedJwtToken = function () {
  return jwt.sign({ _id: this._id }, system.JWT_SECRET, {
    expiresIn: system.JWT_EXP,
  });
};

schema.statics.findByCredentials = async function (email, password) {
  // get user's info from email
  const user = await this.findOne({ email });

  if (!user) return { error: notify.ERROR_LOGIN };

  // check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: notify.ERROR_LOGIN };

  // when all are successful
  return { user };
};

module.exports = model("users", schema);
