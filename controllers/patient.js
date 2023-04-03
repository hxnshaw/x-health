const { Patient } = require("../models");

exports.registerPatient = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    birthDate,
    gender,
    telephone_number,
    payment_category,
  } = req.body;

  try {
    const patientAlreadyExists = await Patient.findOne({
      where: { telephone_number: telephone_number },
    });
    if (patientAlreadyExists) {
      return res
        .status(400)
        .json({ message: "This number is registered to a patient" });
    }
    const patient = await Patient.create({
      first_name,
      middle_name,
      last_name,
      birthDate,
      gender,
      telephone_number,
      payment_category,
    });

    return res.status(201).json({
      message: `${patient.first_name} ${patient.middle_name} ${patient.last_name} registered successfully`,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.getSinglePatient = async (req, res) => {
  const { patient_id: patient_id } = req.params;

  try {
    const patient = await Patient.findOne({
      where: { patient_id: patient_id },
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    return res.status(200).json({ data: patient });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
