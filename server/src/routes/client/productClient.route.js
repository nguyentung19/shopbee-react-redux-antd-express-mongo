const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const productModel = require("../../models/client/productClient.model");

router.get(
  "/",
  asyncHandler(async (req, res) => {

    const {dataCall, pageCount} = await productModel.listItems(req.query, {
      task: "all",
    });

    res.status(200).json({
      success: true,
      count: pageCount,
      data : dataCall,
    });
  })
);

module.exports = router;
