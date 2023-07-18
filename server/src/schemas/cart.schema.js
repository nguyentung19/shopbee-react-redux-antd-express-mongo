const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    cartCode: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        cart: String,
      },
    ],
    status: Number,
  },
  {
    timestamps: true,
  }
);
module.exports = model("carts", cartSchema);
