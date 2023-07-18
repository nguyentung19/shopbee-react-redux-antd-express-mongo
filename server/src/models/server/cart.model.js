const cartModel = require("../../schemas/cart.schema");
const helper = require("../../utils/helper");

module.exports = {
  create: (userId, cart) => {
    let bill = {
      cartCode: helper.randomCartCode(10),
      user: userId,
      cart,
      status: 0,
    };
    return cartModel(bill).save();
  },

  listItems: async (params, option) => {
    if (option.task === "all") {
      return await cartModel
        .find()
        .populate({ path: "user", model: "users" })
        .populate({ path: "cart.product", model: "products" });
    }
  },

  updateStatus: (data) => {
    const { id, status } = data;
    return cartModel.findByIdAndUpdate(
      { _id: id },
      { status: status },
      { new: true }
    );
  },

  deleteCart: (params, option) => {
    if (option.task === "single") {
      return cartModel.deleteOne({ _id: params.id });
    }
  },

  getClientOrders: (clientId) => {
    return cartModel
      .find({ user: { $in: clientId.id } })
      .populate({ path: "cart.product", model: "products" });
  },
};
