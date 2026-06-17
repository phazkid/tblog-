# FabsExchange Mobile App - Architecture Guide

## 🏗️ System Overview

This Expo app follows a clean, scalable architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                    App Entry (_layout.tsx)           │
│                  AuthProvider Wrapper                │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
    ┌───▼────┐               ┌──────▼──────┐
    │ Onboard│               │  Dashboard  │
    │ (index)│               │  (signed in)│
    └────────┘               └─────────────┘
        │
        ├─ HookScreen (animated intro)
        ├─ HowItWorksScreen (carousel)
        └─ AuthScreen (login/register)
```

## 📁 Directory Structure

### `/app` - Pages & Routes (Expo Router)
```
app/
├── _layout.tsx      # Root layout, AuthProvider setup
├── index.tsx        # Onboarding flow dispatcher
├── auth.tsx         # Auth screen wrapper
└── dashboard.tsx    # Post-auth home screen
```

**Purpose**: File-based routing with Expo Router. Each file becomes a route.

### `/screens` - Screen Components
```
screens/
├── HookScreen.tsx       # First impression - animated brand screen
├── HowItWorksScreen.tsx # Feature carousel with swipe navigation
└── AuthScreen.tsx       # Tabbed login/register form
```

**Purpose**: Self-contained screen logic separate from routing layer.

### `/components` - Reusable UI Components
```
components/
├── Button.tsx       # Primary, secondary, outline variants
└── TextInput.tsx    # With validation, error states, password toggle
```

**Purpose**: Shared UI elements used across multiple screens. Easy to style consistently.

### `/context` - State Management
```
context/
└── AuthContext.tsx  # Auth state, login/register/logout functions
```

**Purpose**: Global state using React Context API. Accessed anywhere with `useAuth()`.

### `/lib` - Core Logic
```
lib/
├── auth.ts          # Authentication business logic
└── utils.ts         # Helper functions (validation, formatting)
```

**Purpose**: Pure logic layer separated from UI. Easy to test and reuse.

### `/assets` - Static Resources
```
assets/
├── icon.png         # App icon (1024x1024)
├── splash.png       # Splash screen (1080x1920)
└── fonts/           # Custom fonts (if used)
```

## 🔄 Data Flow

### Authentication Flow
```
┌─────────────────────────────────────────┐
│     User fills LoginForm in AuthScreen   │
└──────────────────┬──────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │  call login() from useAuth()  │
    └──────────────────┬───────────┘
                       │
                       ▼
        ┌──────────────────────────┐
        │ AuthContext.login()       │
        │ calls auth.loginUser()    │
        └──────────────┬────────────┘
                       │
        ┌──────────────┴───────────┐
        │                          │
        ▼                          ▼
    ┌────────────────┐    ┌──────────────┐
    │  Hash compare  │    │ AsyncStorage │
    │  with bcrypt   │    │  save token  │
    └────────┬───────┘    └──────┬───────┘
             │                   │
             └────────┬──────────┘
                      │
                      ▼
            ┌──────────────────┐
            │ Update auth state│
            │ Set user object  │
            └────────┬─────────┘
                     │
                     ▼
            ┌──────────────────┐
            │ AuthContext      │
            │ value updated    │
            └────────┬─────────┘
                     │
                     ▼
        ┌─────────────────────────────┐
        │ All useAuth() hooks re-render│
        │ Navigate to dashboard       │
        └─────────────────────────────┘
```

### State Management
```
AuthProvider (context/AuthContext.tsx)
│
├─ user: User object (null if logged out)
├─ isSignedIn: boolean
├─ isLoading: boolean
│
└─ Methods:
   ├─ login(email, password)
   ├─ register(email, password, fullName)
   └─ logout()

Accessed via: const { user, login, logout } = useAuth()
```

## 🎯 Component Patterns

### Screen Pattern
```tsx
export function MyScreen({ navigation }: MyScreenProps) {
  const [state, setState] = useState(initialState);
  const { user } = useAuth();

  return (
    <SafeAreaView>
      <Animated.View entering={FadeIn}>
        {/* Content */}
      </Animated.View>
    </SafeAreaView>
  );
}
```

### Reusable Component Pattern
```tsx
interface MyComponentProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

export function MyComponent({ label, value, onChangeText, error }: MyComponentProps) {
  return (
    <View>
      {/* Component JSX */}
    </View>
  );
}
```

## 🔐 Security Architecture

### Authentication Layer (`lib/auth.ts`)
```
User Input
    │
    ├─► Validation
    │   └─► Email format, password length, etc.
    │
    ├─► Hashing
    │   └─► bcrypt.hash() for storage
    │
    ├─► Storage
    │   └─► AsyncStorage (local device only)
    │
    └─► Retrieval
        └─► bcrypt.compare() for login
