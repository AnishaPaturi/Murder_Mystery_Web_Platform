import express from "express";
import Module from "../models/Module.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const defaultModules = [
  {
    id: 1,
    title: "Phase 1: HTML & CSS (Reconstructing the Scene)",
    icon: "🔖",
    color: "bg-[#8b0000]",
    description: "Rebuild corrupted files from the victim's terminal and arrange the physical evidence layout.",
    units: [
      {
        id: 1,
        title: "The Corrupted Crime Scene Report",
        duration: "45 mins",
        description: "Learn basic HTML tags to format and display the victim's hidden autopsy file.",
        storySnippet: "Upon entering the office of Chief Architect Arthur Pendelton, you find his workstation locked and the screen displaying a corrupted file. You must wrap the raw text in semantic HTML elements to reveal the autopsy report and time of death."
      },
      {
        id: 2,
        title: "The Office Layout",
        duration: "1 hour",
        description: "Use CSS Flexbox and Grid to map out the office desks and suspect paths.",
        storySnippet: "Witnesses state there was an argument in the common area, but their descriptions of the office desks conflict. Reconstruct the office floor plan using Flexbox and Grid to verify who had a direct line of sight to the server room door."
      }
    ]
  },
  {
    id: 2,
    title: "Phase 2: JavaScript (Decrypting Communications)",
    icon: "🔐",
    color: "bg-[#a01515]",
    description: "Write code to bypass passwords and decrypt communications between key suspects.",
    units: [
      {
        id: 1,
        title: "The Encryption Cipher",
        duration: "1.5 hours",
        description: "Use JS variables, string manipulation, and operators to crack a basic password script.",
        storySnippet: "A USB drive found under Arthur's desk contains an encrypted chat log. The decryption key is locked behind a simple substitution cipher. Write a JavaScript function that takes the key string, reverses it, and returns the passcode."
      },
      {
        id: 2,
        title: "Bypassing the Security Loop",
        duration: "2 hours",
        description: "Apply loops and conditional statements to find a specific badge ID in security logs.",
        storySnippet: "The server room logs contain thousands of entry events. Writing a manual search would take hours. Write a JavaScript `for` loop combined with an `if` statement to scan the log array for any activity matching Sarah Chen's card between 9:00 PM and 10:00 PM."
      }
    ]
  },
  {
    id: 3,
    title: "Phase 3: React.js (The Detective Dashboard)",
    icon: "🗂️",
    color: "bg-[#b91c1c]",
    description: "Create an interactive dashboard that lets you filter suspects and track clues in real time.",
    units: [
      {
        id: 1,
        title: "Suspect Profile Components",
        duration: "2.5 hours",
        description: "Build reusable React components to display suspect cards dynamically.",
        storySnippet: "To solve this case, you need to monitor the profiles, motives, and threat levels of all 4 suspects. Refactor your static HTML list into reusable React `SuspectCard` components, passing profiles as props."
      },
      {
        id: 2,
        title: "Connecting Clues with State",
        duration: "3 hours",
        description: "Manage dashboard state to link items on the virtual evidence board.",
        storySnippet: "Your evidence board is a mess. By using React's `useState` and handler functions, implement a feature that lets you select an evidence item and 'connect' it to a suspect's profile, rendering red string lines dynamically."
      }
    ]
  },
  {
    id: 4,
    title: "Phase 4: Node.js & Express (Accessing Secure Databases)",
    icon: "🖥️",
    color: "bg-[#e81b1b]",
    description: "Build a backend API that processes secure requests and communicates with local servers.",
    units: [
      {
        id: 1,
        title: "Building Express API Routes",
        duration: "3 hours",
        description: "Create routes and handle JSON payload bodies inside Express APIs.",
        storySnippet: "To retrieve the lock logs from Arthur's main security console, you need to set up a secure JSON REST API. Create a custom POST route that returns card access verification logs."
      }
    ]
  },
  {
    id: 5,
    title: "Phase 5: MongoDB (Exposing the Logs)",
    icon: "💾",
    color: "bg-[#ef4444]",
    description: "Store activity logs in MongoDB and perform queries to filter suspicious entry keys.",
    units: [
      {
        id: 1,
        title: "Mongoose Query Methods",
        duration: "3.5 hours",
        description: "Filter Mongoose databases using query operators and sort order.",
        storySnippet: "The backend server contains the raw database collection of swiped badges. Write a query to find all card credentials matching Arthur's cabinet override logs."
      }
    ]
  },
  {
    id: 6,
    title: "Phase 6: Full Stack Integration (Revealing the Killer)",
    icon: "⚡",
    color: "bg-red-500",
    description: "Connect the frontend workspace to backend services to decrypt the final override key.",
    units: [
      {
        id: 1,
        title: "Exposing the Mainframe override key",
        duration: "4 hours",
        description: "Integrate React fetch clients and secure cookies to execute the decryption.",
        storySnippet: "All evidence points to a manual bypass. Write a Javascript comparison statement checking if the override key signature matches Marcus Webb."
      }
    ]
  }
];

