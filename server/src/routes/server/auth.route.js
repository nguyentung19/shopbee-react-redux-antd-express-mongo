const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const authModel = require("../../models/server/auth.model");
const system = require("../../configs/system");
const { Protect } = require("../../middleware/auth.middleware");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const token = await authModel.login(req.body, res);

    if (token) {
      res
        .status(201)
        .cookie("token", token, {
          expires: new Date(Date.now() + system.COOKIE_EXP),
          httpOnly: true,
        })
        .json({
          success: true,
          token,
        });
    }
  })
);

router.get(
  "/me",
  Protect,
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      user : req.user,
    });
  })
);

module.exports = router;
