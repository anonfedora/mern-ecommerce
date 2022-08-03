const express = require("express");
const {
  registerUser,
  userLogin,
  forgotPassword,
  logout,
  passwordReset,
  getUserDetails,
  passwordUpdate,
  profileUpdate,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  userDelete,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(userLogin);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(passwordReset);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, passwordUpdate);
router.route("/me/update").put(isAuthenticatedUser, profileUpdate);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);


router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
.put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
.delete(isAuthenticatedUser, authorizeRoles("admin"), userDelete);


module.exports = router;
