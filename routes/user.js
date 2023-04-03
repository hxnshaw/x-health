const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUsers,
  getSingleUser,
  getAllUsers,
  showMyProfile,
  editUserProfile,
  updateUserPassword,
  deleteUser,
} = require("../controllers/user");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router.route("/register").post(registerUser);

router.route("/login").post(loginUsers);

router
  .route("/users/:id")
  .patch(authenticateUser, editUserProfile)
  .delete(authenticateUser, authorizePermissions("clerk"), deleteUser);

router.route("/users/profile").get(authenticateUser, showMyProfile);

router
  .route("/users/profile/updatePassword")
  .patch(authenticateUser, updateUserPassword);

router
  .route("/users/:email")
  .get(authenticateUser, authorizePermissions("clerk"), getSingleUser);

router
  .route("/users")
  .get(authenticateUser, authorizePermissions("clerk"), getAllUsers);

module.exports = router;
