const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const cartModel = require("../../models/server/cart.model");

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { userId, cart } = req.body;

    const response = await cartModel.create(userId, cart);

    res.status(200).json({
      success: true,
      response,
    });
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const cartList = await cartModel.listItems(req.params, { task: "all" });

    res.status(200).json({
      success: true,
      cartList,
    });
  })
);

router.get(
  "/clientOrders/:id",
  asyncHandler(async (req, res) => {
    const response = await cartModel.getClientOrders({ id: req.params.id });

    res.status(200).json({
      success: true,
      response,
    });
  })
);

router.put(
  "/edit/:id",
  asyncHandler(async (req, res) => {
    const data = await cartModel.updateStatus({
      id: req.params.id,
      status: req.body.status,
    });

    res.status(200).json({
      success: true,
      data,
    });
  })
);

router.delete(
  "/delete/:id",
  asyncHandler(async (req, res) => {
    const response = await cartModel.deleteCart(
      { id: req.params.id },
      { task: "single" }
    );

    res.status(200).json({
      success: true,
      response,
    });
  })
);

module.exports = router;
