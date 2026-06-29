export interface Unit {
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

export const learningModules: LearningModule[] = [
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
        completed: true,
        storySnippet: "Upon entering the office of Chief Architect Arthur Pendelton, you find his workstation locked and the screen displaying a corrupted file. You must wrap the raw text in semantic HTML elements to reveal the autopsy report and time of death."
      },
      {
        id: 2,
        title: "The Office Layout",
        duration: "1 hour",
        description: "Use CSS Flexbox and Grid to map out the office desks and suspect paths.",
        completed: false,
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
        completed: false,
        storySnippet: "A USB drive found under Arthur's desk contains an encrypted chat log. The decryption key is locked behind a simple substitution cipher. Write a JavaScript function that takes the key string, reverses it, and returns the passcode."
      },
      {
        id: 2,
        title: "Bypassing the Security Loop",
        duration: "2 hours",
        description: "Apply loops and conditional statements to find a specific badge ID in security logs.",
        completed: false,
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
        completed: false,
        storySnippet: "To solve this case, you need to monitor the profiles, motives, and threat levels of all 4 suspects. Refactor your static HTML list into reusable React `SuspectCard` components, passing profiles as props."
      },
      {
        id: 2,
        title: "Connecting Clues with State",
        duration: "3 hours",
        description: "Manage dashboard state to link items on the virtual evidence board.",
        completed: false,
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
        title: "Creating the Case File API",
        duration: "2 hours",
        description: "Set up an Express server and define GET/POST routes for case files.",
        completed: false,
        storySnippet: "You need a secure place to store and retrieve your notes. Spin up a local Node/Express server and configure an API route at `/api/cases` to receive notes from your React dashboard and return them as JSON."
      },
      {
        id: 2,
        title: "The Auth Middleware Barrier",
        duration: "2.5 hours",
        description: "Learn Node middleware by protecting routes with a verification layer.",
        completed: false,
        storySnippet: "Someone is trying to wipe the evidence remotely! Secure your API endpoint by writing a custom Express middleware that checks the incoming headers for a classified token. Only authorized agents can access the case records."
      }
    ]
  },
  {
    id: 5,
    title: "Phase 5: MongoDB (Querying Hidden Databases)",
    icon: "💾",
    color: "bg-red-500",
    description: "Connect your backend to MongoDB to permanently store suspect information and evidence logs.",
    units: [
      {
        id: 1,
        title: "Seeding Suspect Records",
        duration: "1.5 hours",
        description: "Create Mongoose schemas for suspects and insert initial data.",
        completed: false,
        storySnippet: "It's time to digitize your files. Define a Mongoose schema for the suspects, establishing data types for Name, Role, Threat Level, and Alibi. Seed these records into your local MongoDB cluster."
      },
      {
        id: 2,
        title: "Analyzing the Timeline Query",
        duration: "2 hours",
        description: "Write complex database queries to construct the timeline of the murder night.",
        completed: false,
        storySnippet: "To convict the killer, you must prove they were in the server room when the server crashed. Write a MongoDB query that finds all logs in the database where `location === 'Server Room'` and sorts them chronologically."
      }
    ]
  }
];
