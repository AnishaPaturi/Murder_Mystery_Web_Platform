import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema(
  {
    phaseId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      required: true,
      enum: ["HTML", "CSS", "JS", "REACT", "NODE", "MONGODB"],
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    codeTemplate: {
      type: String,
      default: "",
    },
    expectedPattern: {
      type: String,
      required: true, // Regex string to validate answer
    },
    hint: {
      type: String,
      default: "",
    },
    xp: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", ChallengeSchema);
