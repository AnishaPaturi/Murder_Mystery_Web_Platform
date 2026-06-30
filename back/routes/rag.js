import express from "express";
import { ragService } from "../services/rag.js";
import { synthesizeTutorial } from "../services/llm.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// @route   GET api/rag
// @desc    Retrieve documentation chunks & synthesize a custom tutor tutorial (RAG)
// @access  Private (requires authentication to protect OpenRouter endpoint calls)
router.get("/", auth, async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Please specify a query topic parameter." });
  }

  try {
    // 1. Retrieve the top 3 relevant chunks from the documentation database
    const chunks = ragService.retrieve(query, 3);

    // 2. Synthesize a unified tutorial using the LLM grounded in the documentation
    const synthesis = await synthesizeTutorial(query, chunks);

    res.json({
      query,
      synthesized: synthesis.summary,
      chunks: chunks.map(c => ({
        title: c.title,
        content: c.content,
        source: c.source,
      })),
    });
  } catch (err) {
    console.error("RAG pipeline error:", err);
    res.status(500).json({ message: "Server error in RAG pipeline: " + err.message });
  }
});

export default router;
