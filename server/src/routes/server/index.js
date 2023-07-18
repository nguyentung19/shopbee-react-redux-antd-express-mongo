const router = require("express").Router();

router.use("/category", require("./category.route"));
router.use("/product", require("./product.route"));
router.use("/user", require("./user.route"));
router.use("/auth", require("./auth.route"));
router.use("/cart", require("./cart.route"));

module.exports = router;
