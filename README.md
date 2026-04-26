# Murder Mystery Web Platform

An interactive web application for solving murder mysteries. Explore crime scenes, examine evidence, interview suspects, and deduce the culprit.

## Features

- **Interactive Evidence Board**: Drag and drop evidence to connect clues
- **Suspect Profiles**: Detailed backgrounds and alibis for each suspect
- **Case Files**: Document and organize your investigation findings
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Hook Form
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Drag & Drop**: React DnD

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# or with npm
npm install

# or with yarn
yarn
```

### Development

```bash
# Start development server
pnpm dev

# or with npm
npm run dev

# or with yarn
yarn dev
```

The application will be available at http://localhost:5173

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main application component
│   └── components/
│       ├── EvidenceBoard.tsx   # Interactive evidence board
│       ├── SuspectProfiles.tsx # Suspect information display
│       ├── Features.tsx        # Key features showcase
│       ├── Hero.tsx            # Landing page hero section
│       └── ui/                 # Reusable UI components (shadcn/ui)
├── styles/                     # Global styles and theme
└── main.tsx                    # Application entry point
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

## Design Guidelines

See [guidelines/Guidelines.md](./guidelines/Guidelines.md) for UI/UX guidelines and design system references.

## License

This project is private and proprietary.