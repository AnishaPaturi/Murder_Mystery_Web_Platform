import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.argv[2] || process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("❌ ERROR: OpenRouter API key not found.");
  console.log("Usage: node generateModules.js <YOUR_OPENROUTER_API_KEY>");
  process.exit(1);
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
        "completed": false,
        "storySnippet": "..."
      }
    ]
  }
]
`;

async function generate() {
  console.log("⏳ Contacting OpenRouter API...");
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free", // using a reliable free model
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed request to OpenRouter");
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

    // Format target file path
    const targetFilePath = path.join("..", "front", "src", "app", "learning", "modules.ts");

    const fileContent = `export interface Unit {
  id: number;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
  storySnippet: string;
}

export interface LearningModule {
  id: number;
  title: string;
  icon: string;
  color: string;
  description: string;
  units: Unit[];
}

export const learningModules: LearningModule[] = ${JSON.stringify(parsedData, null, 2)};
`;

    fs.writeFileSync(targetFilePath, fileContent, "utf8");
    console.log(`✅ SUCCESS: Generated learning modules saved to: ${targetFilePath}`);
  } catch (err) {
    console.error("❌ ERROR generating learning modules:", err.message);
    process.exit(1);
  }
}

generate();
