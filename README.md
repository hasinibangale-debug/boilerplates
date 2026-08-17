# React + Vite Boilerplate

A production-ready boilerplate for React applications using Vite, Tailwind CSS, React Router, and context-based authentication.

## Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 19** - Latest React with concurrent features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔐 **Authentication** - Context-based auth with JWT support
- 🛣️ **Routing** - React Router v7 with protected routes
- 🔍 **Linting** - Oxlint for code quality
- 📱 **Responsive** - Mobile-first design approach

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── ErrorMessage.jsx
│   ├── Input.jsx
│   ├── Loader.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Sidebar.jsx
├── context/            # Context providers (Authentication, etc.)
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
│   └── useAuth.js
├── layouts/            # Layout components
│   ├── DashboardLayout.jsx
│   └── MainLayout.jsx
├── pages/              # Page components (Route endpoints)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── NotFound.jsx
│   └── RequestList.jsx
├── services/           # API and external service calls
│   └── api.js
├── utils/              # Utility functions and helpers
│   └── helpers.js
├── mock/               # Mock data for development
│   └── data.js
├── App.jsx             # Main App component with routing
├── main.jsx            # React entry point
├── App.css             # App-level styles
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone/copy this boilerplate
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables in `.env`

### Development

Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run Oxlint for code quality:
```bash
npm run lint
```

## Authentication Setup

The boilerplate includes context-based authentication with JWT support.

### Using Authentication

```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, login, logout, loading } = useAuth();
  
  return (
    // Your component
  );
}
```

### Protected Routes

Wrap your routes with `<ProtectedRoute />` to require authentication.

## API Integration

Configure your API endpoint in `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

All API calls use the `api` service from `src/services/api.js`.

## Customization Guide

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add a route in `App.jsx`

### Adding New Components

1. Create reusable components in `src/components/`
2. Import and use in your pages

### Adding API Endpoints

All API calls should use the `api` service for consistent configuration and error handling.

## Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `lucide-react` - Icon library
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React plugin for Vite
- `@tailwindcss/vite` - Tailwind CSS for Vite
- `oxlint` - Fast linter

## Environment Variables

See `.env.example` for all available configuration options.
