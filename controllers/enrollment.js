const Participant = require("../models/participants.models");
const Enrollment = require("../models/enrollment.models");

exports.createEnrollment = async (req, res) => {
  try {
    const { name, email, age, phone, batch, month } = req.body;
    if (age < 18 || age > 65) {
      return res.status(400).json({
        error: "Age must be between 18 and 65 to enroll",
        message: "Age must be between 18 and 65 to enroll",
      });
    }

    const allowedBatches = ["6-7 AM", "7-8 AM", "8-9 AM", "5-6 PM"];
    if (!allowedBatches.includes(batch)) {
      return res.status(400).json({
        error: "Invalid batch selection",
        message: "Invalid batch selection",
      });
    }

    if (!email || !name || !phone || !batch || !month) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Missing required fields",
      });
    }

    let participant = await Participant.findOne({
      email: email,
      phone: phone,
    });

    if (!participant) {
      participant = await new Participant({
        name,
        email,
        age,
        phone,
      }).save();
    }

    await Enrollment.createEnrollment(
      participant._id,
      batch,
      month,
      function (err, newEnrollment) {
        if (err) {
          console.log("Error in creating enrollment", err);
          return res.json(500, {
            message: "Error in creating enrollment",
            error: err,
          });
        }

        participant.enrollments.push(newEnrollment._id);
        participant.save();

        return res.json(200, {
          message: "Enrollment created",
          enrollment: newEnrollment,
        });
      }
    );
  } catch (error) {
    console.error("Error enrolling participant:", error);
    res.status(500).json({ error: "Failed to enroll participant" });
  }
};
