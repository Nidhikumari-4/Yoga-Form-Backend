const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  enrollments: [{ type: Schema.Types.ObjectId, ref: "Enrollment" }],
});

const Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
