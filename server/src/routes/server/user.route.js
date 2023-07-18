const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const userModel = require("../../models/server/user.model");
const notify = require("../../configs/notify");

// register
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    const checkUser = await userModel.checkUser(email);
    if (checkUser) {
      return res.status(409).json({
        success: false,
        error: notify.ERROR_EXIST_USER,
      });
    }

    const updatedUser = {
      ...req.body,
      role: req.body.role ?? "user",
    };

    // // create token when register
    // const token = await userModel.create(updatedUser, res);

    // only add new user
    const data = await userModel.create(updatedUser);

    res.status(201).json({
      success: true,
      data,
    });
  })
);

// get single user
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await userModel.getUser(
      { id: req.params.id },
      { task: "single" }
    );

    return res.status(200).json({
      success: true,
      user,
    });
  })
);

// get all user
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await userModel.getUser(req.query, { task: "all" });

    res.status(200).json({
      success: true,
      data,
    });
  })
);

// delete
router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    let result;
    const idArray = req.params.id.split(",");
    if (Array.isArray(idArray) && idArray.length >= 2) {
      result = await userModel.deleteUser({ id: idArray }, { task: "many" });
    } else {
      result = await userModel.deleteUser(
        { id: req.params.id },
        {
          task: "single",
        }
      );
    }

    res.status(200).json({
      success: true,
      result,
    });
  })
);

// edit
router.put(
  "/edit/:id",
  asyncHandler(async (req, res) => {
    const user = await userModel.editUser({
      id: req.params.id,
      data: req.body,
    });

    res.status(201).json({
      success: true,
      user,
    });
  })
);

module.exports = router;
