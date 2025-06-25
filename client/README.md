# CyberGuardians

CyberGuardians is an educational, scenario-based game built with React, TypeScript, and Vite. Players select a character, progress through cybersecurity-themed levels, and earn badges by making smart decisions in interactive scenarios.

## Features

- **Character Selection:** Choose your cyber guardian persona.
- **Level Progression:** Unlock and complete levels, each with unique scenarios.
- **Scenario Gameplay:** Make choices in realistic cybersecurity situations.
- **Badges & Achievements:** Earn badges for milestones and high scores.
- **Persistent Progress:** Your progress is saved in your browser for 7 days, even if you close or refresh the page.
- **Modern UI:** Built with Tailwind CSS, Framer Motion, and Lucide icons.

## Project Structure

```
client/
  ├── public/                # Static assets
  ├── src/
  │   ├── assets/            # Images and SVGs
  │   ├── components/        # React components (UI, game logic, popups, etc.)
  │   ├── data/              # Game data (levels, scenarios)
  │   ├── types/             # TypeScript type definitions
  │   ├── utils/             # Game logic utilities
  │   ├── App.tsx            # Main app component
  │   └── main.tsx           # Entry point
  ├── index.html
  ├── package.json
  └── vite.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ankur0xDev/CyberGuardians.git
   cd CyberGuardians/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## Customization

- **Add/Edit Levels:** Modify `src/data/gameData.ts` and `src/data/scenarios.ts`.
- **Add Characters or Badges:** Update the relevant data files and components.
- **Game Logic:** See `src/utils/gameLogic.ts`.

## License

[MIT](LICENSE) (or specify your license)
