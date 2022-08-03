const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const router = express.Router();

router
.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/products").get(getAllProducts);


module.exports = router;