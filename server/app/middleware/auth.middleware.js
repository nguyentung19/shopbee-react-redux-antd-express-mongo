const jwt = require("jsonwebtoken");
const system = require("../configs/system");
const UserModel = require("../models/server/user.model");

exports.Protect = async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  try {
    const decodeToken = jwt.verify(token, system.JWT_SECRET);

    req.user = await UserModel.getUser(
      { id: decodeToken._id },
      {
        task: "single",
      }
    );
    

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Xin vui lòng đăng nhập",
    });
  }
};
