import express from "express";
import User from "../models/User.js";
import History from "../models/History.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route   GET api/user/history
// @desc    Get user activity log history
// @access  Private
router.get("/history", auth, async (req, res) => {
  try {
    const history = await History.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(50); // Get latest 50 activities
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching user history" });
  }
});

// @route   GET api/user/heatmap
// @desc    Get aggregated activity counts for the last 365 days (LeetCode heatmap format)
// @access  Private
router.get("/heatmap", auth, async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);

    // Find all histories for this user in the past 365 days
    const histories = await History.find({
      userId: req.user.id,
      date: { $gte: oneYearAgo }
    }).select("date");

    // Group count by YYYY-MM-DD
    const counts = {};
    histories.forEach(h => {
      const dateStr = new Date(h.date).toISOString().split("T")[0];
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    });

    // Convert to array format [{ date: "2026-06-29", count: 2 }]
    const heatmapData = Object.keys(counts).map(date => ({
      date,
      count: counts[date]
    }));

    res.json(heatmapData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching activity heatmap data" });
  }
});

// @route   POST api/user/activity
// @desc    Log a new detective activity/progress
// @access  Private
router.post("/activity", auth, async (req, res) => {
  const { type, description, xp } = req.body;

  if (!type || !description) {
    return res.status(400).json({ message: "Type and description are required" });
  }

  try {
    // Create new history entry
    const historyEntry = new History({
      userId: req.user.id,
      type,
      description,
      xp: xp || 10,
    });
    await historyEntry.save();

    // Update user stats
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If it's a case_solved, increment completedChallenges
    if (type === "case_solved") {
      user.completedChallenges = Math.min(user.completedChallenges + 1, user.totalChallenges);
      
      // Update rank based on completed challenges
      if (user.completedChallenges >= 25 && user.completedChallenges < 50) {
        user.rank = "Senior Detective";
        user.currentPhase = "JavaScript Logic";
      } else if (user.completedChallenges >= 50 && user.completedChallenges < 75) {
        user.rank = "Master Sleuth";
        user.currentPhase = "Node.js & MongoDB";
      } else if (user.completedChallenges >= 75) {
        user.rank = "Legendary Investigator";
        user.currentPhase = "Full Stack Integration";
      }
    }

    // If it's a badge_earned, add it to badges if not already present
    if (type === "badge_earned" && req.body.badgeName) {
      if (!user.badges.includes(req.body.badgeName)) {
        user.badges.push(req.body.badgeName);
      }
    }

    await user.save();

    res.status(201).json({
      message: "Activity logged successfully",
      history: historyEntry,
      user: {
        id: user._id,
        username: user.username,
        rank: user.rank,
        currentPhase: user.currentPhase,
        completedChallenges: user.completedChallenges,
        totalChallenges: user.totalChallenges,
        badges: user.badges,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error logging activity" });
  }
});

export default router;
