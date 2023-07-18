const userModel = require("../../schemas/user.schema");

module.exports = {
  checkUser: async (email) => {
    const user = await userModel.exists({ email });

    if (user) {
      return true;
    }

    return false;
  },

  create: async (userInfo) => {
    // // register and create token
    // const newUser = await userModel(userInfo).save();
    // return await newUser.getSignedJwtToken();

    // only register
    return userModel(userInfo).save();
  },

  getUser: (params, option) => {
    if (option.task === "single") {
      return userModel.findOne({ _id: params.id });
    }
    if (option.task === "all") {
      return userModel.find({ email: { $ne: "admin@gmail.com" } });
    }
  },

  deleteUser: (params, option) => {
    if (option.task === "single") {
      return userModel.deleteOne({ _id: params.id });
    }
    if (option.task === "many") {
      return userModel.deleteMany({ _id: params.id });
    }
  },

  editUser: ({ id, data }) => {
    return userModel.findByIdAndUpdate(id, data, { new: true });
  },
};
