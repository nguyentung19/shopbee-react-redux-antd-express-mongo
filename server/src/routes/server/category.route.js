const router = require("express").Router();
const categoryModel = require("../../models/server/category.model");
const uploadCloud = require("../../utils/cloudinary.util");
const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

// ADD CATEGORY
router.post("/add", uploadCloud.single("thumbUrl"), async (req, res) => {
  try {
    let imagePath = "";
    req.file
      ? (imagePath = req.file.path)
      : cloudinary.uploader.destroy(req.file.filename);

    const result = {
      ...req.body,
      thumbUrl: imagePath,
    };

    const data = await categoryModel.create(result);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

// GET ALL CATEGORIES
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const data = await categoryModel.listItems(req.query, { task: "all" });

    res.status(200).json({
      success: true,
      data,
    });
  })
);

// DELETE SINGLE CATEGORY
router.delete("/delete/:id", async (req, res) => {
  try {
    const formatedIdArray = req.params.id.split(",");
    if (formatedIdArray.length > 1) {
      const data = await categoryModel.deleteItem(
        { id: formatedIdArray },
        { task: "many" }
      );

      res.status(200).json({
        success: true,
        data,
      });
    } else {
      const data = await categoryModel.deleteItem(
        { id: req.params.id },
        { task: "single" }
      );

      res.status(200).json({
        success: true,
        message: data,
      });
    }
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
});

// edit
router.put(
  "/edit/:id",
  uploadCloud.single("thumbUrl"),
  asyncHandler(async (req, res) => {
    const data = await categoryModel.editCategory({
      id: req.params.id,
      dataForm: req.body,
      thumbUrl: req.file ?? null,
    });

    res.status(201).json({
      success: true,
      data,
    });
  })
);

module.exports = router;
