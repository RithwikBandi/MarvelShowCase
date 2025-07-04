# MarvelShowCase

A polished, high-performance web application crafted to visually explore the Marvel Cinematic Universe (MCU). From movies and TV shows to specials and iconic characters, the platform presents MCU content in a visually immersive, intuitive, and accessible format. The project leverages cutting-edge web development tools and best practices in design systems, state management, and performance optimization.

🔗 **Live Demo**: https://marvel-show-case.vercel.app/

## 🏆 Project Highlights

- 🎬 **Complete Marvel Universe Showcase** - Categorized by Phases, Media Type (Movies, Series, Specials), and Characters
- 🧑‍💻 **Auth Modal with Smooth UX** - Custom authentication modal built with React Context, transitions, and UI locking
- 🎨 **Thematic Design** - Fully responsive UI with animated transitions and dark/light theme support
- 📊 **Timeline Feature** - Interactive timeline mode for chronological MCU exploration
- 🚀 **3D Animated Page Transitions** - Framer Motion-powered transitions for navigation and modals
- 🧱 **Highly Modular Codebase** - Components and contexts built for scalability and reuse

Built with the support of modern AI-assisted development using Cursor and ChatGPT, emphasizing developer efficiency and attention to user experience.

## ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18 + TS** | Strongly typed components with reactive UI architecture |
| **Vite** | Ultra-fast dev server and production bundling |
| **Tailwind CSS** | Utility-first responsive design system |
| **ShadCN UI** | Accessible and composable UI primitives via Radix |
| **Framer Motion** | Advanced animations for layout and component transitions |
| **React Router** | SPA navigation with route-based code organization |
| **Context API** | Scoped global state management for auth and timeline toggles |

## 📁 Project Structure

```
MarvelShowCase/
├── public/                    # Static assets (images, favicon, icons, etc.)
├── src/
│   ├── components/            # Core, modal, and interactive UI elements
│   ├── components/ui/         # Primitive UI elements powered by ShadCN
│   ├── contexts/              # React Contexts for shared state
│   ├── data/                  # Static MCU metadata
│   ├── hooks/                 # Custom composable hooks
│   ├── pages/                 # Route-based page views
│   ├── lib/                   # Utility functions
│   ├── App.tsx                # Application layout and routing tree
│   └── main.tsx               # App bootstrap entry
├── tailwind.config.ts         # Theme tokens and Tailwind configuration
├── vite.config.ts             # Build configuration (Vite)
├── tsconfig.json              # TypeScript compiler settings
└── package.json               # Dependencies and scripts
```

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. Clone this repository:
```bash
git clone https://github.com/RithwikBandi/MarvelShowCase.git
cd MarvelShowCase
```

2. Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

## 🧩 Customization & Extensibility

- **Design Tokens**: Customize spacing, colors, typography in `tailwind.config.ts`
- **State Logic**: Add new global logic via the Context API under `src/contexts/`
- **Pages & Layout**: New sections can be built in `src/pages/` and linked through `App.tsx`
- **UI Primitives**: Extend atomic elements via `src/components/ui/`

## 📤 Building for Production

To build for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be in the `dist/` directory, ready to be deployed. This project is deployed via Vercel with CI/CD connected to GitHub.

## 👨‍💼 Author

**Rithwik Bandi**

Frontend Developer passionate about creating elegant interfaces, dynamic web experiences, and learning through modern tools. This project reflects my curiosity and ambition to explore the edge of developer productivity through AI-enhanced tools like **Cursor** and **ChatGPT**, while maintaining deep control and vision over the final product.

- GitHub: https://github.com/RithwikBandi
- Project Live: https://marvel-show-case.vercel.app/

## 📝 License

MIT License. This project is open-source and free to explore, learn from, and build upon.
