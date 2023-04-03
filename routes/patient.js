const express = require("express");

const router = express.Router();

const { registerPatient, getSinglePatient } = require("../controllers/patient");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/patients/register")
  .post(authenticateUser, authorizePermissions("clerk"), registerPatient);

router
  .route("/patients/:patient_id")
  .get(authenticateUser, authorizePermissions("clerk"), getSinglePatient);

module.exports = router;