```

### Important Security Notes
- ✅ Passwords are hashed with bcrypt (10 rounds)
- ✅ No plain text passwords stored
- ✅ Session stored in AsyncStorage (device-level encryption)
- ✅ Form validation prevents invalid input
- ⚠️ Currently client-only - add JWT with backend for production

## 🎨 Styling Architecture

### Design System (`tailwind.config.js`)
```
Colors
├─ Primary: #8B5CF6 (Purple)
├─ Accent: #FBBF24 (Amber)
├─ Background: #0f0f0f (Dark)
└─ Neutrals: Gray variations

Typography
├─ Sans: GeistSans
└─ Mono: GeistMono

Spacing: Tailwind's 4px-based scale
Animations: React Native Reanimated 60fps
```

### Component Styling
```tsx
// Uses NativeWind (Tailwind for React Native)
<View className="flex-1 px-4 py-6 bg-background rounded-xl">
  <Text className="text-2xl font-bold text-foreground">Title</Text>
</View>
```

## 📱 Navigation Architecture

### Expo Router Routes
```
/ (index)          ← Onboarding flow
├─ hook screen
├─ how it works
└─ auth screen
    ├─ login tab
    └─ register tab

/auth              ← Auth form (alternate entry)

/dashboard         ← Post-login home (Protected)
```

### Route Protection
```tsx
// In app/index.tsx
useEffect(() => {
  if (!isLoading && isSignedIn) {
    router.replace("/dashboard"); // Protected route
  }
}, [isSignedIn, isLoading]);
```

## 🔄 Lifecycle & Initialization

```
1. App Starts
   │
   ├─► _layout.tsx loads
   ├─► AuthProvider wraps app
   │
   └─► AuthProvider useEffect:
       └─► getCurrentUser() from AsyncStorage
           ├─ If user exists → set user state
           └─ If no user → state remains null
       
2. App Renders
   │
   ├─► isLoading = false
   │
   └─► In index.tsx:
       ├─ If isSignedIn → navigate to /dashboard
       └─ If not signed in → show HookScreen

3. User Can:
   ├─ Register → creates new user
   ├─ Login → retrieves existing user
   └─ Logout → clears session
```

## 🚀 Performance Considerations

### Animations
- **FadeIn**: 600ms fade entrance
- **SlideInUp**: Staggered 200-600ms with delays
- **Floating**: Continuous spring animation on logo

Using React Native Reanimated for 60fps performance.

### State Updates
- Context API for global state (efficient for auth)
- useState for local component state
- No unnecessary re-renders (proper dependency arrays)

### Bundle Size
- Minimal dependencies (Expo-managed)
- Tree-shakeable imports
- No heavy animations libraries

## 🔌 Backend Integration Path

### Current (Client-Only)
```
UI → AuthContext → lib/auth.ts → AsyncStorage
```

### After Backend Integration
```
UI → AuthContext → API calls → Backend → JWT Token → AsyncStorage
     ↓
  Axios/Fetch wrapper
  - Auto-attach token to requests
  - Refresh token on 401
  - Error handling/retry logic
```

### Migration Steps
1. Create `lib/api.ts` with HTTP client
2. Modify `lib/auth.ts` to use API instead of local logic
3. Update `context/AuthContext.tsx` for token management
4. Add token refresh interceptor
5. Update error handling for network failures

## 📊 Data Models

### User Model
```typescript
interface User {
  id: string;                    // Unique identifier
  email: string;                 // Email address
  password: string;              // Hashed password (in storage only)
  fullName: string;              // Display name
  createdAt: string;             // ISO timestamp
}

// Public User (no password)
type PublicUser = Omit<User, "password">;
```

## 🧪 Testing Architecture

### Component Testing
```tsx
// Reusable components (Button, TextInput)
// Can be tested independently

test("Button handles press", () => {
  const onPress = jest.fn();
  render(<Button onPress={onPress} title="Test" />);
  fireEvent.press(screen.getByText("Test"));
  expect(onPress).toHaveBeenCalled();
});
```

### Context Testing
```tsx
// AuthContext can be tested with mock functions
// Verify login/register/logout behavior

test("Login sets user state", async () => {
  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider
  });
  
  await result.current.login("test@example.com", "password");
  expect(result.current.user).toBeDefined();
});
```

## 📝 Best Practices Followed

✅ **Component Separation**: Each screen is independent
✅ **Type Safety**: Full TypeScript throughout
✅ **Context Pattern**: Single source of truth for auth state
✅ **Prop Drilling Prevention**: useAuth() hook everywhere
✅ **Error Handling**: Try-catch blocks, user-friendly messages
✅ **Accessibility**: Proper labels, hit slops on buttons
✅ **Responsive Design**: Mobile-first approach
✅ **Performance**: Memoization, optimized re-renders
✅ **Code Organization**: Clear file structure
✅ **Naming Conventions**: Descriptive, consistent names

---

**This architecture is production-ready and scales to complex features!**
