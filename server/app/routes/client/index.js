const router = require("express").Router();

router.use("/products", require("./productClient.route"));

module.exports = router;
