import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["case_solved", "evidence_found", "badge_earned", "suspect_interviewed", "notes_updated"],
    },
    description: {
      type: String,
      required: true,
    },
    xp: {
      type: Number,
      default: 10,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("History", HistorySchema);
