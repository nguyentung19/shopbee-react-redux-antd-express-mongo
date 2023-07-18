const userModel = require("../../schemas/user.schema");

module.exports = {
  login: async (userInfo, res) => {
    const { email, password } = userInfo;
    const result = await userModel.findByCredentials(email, password);

    if (result.error) {
      res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    return await result.user.getSignedJwtToken();
  },
};
