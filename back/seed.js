import mongoose from "mongoose";
import dotenv from "dotenv";
import Challenge from "./models/Challenge.js";
import Suspect from "./models/Suspect.js";
import Module from "./models/Module.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/murder_mystery";

const challenges = [
  {
    phaseId: 1,
    title: "Phase 1: HTML & CSS (Reconstructing the Scene)",
    tier: "HTML",
    description: "Learn HTML tag structure and Flex layout to rebuild Arthur's terminal.",
    instructions: `=== W3SCHOOLS TUTORIAL: HTML ELEMENT STRUCTURE ===
HTML (HyperText Markup Language) is the standard markup language for web pages.
An HTML element is defined by a start tag, some content, and an end tag:
  <tagname> Content goes here... </tagname>

Key Elements:
- <h1> to <h6>: Defines headings. <h1> is the largest, most important header.
- <div>: A structural block container. Used to group elements.
- <strong>: Semantic tag defining important text. Renders bold in browsers.

Example Structure:
  <h1>Main Title</h1>
  <div>
    <strong>Highlight Text</strong>
  </div>

=== FORENSIC ASSIGNMENT ===
Arthur's terminal layout got scrambled during the server crash. Rebuild the diagnostic report. Write the HTML elements so that they contain:
1. An <h1> heading containing the exact text 'ENVIRONMENTAL TEMPERATURE LOG'
2. A <div> block wrapping a <strong> tag that contains the exact text '98.6F'.`,
    codeTemplate: "<!-- Reconstruct Arthur's temperature log here -->\n<h1>ENVIRONMENTAL TEMPERATURE LOG</h1>\n<div>\n  <strong>98.6F</strong>\n</div>",
    expectedPattern: "<h1>ENVIRONMENTAL TEMPERATURE LOG</h1>.*<strong>98\\.6F</strong>",
    hint: "Place the <h1> header on one line, and the <strong> inside a <div>.",
    xp: 50,
  },
  {
    phaseId: 2,
    title: "Phase 2: JavaScript (Decrypting Communications)",
    tier: "JS",
    description: "Master string manipulation methods to decode cipher keys.",
    instructions: `=== W3SCHOOLS TUTORIAL: JS STRING MANIPULATION ===
JavaScript strings have helper methods that can be chained together to manipulate text.

1. split(separator): Splits a String object into an array of substrings based on a separator.
   Example: "LOG".split("") returns ["L", "O", "G"]
2. reverse(): Reverses an array in place.
   Example: ["L", "O", "G"].reverse() returns ["G", "O", "L"]
3. join(separator): Concatenates all of the elements in an array into a single string.
   Example: ["G", "O", "L"].join("") returns "GOL"

Chaining these methods allows you to easily reverse any input string:
  let reversed = str.split("").reverse().join("");

=== FORENSIC ASSIGNMENT ===
Arthur stored suspect chat logs inside an encrypted file using a simple string reversal cipher.
Complete the function to return the reversed string of the variable 'code' using split, reverse, and join methods.`,
    codeTemplate: "function decrypt(code) {\n  // Reverses the string 'code' and returns it\n  return code.split('').reverse().join('');\n}",
    expectedPattern: "return\\s+code\\.split\\((['\"])\\1\\)\\.reverse\\(\\)\\.join\\(\\2\\2\\)",
    hint: "Chain the split(''), reverse(), and join('') methods after the 'code' parameter.",
    xp: 75,
  },
  {
    phaseId: 3,
    title: "Phase 3: React.js (The Clue Board Dashboard)",
    tier: "REACT",
    description: "Understand React components, props, and JSX elements.",
    instructions: `=== W3SCHOOLS TUTORIAL: REACT FUNCTIONAL COMPONENTS & PROPS ===
React components are reusable code blocks that return HTML via JSX.
Functional components receive an object argument of data called "props" (properties) and render HTML dynamically.

Example of destructuring props:
  function UserCard({ user }) {
    return (
      <div className="card">
        <h2>{user.username}</h2>
        <p>Rank: {user.rank}</p>
      </div>
    );
  }

Inside JSX, JavaScript variables and expressions must be wrapped in curly braces {}.

=== FORENSIC ASSIGNMENT ===
Construct a React functional component named 'SuspectCard' that receives 'suspect' as a destructured prop and renders a division (className="suspect-card") containing:
1. An <h3> tag wrapping the suspect's name: {suspect.name}
2. A <p> tag wrapping the suspect's threat level: {suspect.threat}`,
    codeTemplate: "function SuspectCard({ suspect }) {\n  return (\n    <div className=\"suspect-card\">\n      <h3>{suspect.name}</h3>\n      <p>{suspect.threat}</p>\n    </div>\n  );\n}",
    expectedPattern: "<h3>\\{\\s*suspect\\.name\\s*\\}</h3>.*<p>\\{\\s*suspect\\.threat\\s*\\}</p>",
    hint: "Make sure suspect name and threat are wrapped in curly braces within h3 and p tags.",
    xp: 100,
  },
  {
    phaseId: 4,
    title: "Phase 4: Node.js & Express (Database API Access)",
    tier: "NODE",
    description: "Set up Express routers and JSON response methods.",
    instructions: `=== W3SCHOOLS TUTORIAL: EXPRESS ROUTE HANDLERS ===
Express is a minimal Node.js web application framework. Route handling defines how application endpoints (URIs) respond to client requests.

Syntax:
  app.get(path, (req, res) => { ... })

- req: Represents the HTTP request (query parameters, body, headers).
- res: Represents the HTTP response.
- res.json(object): Sends a JSON response with the correct headers.

Example Handler:
  app.get('/api/status', (req, res) => {
    res.json({ online: true });
  });

=== FORENSIC ASSIGNMENT ===
Write an Express GET route handler for '/api/logs' that responds by sending a JSON object containing the status 'success' and an empty array named 'logs'.`,
    codeTemplate: "app.get('/api/logs', (req, res) => {\n  res.json({ status: 'success', logs: [] });\n});",
    expectedPattern: "res\\.json\\(\\{\\s*status:\\s*(['\"])success\\1,\\s*logs:\\s*\\[\\s*\\]\\s*\\}\\)",
    hint: "Write res.json({ status: 'success', logs: [] }) inside the route arrow function.",
    xp: 120,
  },
  {
    phaseId: 5,
    title: "Phase 5: MongoDB (Exposing the Logs)",
    tier: "MONGODB",
    description: "Query MongoDB using Mongoose model find and sort operations.",
    instructions: `=== W3SCHOOLS TUTORIAL: MONGOOSE QUERY SELECTORS & SORTING ===
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
It provides query helpers to filter and order database collections.

Methods:
1. Model.find(filterObject): Finds documents matching specified criteria.
   Example: User.find({ status: 'Active' })
2. query.sort(sortObject): Sorts query result documents. Use 1 for ascending, -1 for descending.
   Example: User.find().sort({ age: -1 }) (Sorts by age descending)

Chaining:
  Log.find({ category: 'Auth' }).sort({ createdAt: -1 })

=== FORENSIC ASSIGNMENT ===
Query the 'Log' collection. Find all entries matching location 'Server Room' and sort them descending by 'timestamp' (-1).`,
    codeTemplate: "function getLogs() {\n  return Log.find({ location: 'Server Room' }).sort({ timestamp: -1 });\n}",
    expectedPattern: "location:\\s*(['\"])Server Room\\1.*sort\\(\\{\\s*timestamp:\\s*-1\\s*\\}\\)",
    hint: "Pass { location: 'Server Room' } into find(), and chain .sort({ timestamp: -1 }).",
    xp: 150,
  },
  {
    phaseId: 6,
    title: "Phase 6: Full Stack Integration (Revealing the Killer)",
    tier: "JS",
    description: "Verify signatures using strict equality checks.",
    instructions: `=== W3SCHOOLS TUTORIAL: STRICK EQUALITY (===) ===
In JavaScript, equality checks come in two forms:
- == (Loose Equality): Converts operands to the same type before comparing.
- === (Strict Equality): Returns true only if both value and type are identical. Always preferred for security.

Example:
  1 === "1" // returns false
  "key" === "key" // returns true

=== FORENSIC ASSIGNMENT ===
The final proof is verifying who bypassed environmental logs. Write a strict comparison expression checking if the variable 'keySignature' is equal to the string 'MARCUS_WEBB_OVERRIDE'.`,
    codeTemplate: "const isMarcus = (keySignature === 'MARCUS_WEBB_OVERRIDE');",
    expectedPattern: "keySignature\\s*===\\s*(['\"])MARCUS_WEBB_OVERRIDE\\1",
    hint: "Use keySignature === 'MARCUS_WEBB_OVERRIDE' to check strict equality.",
    xp: 200,
  }
];

