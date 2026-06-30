import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      default: "Junior Detective",
    },
    currentPhase: {
      type: String,
      default: "HTML & CSS",
    },
    completedChallenges: {
      type: Number,
      default: 0,
    },
    totalChallenges: {
      type: Number,
      default: 6, // We have 6 main challenges corresponding to the story phases
    },
    badges: {
      type: [String],
      default: [],
    },
    unlockedPhases: {
      type: [Number],
      default: [1], // Phase 1 is unlocked by default
    },
    mfaCode: {
      type: String,
      default: null,
    },
    mfaExpires: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
