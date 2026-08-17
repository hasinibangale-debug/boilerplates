# React + Vite Boilerplate - Customization Guide

This document guides you through customizing the boilerplate for your specific project needs.

## Quick Start for New Projects

1. **Update project name**
   - Edit `package.json`: Change `"name"` to your project name
   - Edit `index.html`: Update `<title>` tag to your app name

2. **Update app branding**
   - Edit `src/components/Navbar.jsx`: Change "YourApp" to your app name
   - Update colors and styling to match your brand

3. **Configure API endpoint**
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` to your backend URL

4. **Update authentication endpoints**
   - Edit `src/context/AuthContext.jsx`
   - Update `/auth/login` and `/auth/me` endpoints to match your backend

5. **Install dependencies and start**
   ```bash
   npm install
   npm run dev
   ```

## Project Customization Steps

### 1. Update Routes (App.jsx)

Add your public and protected routes in `src/App.jsx`:

```jsx
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="page-name" element={<YourPage />} />
  </Route>
</Route>
```

### 2. Customize Dashboard Navigation (DashboardLayout.jsx)

Edit the `navItems` array in `src/layouts/DashboardLayout.jsx`:

```jsx
const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Users', path: '/dashboard/users', icon: Users },
  { label: 'Reports', path: '/dashboard/reports', icon: BarChart2 },
];
```

Import the required icons from `lucide-react`.

### 3. Customize Navbar (Navbar.jsx)

Update navigation links in `src/components/Navbar.jsx`:

```jsx
<Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
  Home
</Link>
<Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
  About
</Link>
```

### 4. Create New Pages

1. Create a new file in `src/pages/YourPage.jsx`
2. Import it in `src/App.jsx`
3. Add it as a route

Example page structure:
```jsx
import React from 'react';

export default function YourPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Your Page Title</h1>
      {/* Your content here */}
    </div>
  );
}
```

### 5. Create Reusable Components

1. Create a new file in `src/components/YourComponent.jsx`
2. Use existing UI components as reference

Example component:
```jsx
import React from 'react';

export default function YourComponent({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
```

### 6. Add API Endpoints

All API calls should use the `api` service from `src/services/api.js`:

```jsx
import api from '../services/api';

// In your component or hook
const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};
```

### 7. Use Authentication

Use the `useAuth` hook in any component within AuthProvider:

```jsx
import { useAuth } from '../hooks/useAuth';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome, {user.name}</div>
      ) : (
        <button onClick={() => login({ email, password })}>Login</button>
      )}
    </div>
  );
}
```

### 8. Update Utility Functions

Add your helper functions to `src/utils/helpers.js`:

```jsx
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### 9. Add Mock Data

Use `src/mock/data.js` for development mock data:

```jsx
export const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];
```

### 10. Style Customization

- **Global styles**: Edit `src/index.css`
- **App-level styles**: Edit `src/App.css`
- **Component styles**: Use Tailwind CSS classes inline

All CSS uses Tailwind CSS utility classes. No additional CSS files needed unless necessary.

## Environment Variables

Common environment variables to set up:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Add more as needed
VITE_APP_NAME=Your App Name
VITE_FEATURES_ENABLED=true
```

## Available Icons

The boilerplate uses Lucide React for icons. View available icons at:
https://lucide.dev/

Import and use in components:
```jsx
import { Home, Users, Settings, Plus } from 'lucide-react';

<Home className="w-6 h-6" />
```

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app component with routing |
| `src/main.jsx` | App entry point |
| `src/context/AuthContext.jsx` | Authentication context provider |
| `src/hooks/useAuth.js` | Hook to access auth context |
| `src/services/api.js` | Axios instance for API calls |
| `src/layouts/DashboardLayout.jsx` | Dashboard layout with sidebar |
| `src/layouts/MainLayout.jsx` | Main/public pages layout |
| `src/components/ProtectedRoute.jsx` | Route protection wrapper |
| `.env.example` | Environment variables template |
| `vite.config.js` | Vite configuration |
| `tailwind.config.js` | Tailwind CSS configuration |

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Build for production**: `npm run build`
3. **Run linter**: `npm run lint`
4. **Preview build**: `npm run preview`

## Troubleshooting

### Import errors for icons
- Make sure to import from `lucide-react`
- Check icon names at https://lucide.dev/

### Authentication not working
- Verify API endpoints in `AuthContext.jsx`
- Check `.env` file has correct `VITE_API_URL`
- Ensure backend returns `{ token, user }` structure

### Styling issues
- Verify Tailwind CSS is properly configured
- Check class names are spelled correctly
- Use Tailwind's official documentation for reference

### Routes not working
- Make sure components are imported in `App.jsx`
- Verify route paths don't have typos
- Check ProtectedRoute wrapping for protected routes

## Next Steps

1. Customize colors and branding in Tailwind config if needed
2. Add your custom components
3. Implement API endpoints
4. Build out your features

Happy coding! 🚀
