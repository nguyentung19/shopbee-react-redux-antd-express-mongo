const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: String,
  image: Object,
  category: String,
  statusBoolean: Boolean,
  price: Number,
  
});

module.exports = model("products", productSchema);
