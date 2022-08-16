const express = require("express");
const {
  createProduct,
  getProductDetails,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
  deleteReview,
  getProductReviews,
  getAllProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

  router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

  router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
