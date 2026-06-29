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
      default: 5,
    },
    totalChallenges: {
      type: Number,
      default: 95,
    },
    badges: {
      type: [String],
      default: ["First Case", "Code Breaker", "Evidence Collector"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
