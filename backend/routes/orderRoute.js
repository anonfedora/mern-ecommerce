const express = require("express");
const router = express();
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");

module.exports = router;