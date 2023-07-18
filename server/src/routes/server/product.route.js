const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const productModel = require("../../models/server/product.modal");
const { productUpload } = require("../../middleware/product.middleware");

// add product
router.post(
  "/add",
  productUpload.single("image"),
  asyncHandler(async (req, res) => {
    const newProduct = {
      ...req.body,
      image: req.file,
    };

    const data = await productModel.create(newProduct);

    res.status(201).json({
      success: true,
      data,
    });
  })
);

// get all
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await productModel.listItems(req.params, { task: "all" });

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  })
);

// get single product
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = await productModel.listItems(
      { id: req.params.id },
      { task: "single" }
    );

    res.status(200).json({
      success: true,
      data,
    });
  })
);

// delete single product
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const formatedArray = req.params.id.split(",");
    if (formatedArray.length > 1) {
      const data = await productModel.deleteItems(
        { id: formatedArray },
        { task: "many" }
      );

      res.status(200).json({
        success: true,
        data,
      });
    } else {
      const data = await productModel.deleteItems(
        { id: req.params.id },
        { task: "single" }
      );

      res.status(200).json({
        success: true,
        data,
      });
    }
  })
);

// edit
router.put(
  "/edit/:id",
  productUpload.single("image"),
  asyncHandler(async (req, res) => {
    Object.keys(req.body).forEach((key) => {
      if (key === "image") {
        req.body[key] = JSON.parse(req.body[key]);
      }
    });

    const data = await productModel.editItem({
      id: req.params.id,
      dataForm: req.body,
      image: req.file ?? null,
    });

    res.status(200).json({
      success: true,
      data,
    });
  })
);

module.exports = router;
