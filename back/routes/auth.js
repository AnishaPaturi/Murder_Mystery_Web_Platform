import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import History from "../models/History.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Helper to generate seed history entries for the last 30 days
async function seedUserHistory(userId) {
  const activities = [
    { type: "case_solved", description: "Solved: The HTML Missing Link Mystery", xp: 50 },
    { type: "evidence_found", description: "Discovered: Red Herring Inline CSS Styles", xp: 15 },
    { type: "suspect_interviewed", description: "Interrogated: Developer 'Scope' Jenkins", xp: 20 },
    { type: "badge_earned", description: "Earned Badge: First Case", xp: 100 },
    { type: "case_solved", description: "Solved: The CSS Cascade Conundrum", xp: 60 },
    { type: "evidence_found", description: "Discovered: Absolute Position Footprints", xp: 15 },
    { type: "suspect_interviewed", description: "Interrogated: Designer 'Flexbox' Flynn", xp: 20 },
    { type: "badge_earned", description: "Earned Badge: Code Breaker", xp: 100 },
    { type: "case_solved", description: "Solved: The JavaScript Closure Conspiracy", xp: 80 },
    { type: "evidence_found", description: "Discovered: Memory Leak Footprints", xp: 25 },
    { type: "suspect_interviewed", description: "Interrogated: Lead Dev 'Null' Pointer", xp: 20 },
    { type: "badge_earned", description: "Earned Badge: Evidence Collector", xp: 100 },
    { type: "notes_updated", description: "Added notes on JS Event Loop", xp: 10 },
  ];

  const now = new Date();
  const seedEntries = [];

  // Seed about 15 activities scattered over the last 30 days
  for (let i = 0; i < 15; i++) {
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(now.getDate() - daysAgo);
    
    // Add random hour/minute to spread out
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

    seedEntries.push({
      userId,
      type: activity.type,
      description: activity.description,
      xp: activity.xp,
      date,
    });
  }

  await History.insertMany(seedEntries);
}

// @route   POST api/auth/signup
// @desc    Register a new detective
// @access  Public
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check for existing user
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: "User already exists with that username or email" });
    }

    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Seed some initial detective activity history
    await seedUserHistory(user._id);

    // Create JWT Token
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "super_secret_detective_key_2026",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rank: user.rank,
        currentPhase: user.currentPhase,
        completedChallenges: user.completedChallenges,
        totalChallenges: user.totalChallenges,
        badges: user.badges,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// @route   POST api/auth/login
// @desc    Authenticate detective & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT Token
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "super_secret_detective_key_2026",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rank: user.rank,
        currentPhase: user.currentPhase,
        completedChallenges: user.completedChallenges,
        totalChallenges: user.totalChallenges,
        badges: user.badges,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// @route   GET api/auth/me
// @desc    Get user data
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching user details" });
  }
});

export default router;
