import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  storySnippet: { type: String, required: true },
});

const ModuleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    icon: { type: String, default: "🔖" },
    color: { type: String, default: "bg-[#8b0000]" },
    description: { type: String, required: true },
    units: [UnitSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Module", ModuleSchema);
