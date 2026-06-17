# FabsExchange Mobile App

A beautiful, modern Expo-based mobile application for FabsExchange cryptocurrency trading platform.

## 🎯 Features

### Onboarding Flow
- **Hook Screen**: Captivating entry point with animated logo and brand messaging
- **How It Works**: Swipeable carousel explaining the 3-step process (Send Naira → Receive Crypto → Live Support)
- **Authentication**: Seamless registration and login with email + password

### Design System
- **Colors**: Purple (#8B5CF6) and Amber (#FBBF24) brand colors with dark theme
- **Animations**: Smooth 60fps animations powered by React Native Reanimated
- **Typography**: Clean, modern typeface with semantic hierarchy
- **Responsive**: Mobile-first design that works across all device sizes

### Authentication
- Client-side email/password authentication with bcrypt hashing
- AsyncStorage for secure session persistence
- Form validation with helpful error messages
- Password visibility toggle

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run expo:start
   ```

3. **Run on your device**
   - **iOS**: Press `i` in the terminal or run `npm run expo:ios`
   - **Android**: Press `a` in the terminal or run `npm run expo:android`
   - **Web**: Press `w` in the terminal or run `npm run expo:web`

## 📁 Project Structure

```
├── app/                          # Expo Router pages
│   ├── _layout.tsx              # Root layout with AuthProvider
│   ├── index.tsx                # Onboarding flow
│   ├── auth.tsx                 # Auth screen wrapper
│   └── dashboard.tsx            # Dashboard (placeholder)
├── screens/                      # Screen components
│   ├── HookScreen.tsx           # Initial hook screen
│   ├── HowItWorksScreen.tsx     # Carousel walkthrough
│   └── AuthScreen.tsx           # Registration/Login form
├── components/                   # Reusable UI components
│   ├── Button.tsx               # Custom button component
│   └── TextInput.tsx            # Custom text input with validation
├── context/                      # React Context
│   └── AuthContext.tsx          # Authentication state management
├── lib/                         # Utilities
│   ├── auth.ts                  # Authentication logic
│   └── utils.ts                 # Helper functions
├── assets/                      # Images, fonts, icons
└── global.css                   # Global Tailwind styles
```

## 🎨 Design Highlights

### Color Palette
- **Primary**: #8B5CF6 (Purple) - Main brand color
- **Accent**: #FBBF24 (Amber) - Highlights and CTAs
- **Background**: #0f0f0f (Dark) - Main background
- **Neutral Dark**: #1a1a1a - Card backgrounds

### Components
- **Button**: Primary, secondary, and outline variants with loading states
- **TextInput**: With label, error messages, and password visibility toggle
- **Animated Elements**: Floating icons, slide-in text, fade transitions

## 🔐 Authentication

The app uses client-side authentication with:
- **Bcrypt**: Secure password hashing (10 rounds)
- **AsyncStorage**: Local session persistence
- **Form Validation**: Real-time email and password validation
- **Error Handling**: User-friendly error messages

### Test Credentials
After registering, use the same email and password to login.

## 🔄 User Flow

1. **Hook Screen** → "Get Started" or "I already have an account"
2. **How It Works** → Swipeable carousel of features
3. **Auth Screen** → Register or Login tab
4. **Dashboard** → Welcome message and coming soon features

## 🎬 Animations

The app includes smooth animations using React Native Reanimated:
- Floating bitcoin icon on hook screen
- Slide-up transitions on text and buttons
- Fade-in effects for content
- Smooth carousel transitions

## 📱 Responsive Design

Built with mobile-first approach:
- Optimized for phone screens (375px - 430px width)
- Tablet-friendly layouts
- Safe area handling for notches and home indicators

## 🔜 Next Steps

### Features to Add
- Real API integration for authentication
- Trading dashboard with buy/sell interface
- Wallet management and balance display
- Transaction history
- Real-time price updates
- Chat support system
- Push notifications

### Backend Integration
When ready to add backend:
1. Replace `lib/auth.ts` with API calls
2. Update `context/AuthContext.tsx` to use your API endpoints
3. Implement token-based authentication (JWT)
4. Add proper error handling and retry logic

## 📦 Dependencies

### Key Packages
- **expo**: Mobile framework
- **expo-router**: File-based navigation
- **react-native-reanimated**: Animation library
- **nativewind**: Tailwind CSS for React Native
- **@react-native-async-storage/async-storage**: Local storage
- **bcrypt**: Password hashing
- **@expo/vector-icons**: Icon library

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npm run expo:start -- --clear
```

### Font loading errors
Ensure `assets/fonts/` directory exists with necessary font files.

### Authentication not persisting
Check that AsyncStorage is working:
```bash
expo install @react-native-async-storage/async-storage
```

## 📝 License

ISC - Created for FabsExchange

## 👨‍💻 Developer Notes

- All screens use Expo Router for navigation
- Authentication state is managed via Context API
- Styling uses NativeWind (Tailwind CSS for React Native)
- Component structure follows best practices with proper prop types
- Error handling includes user-friendly messages

Enjoy building! 🚀
