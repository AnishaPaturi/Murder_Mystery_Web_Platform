import mongoose from "mongoose";

const SuspectSchema = new mongoose.Schema(
  {
    suspectId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    threat: {
      type: String,
      required: true,
      enum: ["LOW", "MEDIUM", "HIGH"],
    },
    motive: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      default: "👤",
    },
    alibi: {
      type: String,
      required: true,
    },
    evidence: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    unlockedAtPhase: {
      type: Number,
      default: 1, // Phase level required to unlock detail
    },
  },
  { timestamps: true }
);

export default mongoose.model("Suspect", SuspectSchema);
