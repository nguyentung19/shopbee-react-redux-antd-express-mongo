const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  thumbUrl: {
    type: String,
    required: [true, "ThumbUrl is required"],
  },
  statusBoolean: {
    type: Boolean,
    required: [true, "Status is required"],
  },
  products: [{ type: Schema.Types.ObjectId, ref: "products" }],
});

module.exports = model("categories", categorySchema);
