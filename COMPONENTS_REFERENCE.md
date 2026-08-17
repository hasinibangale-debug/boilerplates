# Boilerplate Components & Hooks Reference

## UI Components

### Button
`src/components/Button.jsx`

Reusable button component for consistent styling and behavior.

### Card
`src/components/Card.jsx`

Card container for grouping content with shadow and padding.

### Input
`src/components/Input.jsx`

Text input component with built-in styling and error states.

### Modal
`src/components/Modal.jsx`

Modal dialog component for overlays and forms.

### Loader
`src/components/Loader.jsx`

Loading spinner component with optional label.

### ErrorMessage
`src/components/ErrorMessage.jsx`

Styled error message display component.

### EmptyState
`src/components/EmptyState.jsx`

Component to display when no data is available.

---

## Layout Components

### Navbar
`src/components/Navbar.jsx`

Responsive navigation bar with mobile menu.

**Props:**
- None (customize in component)

**Customization:**
- Edit brand name: Change "YourApp" text
- Add/edit navigation links: Modify Link components
- Update routing: Use React Router Link components

### ProtectedRoute
`src/components/ProtectedRoute.jsx`

Route wrapper that requires authentication.

**Usage:**
```jsx
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardLayout />} />
</Route>
```

### Sidebar
`src/components/Sidebar.jsx`

Sidebar navigation component (optional use).

### DashboardLayout
`src/layouts/DashboardLayout.jsx`

Full dashboard layout with collapsible sidebar.

**Features:**
- Responsive sidebar with toggle
- Active route highlighting
- Customizable navigation items

**Customization:**
```jsx
const navItems = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Users', path: '/dashboard/users', icon: Users },
];
```

### MainLayout
`src/layouts/MainLayout.jsx`

Simple layout for public pages.

---

## Hooks

### useAuth
`src/hooks/useAuth.js`

Access authentication state and methods.

**Returns:**
```jsx
{
  user,              // Object - Current user or null
  token,             // String - JWT token
  isAuthenticated,   // Boolean - Authentication status
  loading,           // Boolean - Loading state
  login,             // Function - Login function
  logout,            // Function - Logout function
}
```

**Usage:**
```jsx
const { user, isAuthenticated, login, logout } = useAuth();
```

**Requirements:**
- Component must be wrapped in AuthProvider
- Placed in main.jsx by default

---

## Context

### AuthContext
`src/context/AuthContext.jsx`

Manages authentication state across the app.

**Provider Setup:**
- Already configured in `main.jsx`
- Wraps entire app

**Configuration:**
Update API endpoints:
- `/auth/login` - Login endpoint
- `/auth/me` - Get current user endpoint

**Expected Response Structure:**
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

---

## Services

### API Service
`src/services/api.js`

Axios instance for HTTP requests.

**Base URL:** `VITE_API_URL` environment variable

**Usage:**
```jsx
import api from '../services/api';

// GET
const data = await api.get('/endpoint');

// POST
const data = await api.post('/endpoint', { data });

// PUT
const data = await api.put('/endpoint', { data });

// DELETE
await api.delete('/endpoint');
```

**Configuration:**
- Add interceptors for auth tokens
- Handle global error responses
- Customize headers as needed

---

## Utilities

### Helpers
`src/utils/helpers.js`

Add utility functions here for:
- Date formatting
- Validation
- Data transformation
- String manipulation

---

## Mock Data

### Mock Data
`src/mock/data.js`

Development mock data for testing without backend.

**Usage:**
```jsx
import { mockUsers } from '../mock/data';

// Use in component or hook
const [users, setUsers] = useState(mockUsers);
```

---

## Page Templates

### Pages Structure
`src/pages/`

Create pages matching this structure:

```jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function PageName() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Page Title</h1>
      {/* Content here */}
    </div>
  );
}
```

---

## Adding New Components

### Component Template
```jsx
import React from 'react';

/**
 * ComponentName
 * 
 * Description of what the component does.
 * 
 * Props:
 * - prop1: (type) - Description
 * - prop2: (type) - Description
 */
export default function ComponentName({ prop1, prop2 }) {
  return (
    <div className="...">
      {/* JSX content */}
    </div>
  );
}
```

---

## Styling Guide

### Tailwind CSS Classes

The boilerplate uses Tailwind CSS. Common utility classes:

**Spacing:**
- `p-4` - Padding
- `m-4` - Margin
- `gap-4` - Gap between flex items

**Text:**
- `text-lg` - Text size
- `font-bold` - Font weight
- `text-gray-600` - Text color

**Layout:**
- `flex` - Flexbox
- `grid` - Grid layout
- `absolute`, `fixed` - Positioning

**Colors:**
- `bg-blue-600` - Background
- `text-gray-800` - Text color
- `border-gray-200` - Border color

Reference: https://tailwindcss.com/docs

---

## File Organization Best Practices

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── layouts/       # Layout wrappers
├── context/       # Context providers
├── hooks/         # Custom hooks
├── services/      # API and external services
├── utils/         # Utility functions
├── mock/          # Mock data
├── assets/        # Images, fonts, etc.
└── App.jsx        # Main app
```

---

## Performance Tips

1. **Use React.memo for expensive components**
   ```jsx
   export default React.memo(MyComponent);
   ```

2. **Lazy load pages**
   ```jsx
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

3. **Optimize API calls with caching**
   - Implement custom hooks with caching
   - Use react-query or similar libraries

4. **Profile with React DevTools**
   - Install React DevTools extension
   - Check for unnecessary re-renders

---

## Common Tasks

### Add a new protected page
1. Create page component in `src/pages/`
2. Add route in `App.jsx` under ProtectedRoute
3. Add navigation in `DashboardLayout.jsx`

### Change authentication endpoint
1. Edit `src/context/AuthContext.jsx`
2. Update endpoint paths in `login` and `useEffect`

### Add global styles
1. Edit `src/index.css` for global styles
2. Use Tailwind classes for component styles

### Use environment variables
1. Add to `.env` file
2. Access with `import.meta.env.VITE_VARIABLE_NAME`

---

For more information, see `BOILERPLATE_GUIDE.md` and `README.md`.
