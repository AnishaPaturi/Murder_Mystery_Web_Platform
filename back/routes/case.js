import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const rawClues = [
  {
    phaseId: 1,
    title: "Clue #1: Scrambled System Logs",
    text: "Arthur's terminal layout was scrambled to hide a temperature spike. The cooling fan logs show that the cooling system was shut down at 9:10 PM, right before the server cabinet locked.",
  },
  {
    phaseId: 2,
    title: "Clue #2: Substitution Cipher Messages",
    text: "Decrypted chat logs between Sarah and Marcus reveal Marcus complaining about Arthur vetoing his code override access. Marcus wrote: 'Arthur thinks he can lock me out. I'll make sure he gets locked in instead.'",
  },
  {
    phaseId: 3,
    title: "Clue #3: Commits Bypass Route",
    text: "Elena's security audit details reveal that a secondary, secret bypass route was built into the environmental controls API. The only people with the repository access to commit that bypass were Elena and Marcus.",
  },
  {
    phaseId: 4,
    title: "Clue #4: IP Source Mismatch",
    text: "Express server access logs show that the GET request for card override details was queried from an internal desk IP address. The IP matches Marcus Webb's personal office desktop.",
  },
  {
    phaseId: 5,
    title: "Clue #5: Mainframe Override Signature",
    text: "Mongoose database log queries verify that a card override command with signature 'MARCUS_WEBB_OVERRIDE' was executed at 9:15 PM, matching the exact time Arthur was trapped in the cabinet.",
  },
  {
    phaseId: 6,
    title: "Clue #6: CASE SOLVED - The PGP Key",
    text: "Final validation: Marcus's PGP key was used to sign the override script. He locked Arthur in the mainframe cabinet and shut down the airflow to delete database files without Arthur's interference. CASE SOLVED!",
  }
];

// @route   GET api/case
// @desc    Get static-ish case briefing data (autopsy details, victim card, locations)
// @access  Private
router.get("/", auth, async (req, res) => {
  res.json({
    caseId: "#2026-042",
    title: "The Bytes of Wrath",
    location: "ByteCorp Mainframe Server Cabinet",
    victim: {
      name: "Arthur Pendelton",
      role: "Chief Systems Architect, ByteCorp",
      time: "June 28, 2026 | ~9:15 PM",
      cause: "Asphyxiation (Ventilation Lock-down)"
    },
    summary: "Arthur was found deceased inside the secure server mainframe cabinet. Environmental control logs were compromised, locking him in while a remote script initiated a full CPU thermal fire, consuming the oxygen.",
    additionalClues: [
      "Vandalized desk layouts blocking lines of sight.",
      "A physical override bypass key was checked out from the developer locker room."
    ]
  });
});

// @route   GET api/case/clues
// @desc    Get investigation clues with conditional reveals
// @access  Private
router.get("/clues", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedClues = rawClues.map((clue) => {
      const isUnlocked = user.completedChallenges >= clue.phaseId;
      return {
        phaseId: clue.phaseId,
        title: clue.title,
        isUnlocked,
        text: isUnlocked ? clue.text : `[REDACTED - RESOLVE CHALLENGE PHASE ${clue.phaseId} TO UNLOCK CLUE]`,
      };
    });

    res.json(formattedClues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching clues" });
  }
});

export default router;
