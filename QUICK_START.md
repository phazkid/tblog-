# FabsExchange Mobile App - Quick Start Guide

## ⚡ 30-Second Setup

```bash
# 1. Install dependencies (already done!)
npm install

# 2. Start the dev server
npm run expo:start

# 3. Open in simulator/device
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web preview
```

## 🎬 What You'll See

When you launch the app, you'll experience:

1. **Hook Screen** - Beautiful entry screen with:
   - Animated floating Bitcoin icon
   - "Buy & Sell Crypto in Naira" headline
   - Smooth fade-in animations
   - Two CTA buttons: "Get Started" or "I already have an account"

2. **How It Works** - Swipeable carousel showing:
   - Slide 1: Send Naira → Receive Crypto
   - Slide 2: Receive Crypto Instantly
   - Slide 3: 24/7 Live Support
   - Smooth dot indicators for progression

3. **Authentication Screen** - Modern form with:
   - Tabbed interface (Login/Register)
   - Real-time form validation
   - Password visibility toggle
   - Error messages
   - Sign-in/Create Account buttons

4. **Dashboard** - Post-auth screen with:
   - Welcome message
   - Account info display
   - Coming soon features list
   - Sign out button

## 🧪 Test the App

### Register a New Account
1. Click "Get Started" on hook screen
2. Swipe through how it works
3. Fill registration form:
   - Full Name: e.g., "John Doe"
   - Email: e.g., "john@example.com"
   - Password: e.g., "password123"
   - Confirm Password: must match
4. Click "Create Account"
5. See dashboard with your welcome message

### Login with Existing Account
1. On hook screen, click "I Already Have an Account"
2. Stay on Login tab
3. Enter email and password from registration
4. Click "Sign In"
5. Access dashboard

### Logout
1. On dashboard, click "Sign Out"
2. Return to hook screen

## 🎨 Design Features You'll Notice

- **Dark theme** for crypto/tech aesthetic
- **Purple & Amber** accent colors throughout
- **Smooth animations** on every screen transition
- **Responsive spacing** that looks good on any phone size
- **Professional typography** with semantic hierarchy
- **Glowing elements** with gradient backgrounds

## 📱 Responsive Breakpoints

The app is optimized for:
- 📱 Small phones (iPhone SE, etc.) - 375px
- 📱 Standard phones (iPhone 12, etc.) - 390px
- 📱 Larger phones (iPhone 14 Pro Max, etc.) - 430px+
- 📱 Tablets (iPad, etc.) - auto-scales

## 🔐 Test Data

The app stores test accounts in AsyncStorage locally. After you create an account:
- It persists across app restarts
- You can login anytime with same credentials
- Data is stored only on the device

## 🚀 Next Steps

### To Integrate with Real Backend
1. Replace `lib/auth.ts` with API calls to your backend
2. Update `context/AuthContext.tsx` to use JWT tokens
3. Change AsyncStorage to proper token storage
4. Add API error handling

### To Add More Features
1. Create new screens in `/screens/`
2. Add routes in `app/` directory
3. Use `useAuth()` hook to access user context
4. Follow component patterns (Button, TextInput) for consistency

### To Customize Styling
1. Edit `tailwind.config.js` for colors/fonts
2. Modify `global.css` for global styles
3. Update component classes for individual elements

## 🛠️ Available Commands

```bash
# Start development server
npm run expo:start

# Run on specific platform
npm run expo:ios
npm run expo:android
npm run expo:web

# Build for production (when ready)
npm run expo:start -- --prod
```

## 📚 File Guide

| File | Purpose |
|------|---------|
| `app/_layout.tsx` | Root layout with navigation setup |
| `app/index.tsx` | Onboarding flow orchestrator |
| `screens/HookScreen.tsx` | Initial attractive screen |
| `screens/HowItWorksScreen.tsx` | Feature carousel |
| `screens/AuthScreen.tsx` | Login/Register forms |
| `context/AuthContext.tsx` | Global auth state |
| `lib/auth.ts` | Auth logic & storage |
| `components/Button.tsx` | Reusable button |
| `components/TextInput.tsx` | Reusable input with validation |

## 💡 Pro Tips

- **Hot Reload**: Save a file and the app updates instantly
- **Debugging**: Open dev menu (Cmd+D on iOS, Cmd+M on Android)
- **React DevTools**: Install React DevTools to inspect components
- **Console Logs**: Check terminal output for console.log messages
- **Port Change**: If port 8081 is busy, Expo will use the next available port

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and restart
npm run expo:start -- --clear
```

### Dependencies issue
```bash
# Reinstall everything
rm -rf node_modules package-lock.json
npm install
npm run expo:start
```

### Port already in use
Expo will automatically use the next available port. Check the terminal output for the actual port.

## 🎯 Quality Features

✅ TypeScript for type safety
✅ Form validation with helpful errors
✅ Secure password hashing with bcrypt
✅ Smooth 60fps animations
✅ Accessible UI elements
✅ Mobile-first responsive design
✅ Clean component architecture
✅ Context API for state management
✅ Easy to test and debug
✅ Production-ready code structure

---

**Ready to build?** Start with `npm run expo:start` and watch your beautiful crypto app come to life! 🚀