const suspects = [
  {
    suspectId: 1,
    name: "SARAH CHEN",
    role: "Chief Technology Officer (CTO)",
    threat: "HIGH",
    motive: "Wished to consolidate absolute power over Arthur's system architectures.",
    emoji: "👩‍💼",
    alibi: "Board meeting from 8:00 PM to 10:00 PM. Verification code: BOARD_80",
    evidence: "Her physical ID badge swiped in the server room at 9:15 PM.",
    background: "Brilliant systems administrator with 15 years in cybersecurity. Arthur's immediate supervisor.",
    unlockedAtPhase: 1,
  },
  {
    suspectId: 2,
    name: "MARCUS WEBB",
    role: "Lead Systems Developer",
    threat: "MEDIUM",
    motive: "Arthur rejected promoting Marcus to Principal Architect.",
    emoji: "👨‍💻",
    alibi: "Claimed to be working at his desk, but colleagues report he left for 30 minutes at 9:00 PM.",
    evidence: "His private PGP key signature was found on the remote code injection payload.",
    background: "Talented senior dev with a history of overriding git merges without approval.",
    unlockedAtPhase: 2,
  },
  {
    suspectId: 3,
    name: "ELENA RODRIGUEZ",
    role: "Lead Security Analyst",
    threat: "HIGH",
    motive: "Upset about Arthur exposing security holes in her audit reports.",
    emoji: "👩‍🔬",
    alibi: "VPN logs report connection from home IP address.",
    evidence: "Her laptop IP initiated an override API query to the environmental controls at 9:20 PM.",
    background: "Ex-cybersecurity consultant. Setup the backup environmental APIs at ByteCorp.",
    unlockedAtPhase: 3,
  },
  {
    suspectId: 4,
    name: "JAMES PARKER",
    role: "Product Manager",
    threat: "LOW",
    motive: "Arthur vetoed budget allocations for James's pet projects.",
    emoji: "👨‍💼",
    alibi: "Dinner with clients until 11:00 PM.",
    evidence: "Sent numerous high-pressure emails demanding database override codes from Arthur.",
    background: "Aggressive product leader focused on high-visibility database features.",
    unlockedAtPhase: 4,
  }
];

const learningModules = [
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

async function seed() {
  try {
    console.log("Connecting to database at:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully. Cleaning collections...");

    await Challenge.deleteMany({});
    await Suspect.deleteMany({});
    await Module.deleteMany({});

    console.log("Seeding challenges with W3Schools style tutorials...");
    await Challenge.insertMany(challenges);

    console.log("Seeding suspects...");
    await Suspect.insertMany(suspects);

    console.log("Seeding learning modules...");
    await Module.insertMany(learningModules);

    console.log("Seeding database complete!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seed();