// @route   GET api/learning
// @desc    Get all learning modules. Falls back to default seed if DB is empty.
// @access  Public
router.get("/", async (req, res) => {
  try {
    let modules = await Module.find().sort({ id: 1 });
    if (modules.length === 0) {
      console.log("Learning modules DB empty. Seeding defaults...");
      await Module.insertMany(defaultModules);
      modules = await Module.find().sort({ id: 1 });
    }
    res.json(modules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching learning modules" });
  }
});

// @route   POST api/learning/generate
// @desc    Regenerate learning modules using OpenRouter LLM API (key kept safely in .env)
// @access  Private (auth)
router.post("/generate", auth, async (req, res) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(400).json({
      message: "OpenRouter API Key is missing. Please add OPENROUTER_API_KEY to your back/.env file.",
    });
  }

  const prompt = `
Generate a list of 6 learning modules for 'The Bytes of Wrath' murder mystery coding platform.
The modules must cover these 6 phases:
Phase 1: HTML & CSS (Reconstructing the Scene)
Phase 2: JavaScript (Decrypting Communications)
Phase 3: React.js (The Clue Board Dashboard)
Phase 4: Node.js & Express (Database API Access)
Phase 5: MongoDB (Exposing the Logs)
Phase 6: Full Stack Integration (Revealing the Killer)

Make sure the descriptions, titles, and storySnippets are highly thematic, matching a noir murder mystery where coding concepts are used to investigate a crime.

Return ONLY a raw valid JSON array matching this format (no markdown blocks, no prefix, no backticks, no wrap):
[
  {
    "id": 1,
    "title": "Phase 1: HTML & CSS (Reconstructing the Scene)",
    "icon": "🔖",
    "color": "bg-[#8b0000]",
    "description": "...",
    "units": [
      {
        "id": 1,
        "title": "...",
        "duration": "45 mins",
        "description": "...",
        "storySnippet": "..."
      }
    ]
  }
]
`;

  try {
    console.log("⏳ Querying OpenRouter from backend endpoint...");
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        message: data.error?.message || "Failed request to OpenRouter API",
      });
    }

    let jsonText = data.choices[0].message.content.trim();
    
    // Clean up any potential markdown wrap
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.substring(7);
    }
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.substring(3);
    }
    if (jsonText.endsWith("```")) {
      jsonText = jsonText.substring(0, jsonText.length - 3);
    }
    jsonText = jsonText.trim();

    // Verify it is valid JSON
    const parsedData = JSON.parse(jsonText);

    // Save to database
    await Module.deleteMany({});
    const savedModules = await Module.insertMany(parsedData);

    res.json({
      success: true,
      message: "Learning modules successfully regenerated and saved to database!",
      modules: savedModules,
    });

  } catch (err) {
    console.error("MFA / OpenRouter generation error:", err);
    res.status(500).json({
      message: "Failed to generate learning modules: " + err.message,
    });
  }
});

export default router;
