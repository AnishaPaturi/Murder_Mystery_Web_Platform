import express from "express";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
import History from "../models/History.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Helper to determine rank based on completed challenges count
const determineRank = (completedCount) => {
  if (completedCount >= 5) return "Legendary Investigator";
  if (completedCount >= 3) return "Master Sleuth";
  if (completedCount >= 1) return "Senior Detective";
  return "Junior Detective";
};

// Helper to determine phase name based on completed count
const determinePhase = (completedCount) => {
  if (completedCount >= 5) return "Full Stack Integration";
  if (completedCount >= 4) return "MongoDB Database";
  if (completedCount >= 3) return "Node.js & Express";
  if (completedCount >= 2) return "React Components";
  if (completedCount >= 1) return "JavaScript Logic";
  return "HTML & CSS";
};

// Helper to check and award milestone badges
const checkAndAwardBadges = (user, newSolvedPhaseId) => {
  const updatedBadges = [...user.badges];
  
  if (newSolvedPhaseId === 1 && !updatedBadges.includes("First Case")) {
    updatedBadges.push("First Case");
  }
  if (user.completedChallenges + 1 >= 3 && !updatedBadges.includes("Code Breaker")) {
    updatedBadges.push("Code Breaker");
  }
  if (user.completedChallenges + 1 >= 5 && !updatedBadges.includes("Evidence Collector")) {
    updatedBadges.push("Evidence Collector");
  }
  if (newSolvedPhaseId === 6 && !updatedBadges.includes("Master Detective")) {
    updatedBadges.push("Master Detective");
  }
  
  return updatedBadges;
};

// @route   GET api/challenges
// @desc    Get all challenges mapped with lock/unlock status based on user progress
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const challenges = await Challenge.find().sort({ phaseId: 1 });

    // Format challenges: redact expected validation codes if locked
    const formattedChallenges = challenges.map((challenge) => {
      const isUnlocked = user.unlockedPhases.includes(challenge.phaseId);
      
      return {
        id: challenge.phaseId,
        phaseId: challenge.phaseId,
        title: challenge.title,
        tier: challenge.tier,
        description: challenge.description,
        instructions: challenge.instructions,
        codeTemplate: challenge.codeTemplate,
        hint: challenge.hint,
        xp: challenge.xp,
        isUnlocked,
        // Hide expected pattern for security/cheating prevention
        expectedPattern: isUnlocked ? challenge.expectedPattern : "[REDACTED]",
      };
    });

    res.json(formattedChallenges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching challenges" });
  }
});

// @route   POST api/challenges/:phaseId/submit
// @desc    Submit challenge solution code
// @access  Private
router.post("/:phaseId/submit", auth, async (req, res) => {
  const { code } = req.body;
  const phaseId = parseInt(req.params.phaseId);

  if (!code) {
    return res.status(400).json({ message: "No solution code submitted" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if phase is unlocked
    if (!user.unlockedPhases.includes(phaseId)) {
      return res.status(403).json({ message: "This phase is locked. Solve preceding challenges first." });
    }

    const challenge = await Challenge.findOne({ phaseId });
    if (!challenge) {
      return res.status(404).json({ message: "Challenge phase not found" });
    }

    // Validate using regex pattern matching
    const regex = new RegExp(challenge.expectedPattern, "i");
    const isCorrect = regex.test(code.replace(/\s+/g, " ")); // normalize whitespaces for regex robust checks

    if (!isCorrect) {
      return res.status(400).json({ 
        success: false, 
        message: "Code verification failed. The output pattern does not match Arthur's expected diagnostics." 
      });
    }

    // Solution is correct! Award XP & update user stats
    let solvedCountIncrement = 0;
    const isAlreadySolved = user.completedChallenges >= phaseId; // simple check if solved in sequence
    
    // Unlock next phase if applicable (we have 6 phases total)
    const nextPhaseId = phaseId + 1;
    if (nextPhaseId <= 6 && !user.unlockedPhases.includes(nextPhaseId)) {
      user.unlockedPhases.push(nextPhaseId);
    }

    // Award badges if applicable
    user.badges = checkAndAwardBadges(user, phaseId);

    // If solving for the first time, increment solve count
    const previouslyCompleted = user.completedChallenges;
    if (phaseId > previouslyCompleted) {
      user.completedChallenges = phaseId;
      user.rank = determineRank(phaseId);
      user.currentPhase = determinePhase(phaseId);
    }

    await user.save();

    // Create a new activity history log
    const historyEntry = new History({
      userId: user._id,
      type: "case_solved",
      description: `Solved Case Challenge: ${challenge.title}`,
      xp: challenge.xp,
    });
    await historyEntry.save();

    // If a new badge was awarded on this turn, log it too!
    if (user.badges.length > (user.badges.includes("First Case") && previouslyCompleted === 0 ? 0 : 0)) {
      // Find what badge was newly added
      // Or simply log a milestone log
    }

    res.json({
      success: true,
      message: "Security code decrypted! Challenge solved.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rank: user.rank,
        currentPhase: user.currentPhase,
        completedChallenges: user.completedChallenges,
        totalChallenges: user.totalChallenges,
        badges: user.badges,
        unlockedPhases: user.unlockedPhases,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during challenge validation" });
  }
});

export default router;
