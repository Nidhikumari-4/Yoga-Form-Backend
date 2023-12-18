const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
  participantId: {
    type: Schema.Types.ObjectId,
    ref: "Participant",
    required: true,
  },
  batch: {
    type: String,
    required: true,
    enum: ["6-7 AM", "7-8 AM", "8-9 AM", "5-6 PM"],
  },
  month: {
    type: String,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Auguest",
      "September",
      "October",
      "November",
      "December",
    ],
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
});

enrollmentSchema.statics.createEnrollment = async function (
  participantId,
  batch,
  month,
  callback
) {
  try {
    const enrollment = await new this({
      participantId: participantId,
      batch: batch,
      month: month,
      paymentStatus: true,
    });
    const newEnrollment = await enrollment.save();
    callback(null, newEnrollment);
  } catch (error) {
    callback(error, null);
  }
};

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
