# Murder Mystery Web Platform (MERN Stack)

An interactive web application designed to teach the complete MERN stack (MongoDB, Express, React, Node.js) through an immersive murder mystery investigation: **"The Bytes of Wrath"**. Detectives learn web development by reconstructing corrupted crime scene logs, decrypting communications, building evidence trackers, and writing database queries to unmask the killer.

---

## 📂 Project Structure

The project has been refactored into a full-stack architecture:

- **[`/front`](file:///C:/Users/anish/OneDrive/College/Projects/Murder_Mystery_Web_Platform/front)**: Frontend React client built with Vite, React Router, Motion (animations), and Tailwind CSS.
- **[`/back`](file:///C:/Users/anish/OneDrive/College/Projects/Murder_Mystery_Web_Platform/back)**: Backend Express API built with Node.js, JWT Authentication, and Mongoose (MongoDB).

---

## 🕵️‍♂️ The Story: "The Bytes of Wrath"

Arthur Pendelton, Chief Systems Architect at ByteCorp, is found dead inside the mainframe server room, locked inside while a remote script initiated a CPU thermal overload.

To solve the crime, you must enrole in detective training and master each development tier:
1. **HTML & CSS**: Format the victim's corrupted autopsy report and map the physical office desk layouts.
2. **JavaScript**: Code string decrypters for suspect chat logs and search arrays for card swipes.
3. **React.js**: Construct the reactive clue board dashboard.
4. **Node & Express**: Set up backend Express routes and custom token-based API authentication middleware.
5. **MongoDB**: Define schemas and build complex queries to match server crash timestamps.

---

## ⚙️ Features

- **Case Dossier (`/story`)**: Classifed files cabinet detailing Arthur Pendelton's victim card, alibi lists, threat levels, and detective training syllabus.
- **Interactive Evidence Board (`/evidence`)**: Unlock phases and solve challenges (saves status and XP metrics to the database).
- **Suspect Profiles (`/suspects`)**: Interrogate prime suspects to record forensic timelines.
- **LeetCode-Style Heatmap (`/profile`)**: Dynamic SVG activity matrix displaying detective actions over the past 365 days with interactive hover tooltips.
- **Detective Logs (`/profile`)**: Chronological audit feed displaying action types (🔍 solves, 🏆 badges, 🗣️ interviews), description, and XP bonuses.
- **Enlistment Hub (`/login`, `/signup`)**: Secure user token auth, hashing credentials using bcrypt.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher.
- **MongoDB**: Running locally at `mongodb://127.0.0.1:27017/murder_mystery` (or custom Atlas URI configured in `.env`).

### Quick Start

1. **Install all dependencies** (for root, frontend, and backend packages):
   ```bash
   npm run install:all
   ```

2. **Run both development servers concurrently**:
   ```bash
   npm run dev
   ```

* The **Frontend** will be running at: `http://localhost:5173`
* The **Backend API** will be running at: `http://localhost:5000`

---

## 🔒 Configuration

Environment settings are configured inside **[`back/.env`](file:///C:/Users/anish/OneDrive/College/Projects/Murder_Mystery_Web_Platform/back/.env)**:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/murder_mystery
JWT_SECRET=super_secret_detective_key_2026
```

---

## 🎨 UI/UX Guidelines
See **[`guidelines/Guidelines.md`](file:///C:/Users/anish/OneDrive/College/Projects/Murder_Mystery_Web_Platform/guidelines/Guidelines.md)** for colors, typographies, typography-serif details, and theme variables used across the platform.