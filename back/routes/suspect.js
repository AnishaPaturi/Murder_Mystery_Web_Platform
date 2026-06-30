import express from "express";
import Suspect from "../models/Suspect.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route   GET api/suspects
// @desc    Get suspects with conditional reveals based on user phase progression
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const suspects = await Suspect.find().sort({ suspectId: 1 });

    const formattedSuspects = suspects.map((suspect) => {
      // Determine if this suspect alibi/evidence is unlocked yet
      // Phase 1 unlocks Sarah, Phase 2 unlocks Marcus, Phase 3 unlocks Elena, Phase 4 unlocks James
      const isUnlocked = user.completedChallenges >= suspect.unlockedAtPhase - 1;

      return {
        id: suspect.suspectId,
        suspectId: suspect.suspectId,
        name: suspect.name,
        role: suspect.role,
        threat: suspect.threat,
        emoji: suspect.emoji,
        background: suspect.background,
        unlockedAtPhase: suspect.unlockedAtPhase,
        isUnlocked,
        // Conditionally redact fields
        motive: isUnlocked ? suspect.motive : "[REDACTED - COMPLETE PREVIOUS PHASES TO REVEAL MOTIVE]",
        alibi: isUnlocked ? suspect.alibi : "[REDACTED - PROGRESS INVESTIGATION TO UNLOCK ALIBI STATEMENT]",
        evidence: isUnlocked ? suspect.evidence : "[REDACTED - EVIDENCE CLUES LOCKED]",
      };
    });

    res.json(formattedSuspects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching suspects" });
  }
});

export default router;
